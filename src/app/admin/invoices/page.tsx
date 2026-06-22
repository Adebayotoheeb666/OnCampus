import { AdminNav } from "@/components/layout/admin-nav";
import { formatNaira } from "@/lib/utils";
import { getOverdueInvoices } from "@/modules/payments/queries";

export default async function AdminInvoicesPage() {
  const overdue = await getOverdueInvoices();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <AdminNav active="/admin/invoices" />
      <h1 className="text-3xl font-bold">Overdue invoices</h1>
      <p className="mt-2 text-stone-600">Accounts requiring manual follow-up.</p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-stone-200">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left">
            <tr>
              <th className="p-3">Tenant</th>
              <th className="p-3">Email</th>
              <th className="p-3">Type</th>
              <th className="p-3">Due</th>
              <th className="p-3">Outstanding</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {overdue.map(({ invoice, tenantName, tenantEmail }) => (
              <tr key={invoice.id} className="border-t border-stone-100">
                <td className="p-3">{tenantName}</td>
                <td className="p-3">{tenantEmail}</td>
                <td className="p-3 capitalize">{invoice.invoiceType}</td>
                <td className="p-3">{invoice.dueDate.toLocaleDateString("en-NG")}</td>
                <td className="p-3 font-medium">
                  {formatNaira(invoice.amountDue - (invoice.amountPaid ?? 0))}
                </td>
                <td className="p-3 capitalize">{invoice.status?.replace("_", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {overdue.length === 0 && (
          <p className="p-8 text-center text-stone-500">No overdue invoices.</p>
        )}
      </div>
    </div>
  );
}
