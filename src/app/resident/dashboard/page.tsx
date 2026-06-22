import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ResidentNav } from "@/components/layout/resident-nav";
import { requireResidentContext } from "@/lib/resident/context";
import { getTenantPaymentSummary } from "@/modules/payments/queries";
import { InvoiceTable } from "@/components/payments/invoice-table";
import { formatNaira } from "@/lib/utils";

export default async function ResidentDashboardPage() {
  const ctx = await requireResidentContext();
  const summary = await getTenantPaymentSummary(ctx.tenant.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <ResidentNav active="/resident/dashboard" />
      <h1 className="text-2xl font-bold">Payments</h1>
      <p className="text-stone-600">{ctx.applicant.fullName}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-stone-600">Balance due</p>
          <p className="text-2xl font-bold text-emerald-800">{formatNaira(summary.balanceDue)}</p>
        </Card>
        <Card>
          <p className="text-sm text-stone-600">Next due</p>
          <p className="text-2xl font-bold">{summary.nextDueDate?.toLocaleDateString("en-NG") ?? "—"}</p>
        </Card>
        <Card>
          <p className="text-sm text-stone-600">Wallet</p>
          <p className="text-2xl font-bold">{formatNaira(summary.walletBalance)}</p>
        </Card>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Invoices</h2>
          <Link href="/resident/wallet" className="text-sm text-emerald-800 hover:underline">Wallet & plans →</Link>
        </div>
        <InvoiceTable invoices={summary.invoices} email={ctx.session.email} />
      </section>
    </div>
  );
}
