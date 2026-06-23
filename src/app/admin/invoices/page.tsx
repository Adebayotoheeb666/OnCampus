"use client";

import { AdminNav } from "@/components/layout/admin-nav";

export default function AdminInvoicesPage() {
  const invoices = [
    {
      id: "INV-2024-001",
      resident: "Jordan Davies",
      amount: "$4,200.00",
      status: "paid",
      dueDate: "Oct 31, 2024",
      issuedDate: "Oct 1, 2024",
    },
    {
      id: "INV-2024-002",
      resident: "Amara Lawson",
      amount: "$3,850.00",
      status: "pending",
      dueDate: "Nov 15, 2024",
      issuedDate: "Oct 15, 2024",
    },
    {
      id: "INV-2024-003",
      resident: "Marcus Chen",
      amount: "$4,200.00",
      status: "overdue",
      dueDate: "Sep 30, 2024",
      issuedDate: "Sep 1, 2024",
    },
  ];

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
            <p className="text-3xl font-bold text-red-600">$8,050.00</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
            <p className="text-xs font-semibold uppercase text-stone-600 mb-1">
              Pending Invoices
            </p>
            <p className="text-3xl font-bold text-yellow-600">12</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
            <p className="text-xs font-semibold uppercase text-stone-600 mb-1">
              Overdue Invoices
            </p>
            <p className="text-3xl font-bold text-orange-600">3</p>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="rounded-xl bg-white shadow-sm border border-stone-200 overflow-hidden">
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
            <h3 className="text-lg font-bold text-stone-900">All Invoices</h3>
          </div>
          <div className="divide-y divide-stone-200">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-bold text-stone-900">{invoice.id}</p>
                  <p className="text-sm text-stone-600">{invoice.resident}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">{invoice.amount}</p>
                  <p className="text-xs text-stone-600">
                    Due: {invoice.dueDate}
                  </p>
                </div>
                <div className="ml-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      invoice.status === "paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : invoice.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
