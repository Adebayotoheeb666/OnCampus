import { ResidentNav } from "@/components/layout/resident-nav";
import { WalletPanel } from "@/components/payments/wallet-panel";
import { requireResidentContext } from "@/lib/resident/context";
import {
  getWalletForTenant,
  getWalletTransactions,
  getTenantPaymentSummary,
  getPaymentByReference,
} from "@/modules/payments/queries";
import { confirmWalletTopup } from "@/modules/payments/actions";

type SearchParams = Promise<{ topup?: string; ref?: string }>;

export default async function ResidentWalletPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const ctx = await requireResidentContext();
  const params = await searchParams;

  if (params.topup === "1" && params.ref) {
    const payment = await getPaymentByReference(params.ref);
    if (payment?.walletId && payment.status === "pending") {
      await confirmWalletTopup(payment.walletId, payment.amount, params.ref);
    }
  }

  const wallet = await getWalletForTenant(ctx.tenant.id);
  const summary = await getTenantPaymentSummary(ctx.tenant.id);
  const transactions = wallet ? await getWalletTransactions(wallet.id) : [];
  const unpaidInvoices = summary.invoices.filter((i) => i.status !== "paid");

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <ResidentNav active="/resident/wallet" />
      <h1 className="text-2xl font-bold">My wallet</h1>
      {params.topup === "1" && (
        <p className="mt-2 text-sm text-emerald-700">Top-up processed successfully (demo mode).</p>
      )}
      <div className="mt-6">
        <WalletPanel
          tenantId={ctx.tenant.id}
          email={ctx.session.email}
          balance={wallet?.balance ?? 0}
          transactions={transactions}
          unpaidInvoices={unpaidInvoices}
        />
      </div>
    </div>
  );
}
