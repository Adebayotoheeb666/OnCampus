"use server";

import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  invoices,
  payments,
  wallets,
  walletTransactions,
  paymentPlans,
} from "@/db/schema";
import { PAID_BED_RENT_KOBO, PAID_BED_DEPOSIT_KOBO } from "@/lib/constants";
import { initializePaystackTransaction } from "@/lib/payments/paystack";

export async function generateInvoicesForTenant(tenantId: string) {
  const now = new Date();
  const rentDue = new Date(now);
  rentDue.setDate(rentDue.getDate() + 14);
  const depositDue = new Date(now);
  depositDue.setDate(depositDue.getDate() + 7);

  await db.insert(invoices).values([
    {
      id: `inv_${nanoid(12)}`,
      tenantId,
      invoiceType: "deposit",
      amountDue: PAID_BED_DEPOSIT_KOBO,
      amountPaid: 0,
      dueDate: depositDue,
      status: "unpaid",
      createdAt: now,
    },
    {
      id: `inv_${nanoid(12)}`,
      tenantId,
      invoiceType: "rent",
      amountDue: PAID_BED_RENT_KOBO,
      amountPaid: 0,
      dueDate: rentDue,
      status: "unpaid",
      createdAt: now,
    },
  ]);

  await db.insert(wallets).values({
    id: `wallet_${nanoid(12)}`,
    tenantId,
    balance: 0,
    updatedAt: now,
  });
}

export type PaymentActionResult =
  | { success: true; authorizationUrl: string }
  | { success: false; error: string };

export async function initiateInvoicePayment(
  invoiceId: string,
  email: string,
): Promise<PaymentActionResult> {
  const [invoice] = await db.select().from(invoices).where(eq(invoices.id, invoiceId)).limit(1);
  if (!invoice) return { success: false, error: "Invoice not found" };
  if (invoice.status === "paid") return { success: false, error: "Invoice already paid" };

  const amountDue = invoice.amountDue - (invoice.amountPaid ?? 0);
  const paymentRef = `rent_${invoiceId}_${nanoid(6)}`;

  await db.insert(payments).values({
    id: `pay_${nanoid(12)}`,
    invoiceId,
    amount: amountDue,
    provider: "paystack",
    providerReference: paymentRef,
    status: "pending",
  });

  const paystack = await initializePaystackTransaction({
    email,
    amountKobo: amountDue,
    reference: paymentRef,
    metadata: {
      type: "tenant",
      invoiceId,
      tenantId: invoice.tenantId,
    },
    callbackPath: `/resident/payment/${invoiceId}`,
  });

  if (!paystack.authorizationUrl) {
    return { success: false, error: "Payment initialization failed" };
  }

  return { success: true, authorizationUrl: paystack.authorizationUrl };
}

export async function confirmInvoicePayment(
  invoiceId: string,
  amount: number,
  reference: string,
) {
  const [invoice] = await db.select().from(invoices).where(eq(invoices.id, invoiceId)).limit(1);
  if (!invoice) return;

  const now = new Date();
  const newPaid = (invoice.amountPaid ?? 0) + amount;
  const isPaid = newPaid >= invoice.amountDue;

  await db
    .update(payments)
    .set({ status: "success", paidAt: now })
    .where(eq(payments.providerReference, reference));

  await db
    .update(invoices)
    .set({
      amountPaid: newPaid,
      status: isPaid ? "paid" : "partially_paid",
    })
    .where(eq(invoices.id, invoiceId));
}

export async function initiateWalletTopup(
  tenantId: string,
  email: string,
  amountKobo: number,
): Promise<PaymentActionResult> {
  const wallet = await db.select().from(wallets).where(eq(wallets.tenantId, tenantId)).limit(1);
  if (!wallet[0]) return { success: false, error: "Wallet not found" };

  const paymentRef = `wallet_${tenantId}_${nanoid(6)}`;

  await db.insert(payments).values({
    id: `pay_${nanoid(12)}`,
    walletId: wallet[0].id,
    amount: amountKobo,
    provider: "paystack",
    providerReference: paymentRef,
    status: "pending",
  });

  const paystack = await initializePaystackTransaction({
    email,
    amountKobo,
    reference: paymentRef,
    metadata: {
      type: "wallet_topup",
      walletId: wallet[0].id,
      tenantId,
    },
    callbackPath: `/resident/wallet?topup=1`,
  });

  if (!paystack.authorizationUrl) {
    return { success: false, error: "Payment initialization failed" };
  }

  return { success: true, authorizationUrl: paystack.authorizationUrl };
}

export async function confirmWalletTopup(
  walletId: string,
  amount: number,
  reference: string,
) {
  const [wallet] = await db.select().from(wallets).where(eq(wallets.id, walletId)).limit(1);
  if (!wallet) return;

  const now = new Date();
  const newBalance = (wallet.balance ?? 0) + amount;

  await db
    .update(payments)
    .set({ status: "success", paidAt: now })
    .where(eq(payments.providerReference, reference));

  await db
    .update(wallets)
    .set({ balance: newBalance, updatedAt: now })
    .where(eq(wallets.id, walletId));

  await db.insert(walletTransactions).values({
    id: `wtxn_${nanoid(12)}`,
    walletId,
    type: "topup",
    amount,
    referenceModule: "wallet",
    createdAt: now,
  });
}

export async function payInvoiceFromWallet(invoiceId: string, tenantId: string) {
  const [invoice] = await db.select().from(invoices).where(eq(invoices.id, invoiceId)).limit(1);
  if (!invoice || invoice.tenantId !== tenantId) {
    return { success: false as const, error: "Invoice not found" };
  }
  if (invoice.status === "paid") {
    return { success: false as const, error: "Invoice already paid" };
  }

  const [wallet] = await db.select().from(wallets).where(eq(wallets.tenantId, tenantId)).limit(1);
  if (!wallet) return { success: false as const, error: "Wallet not found" };

  const amountDue = invoice.amountDue - (invoice.amountPaid ?? 0);
  if ((wallet.balance ?? 0) < amountDue) {
    return { success: false as const, error: "Insufficient wallet balance" };
  }

  const now = new Date();
  const newBalance = (wallet.balance ?? 0) - amountDue;
  const newPaid = (invoice.amountPaid ?? 0) + amountDue;

  await db
    .update(wallets)
    .set({ balance: newBalance, updatedAt: now })
    .where(eq(wallets.id, wallet.id));

  await db.insert(walletTransactions).values({
    id: `wtxn_${nanoid(12)}`,
    walletId: wallet.id,
    type: "spend",
    amount: amountDue,
    referenceModule: invoice.invoiceType,
    createdAt: now,
  });

  await db.insert(payments).values({
    id: `pay_${nanoid(12)}`,
    invoiceId,
    walletId: wallet.id,
    amount: amountDue,
    provider: "wallet",
    providerReference: `wallet_pay_${invoiceId}`,
    status: "success",
    paidAt: now,
  });

  await db
    .update(invoices)
    .set({ amountPaid: newPaid, status: "paid" })
    .where(eq(invoices.id, invoiceId));

  return { success: true as const };
}

export async function createPaymentPlan(invoiceId: string, installmentCount: number) {
  const [invoice] = await db.select().from(invoices).where(eq(invoices.id, invoiceId)).limit(1);
  if (!invoice) return { success: false as const, error: "Invoice not found" };
  if (invoice.invoiceType !== "rent") {
    return { success: false as const, error: "Payment plans are only available for rent invoices" };
  }

  const remaining = invoice.amountDue - (invoice.amountPaid ?? 0);
  if (remaining <= 0) return { success: false as const, error: "Invoice has no balance due" };
  if (installmentCount < 2 || installmentCount > 6) {
    return { success: false as const, error: "Choose 2–6 installments" };
  }

  const installmentAmount = Math.ceil(remaining / installmentCount);
  const nextDue = new Date();
  nextDue.setDate(nextDue.getDate() + 30);

  await db.insert(paymentPlans).values({
    id: `plan_${nanoid(12)}`,
    invoiceId,
    installmentCount,
    installmentAmount,
    nextDueDate: nextDue,
  });

  return { success: true as const };
}
