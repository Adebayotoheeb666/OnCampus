import { AdminNav } from "@/components/layout/admin-nav";
import { db } from "@/db";
import { invoices, tenants, applicants } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export default async function AdminInvoicesPage() {
  // Fetch all invoices with resident information
  const invoiceRows = await db
    .select({
      id: invoices.id,
      resident: applicants.fullName,
      amount: invoices.amountDue,
      amountPaid: invoices.amountPaid,
      status: invoices.status,
      dueDate: invoices.dueDate,
      createdAt: invoices.createdAt,
    })
    .from(invoices)
    .innerJoin(tenants, eq(invoices.tenantId, tenants.id))
    .innerJoin(applicants, eq(tenants.applicantId, applicants.id))
    .orderBy(invoices.dueDate);

  // Calculate stats
  const totalOutstanding = invoiceRows
    .filter(inv => inv.status !== "paid")
    .reduce((sum, inv) => sum + (inv.amount - (inv.amountPaid ?? 0)), 0);

  const pendingCount = invoiceRows.filter(inv =>
    inv.status === "unpaid" || inv.status === "partially_paid"
  ).length;

  const overdueCount = invoiceRows.filter(inv => inv.status === "overdue").length;

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/invoices" />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900">Invoice Management</h1>
          <p className="mt-2 text-stone-600">
            Track and manage resident invoices and payments
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
            <p className="text-xs font-semibold uppercase text-stone-600 mb-1">
              Total Outstanding
            </p>
            <p className="text-3xl font-bold text-red-600">
              {(totalOutstanding / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
            <p className="text-xs font-semibold uppercase text-stone-600 mb-1">
              Pending Invoices
            </p>
            <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
            <p className="text-xs font-semibold uppercase text-stone-600 mb-1">
              Overdue Invoices
            </p>
            <p className="text-3xl font-bold text-orange-600">{overdueCount}</p>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="rounded-xl bg-white shadow-sm border border-stone-200 overflow-hidden">
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
            <h3 className="text-lg font-bold text-stone-900">All Invoices</h3>
          </div>
          <div className="divide-y divide-stone-200">
            {invoiceRows.length > 0 ? (
              invoiceRows.map((invoice) => (
                <div
                  key={invoice.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-bold text-stone-900">{invoice.id}</p>
                    <p className="text-sm text-stone-600">{invoice.resident}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-stone-900">
                      {(invoice.amount / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                    <p className="text-xs text-stone-600">
                      Due: {invoice.dueDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        invoice.status === "paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : invoice.status === "pending" ||
                            invoice.status === "unpaid" ||
                            invoice.status === "partially_paid"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-stone-500">
                No invoices found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
