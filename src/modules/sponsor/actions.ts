"use server";

import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sponsors, sponsorshipPledges, sponsorPayments, auditLog, users } from "@/db/schema";
import { SPONSORSHIP_TIERS } from "@/lib/constants";
import { pledgeCheckoutSchema } from "@/lib/validations/sponsor";
import { initializePaystackTransaction } from "@/lib/payments/paystack";

export type CheckoutResult =
  | { success: true; pledgeId: string; authorizationUrl: string }
  | { success: false; error: string };

export async function createSponsorshipCheckout(
  input: unknown,
): Promise<CheckoutResult> {
  const parsed = pledgeCheckoutSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;
  const tierConfig = SPONSORSHIP_TIERS[data.tier];
  const now = new Date();
  const pledgeId = `pledge_${nanoid(12)}`;
  const sponsorId = `sponsor_${nanoid(12)}`;

  try {
    await db.insert(sponsors).values({
      id: sponsorId,
      type: data.type,
      fullName: data.fullName,
      organizationName: data.organizationName ?? null,
      email: data.email,
      phone: data.phone || null,
      isDiaspora: data.isDiaspora,
      status: "committed",
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(users).values({
      id: `user_${nanoid(12)}`,
      email: data.email,
      phone: data.phone || null,
      fullName: data.fullName,
      role: "sponsor",
      sponsorId,
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(sponsorshipPledges).values({
      id: pledgeId,
      sponsorId,
      bedId: data.bedId,
      tier: data.tier,
      amountPledged: tierConfig.amountKobo,
      amountPaid: 0,
      recurring: data.recurring || ("recurring" in tierConfig && tierConfig.recurring),
      recurrenceInterval:
        "recurrenceInterval" in tierConfig ? tierConfig.recurrenceInterval : null,
      status: "pending",
      createdAt: now,
    });

    const paymentRef = `sab_${pledgeId}`;
    await db.insert(sponsorPayments).values({
      id: `spay_${nanoid(12)}`,
      pledgeId,
      amount: tierConfig.amountKobo,
      provider: "paystack",
      providerReference: paymentRef,
      status: "pending",
    });

    const paystack = await initializePaystackTransaction({
      email: data.email,
      amountKobo: tierConfig.amountKobo,
      reference: paymentRef,
      metadata: { pledgeId, sponsorId, bedId: data.bedId, tier: data.tier },
    });

    if (!paystack.authorizationUrl) {
      return { success: false, error: "Payment initialization failed" };
    }

    return {
      success: true,
      pledgeId,
      authorizationUrl: paystack.authorizationUrl,
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return { success: false, error: "Could not start checkout. Please try again." };
  }
}

export async function updateSponsorPipelineStatus(
  sponsorId: string,
  status: "prospect" | "contacted" | "committed" | "active" | "lapsed",
) {
  const now = new Date();
  await db
    .update(sponsors)
    .set({ status, updatedAt: now })
    .where(eq(sponsors.id, sponsorId));

  await db.insert(auditLog).values({
    id: `audit_${nanoid(12)}`,
    action: "sponsor_status_update",
    targetEntity: "sponsors",
    targetId: sponsorId,
    metadata: JSON.stringify({ status }),
    createdAt: now,
  });
}
