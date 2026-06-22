import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { tenants } from "./allocation";

const timestamp = () => integer({ mode: "timestamp_ms" }).notNull();

export const wallets = sqliteTable("wallets", {
  id: text("id").primaryKey(),
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id),
  balance: integer("balance").default(0),
  updatedAt: timestamp(),
});

export const invoices = sqliteTable("invoices", {
  id: text("id").primaryKey(),
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id),
  invoiceType: text("invoice_type", {
    enum: ["rent", "deposit", "amenity"],
  }).notNull(),
  amountDue: integer("amount_due").notNull(),
  amountPaid: integer("amount_paid").default(0),
  dueDate: integer("due_date", { mode: "timestamp_ms" }).notNull(),
  status: text("status", {
    enum: ["unpaid", "partially_paid", "paid", "overdue"],
  }).default("unpaid"),
  createdAt: timestamp(),
});

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  invoiceId: text("invoice_id").references(() => invoices.id),
  walletId: text("wallet_id").references(() => wallets.id),
  amount: integer("amount").notNull(),
  provider: text("provider").notNull(),
  providerReference: text("provider_reference"),
  status: text("status").notNull(),
  paidAt: integer("paid_at", { mode: "timestamp_ms" }),
});

export const paymentPlans = sqliteTable("payment_plans", {
  id: text("id").primaryKey(),
  invoiceId: text("invoice_id")
    .notNull()
    .references(() => invoices.id),
  installmentCount: integer("installment_count").notNull(),
  installmentAmount: integer("installment_amount").notNull(),
  nextDueDate: integer("next_due_date", { mode: "timestamp_ms" }).notNull(),
});

export const walletTransactions = sqliteTable("wallet_transactions", {
  id: text("id").primaryKey(),
  walletId: text("wallet_id")
    .notNull()
    .references(() => wallets.id),
  type: text("type", { enum: ["topup", "spend", "refund"] }).notNull(),
  amount: integer("amount").notNull(),
  referenceModule: text("reference_module"),
  createdAt: timestamp(),
});
