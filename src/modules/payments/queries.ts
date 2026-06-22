import { eq, desc, and, sql } from "drizzle-orm";
import { db } from "@/db";
import { invoices, payments, wallets, walletTransactions, paymentPlans, tenants, applicants } from "@/db/schema";

export async function getInvoicesForTenant(tenantId: string) {
  return db
    .select()
    .from(invoices)
    .where(eq(invoices.tenantId, tenantId))
    .orderBy(desc(invoices.dueDate));
}

export async function getInvoiceById(invoiceId: string) {
  const [row] = await db.select().from(invoices).where(eq(invoices.id, invoiceId)).limit(1);
  return row ?? null;
}

export async function getPaymentsForTenant(tenantId: string) {
  return db
    .select({ payment: payments, invoiceType: invoices.invoiceType })
    .from(payments)
    .innerJoin(invoices, eq(payments.invoiceId, invoices.id))
    .where(eq(invoices.tenantId, tenantId))
    .orderBy(desc(payments.paidAt));
}

export async function getWalletForTenant(tenantId: string) {
  const [wallet] = await db
    .select()
    .from(wallets)
    .where(eq(wallets.tenantId, tenantId))
    .limit(1);
  return wallet ?? null;
}

export async function getTenantPaymentSummary(tenantId: string) {
  const invoiceRows = await getInvoicesForTenant(tenantId);
  const wallet = await getWalletForTenant(tenantId);

  const balanceDue = invoiceRows
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + (i.amountDue - (i.amountPaid ?? 0)), 0);

  const nextDue = invoiceRows
    .filter((i) => i.status === "unpaid" || i.status === "partially_paid" || i.status === "overdue")
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())[0];

  return {
    balanceDue,
    nextDueDate: nextDue?.dueDate ?? null,
    walletBalance: wallet?.balance ?? 0,
    invoices: invoiceRows,
  };
}

export async function getOverdueInvoices() {
  const now = new Date();
  return db
    .select({
      invoice: invoices,
      tenantName: applicants.fullName,
      tenantEmail: applicants.email,
    })
    .from(invoices)
    .innerJoin(tenants, eq(invoices.tenantId, tenants.id))
    .innerJoin(applicants, eq(tenants.applicantId, applicants.id))
    .where(
      and(
        sql`${invoices.status} IN ('unpaid', 'partially_paid', 'overdue')`,
        sql`${invoices.dueDate} < ${now.getTime()}`,
      ),
    )
    .orderBy(invoices.dueDate);
}

export async function getPaymentByReference(reference: string) {
  const [row] = await db
    .select()
    .from(payments)
    .where(eq(payments.providerReference, reference))
    .limit(1);
  return row ?? null;
}

export async function getWalletTransactions(walletId: string) {
  return db
    .select()
    .from(walletTransactions)
    .where(eq(walletTransactions.walletId, walletId))
    .orderBy(desc(walletTransactions.createdAt));
}

export async function getPaymentPlanForInvoice(invoiceId: string) {
  const [plan] = await db
    .select()
    .from(paymentPlans)
    .where(eq(paymentPlans.invoiceId, invoiceId))
    .limit(1);
  return plan ?? null;
}
