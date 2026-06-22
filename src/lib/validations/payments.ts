import { z } from "zod";

export const initiatePaymentSchema = z.object({
  invoiceId: z.string().min(1, "Invoice ID required"),
  email: z.string().email("Valid email required"),
});

export const walletTopupSchema = z.object({
  tenantId: z.string().min(1),
  email: z.string().email("Valid email required"),
  amountKobo: z.number().int().min(10000, "Minimum topup is 100 naira"),
});

export const paymentPlanSchema = z.object({
  invoiceId: z.string().min(1),
  installmentCount: z.number().int().min(2, "Minimum 2 installments").max(6, "Maximum 6 installments"),
});

export type InitiatePaymentInput = z.infer<typeof initiatePaymentSchema>;
export type WalletTopupInput = z.infer<typeof walletTopupSchema>;
export type PaymentPlanInput = z.infer<typeof paymentPlanSchema>;
