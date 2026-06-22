import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/db";
import {
  sponsorshipPledges,
  sponsorPayments,
  beds,
  auditLog,
} from "@/db/schema";
import { verifyPaystackSignature } from "@/lib/payments/paystack";
import { confirmInvoicePayment, confirmWalletTopup } from "@/modules/payments/actions";
import { dispatchGenerateSponsorCertificate } from "@/lib/jobs/dispatch";

type PaystackEvent = {
  event: string;
  data: {
    reference: string;
    amount: number;
    status: string;
    metadata?: {
      type?: string;
      pledgeId?: string;
      invoiceId?: string;
      walletId?: string;
      bedId?: string;
    };
  };
};

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!verifyPaystackSignature(rawBody, signature)) {
      console.error("[webhook] Invalid Paystack signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody) as PaystackEvent;

    // Only process successful charge events
    if (payload.event !== "charge.success") {
      console.log(`[webhook] Ignoring event: ${payload.event}`);
      return NextResponse.json({ received: true });
    }

    const { reference, amount, metadata } = payload.data;
    console.log(`[webhook] Processing payment: ${reference} for amount ${amount}`);

    // Handle wallet topup
    if (metadata?.type === "wallet_topup" && metadata.walletId) {
      await confirmWalletTopup(metadata.walletId, amount, reference);
      await db.insert(auditLog).values({
        id: `audit_${nanoid(12)}`,
        action: "wallet_topup_confirmed",
        targetEntity: "wallets",
        targetId: metadata.walletId,
        metadata: JSON.stringify({ reference, amount }),
        createdAt: new Date(),
      });
      console.log(`[webhook] Wallet topup confirmed: ${metadata.walletId}`);
      return NextResponse.json({ received: true });
    }

    // Handle tenant invoice payment
    if (metadata?.type === "tenant" && metadata.invoiceId) {
      await confirmInvoicePayment(metadata.invoiceId, amount, reference);
      await db.insert(auditLog).values({
        id: `audit_${nanoid(12)}`,
        action: "tenant_payment_confirmed",
        targetEntity: "invoices",
        targetId: metadata.invoiceId,
        metadata: JSON.stringify({ reference, amount }),
        createdAt: new Date(),
      });
      console.log(`[webhook] Tenant payment confirmed: ${metadata.invoiceId}`);
      return NextResponse.json({ received: true });
    }

    // Handle sponsor pledge payment (default type)
    const pledgeId = metadata?.pledgeId;
    if (!pledgeId) {
      console.error("[webhook] Missing payment metadata (no pledgeId)");
      return NextResponse.json({ error: "Missing payment metadata" }, { status: 400 });
    }

    const [pledge] = await db
      .select()
      .from(sponsorshipPledges)
      .where(eq(sponsorshipPledges.id, pledgeId))
      .limit(1);

    if (!pledge) {
      console.error(`[webhook] Pledge not found: ${pledgeId}`);
      return NextResponse.json({ error: "Pledge not found" }, { status: 404 });
    }

    const now = new Date();
    const newAmountPaid = (pledge.amountPaid ?? 0) + amount;
    const isFulfilled = newAmountPaid >= pledge.amountPledged;

    // Update payment record
    const [updatedPayment] = await db
      .update(sponsorPayments)
      .set({ status: "success", paidAt: now })
      .where(eq(sponsorPayments.providerReference, reference))
      .returning();

    if (!updatedPayment) {
      console.error(`[webhook] Payment record not found: ${reference}`);
    }

    // Update pledge
    await db
      .update(sponsorshipPledges)
      .set({
        amountPaid: newAmountPaid,
        status: isFulfilled ? "fulfilled" : "partially_paid",
      })
      .where(eq(sponsorshipPledges.id, pledgeId));

    // Update bed status if needed
    if (pledge.bedId) {
      await db
        .update(beds)
        .set({
          fundedAmountKobo: sql`${beds.fundedAmountKobo} + ${amount}`,
          status: isFulfilled ? "sponsored" : beds.status,
        })
        .where(eq(beds.id, pledge.bedId));
    }

    // Log to audit trail
    await db.insert(auditLog).values({
      id: `audit_${nanoid(12)}`,
      action: "sponsor_payment_confirmed",
      targetEntity: "sponsorship_pledges",
      targetId: pledgeId,
      metadata: JSON.stringify({ reference, amount, isFulfilled }),
      createdAt: now,
    });

    // Trigger certificate generation if pledge is now fulfilled
    if (isFulfilled) {
      console.log(`[webhook] Pledge fulfilled, dispatching certificate: ${pledgeId}`);
      await dispatchGenerateSponsorCertificate(pledgeId);
    }

    console.log(`[webhook] Payment processed successfully: ${reference}`);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhook] Error processing payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
