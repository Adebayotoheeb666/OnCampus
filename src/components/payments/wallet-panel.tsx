"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";
import { initiateWalletTopup, payInvoiceFromWallet, createPaymentPlan } from "@/modules/payments/actions";
import type { invoices } from "@/db/schema";
import type { walletTransactions } from "@/db/schema";

type Invoice = typeof invoices.$inferSelect;
type WalletTxn = typeof walletTransactions.$inferSelect;

export function WalletPanel({
  tenantId,
  email,
  balance,
  transactions,
  unpaidInvoices,
}: {
  tenantId: string;
  email: string;
  balance: number;
  transactions: WalletTxn[];
  unpaidInvoices: Invoice[];
}) {
  const [topupAmount, setTopupAmount] = useState("1000");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleTopup() {
    const kobo = Math.round(parseFloat(topupAmount) * 100);
    if (!kobo || kobo < 10000) {
      setMessage("Minimum top-up is ₦100");
      return;
    }
    startTransition(async () => {
      const result = await initiateWalletTopup(tenantId, email, kobo);
      if (result.success) window.location.href = result.authorizationUrl;
      else setMessage(result.error);
    });
  }

  function handlePayFromWallet(invoiceId: string) {
    startTransition(async () => {
      const result = await payInvoiceFromWallet(invoiceId, tenantId);
      setMessage(result.success ? "Payment successful" : result.error);
      if (result.success) window.location.reload();
    });
  }

  function handlePaymentPlan(invoiceId: string) {
    startTransition(async () => {
      const result = await createPaymentPlan(invoiceId, 3);
      setMessage(result.success ? "3-installment plan created" : result.error);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <p className="text-sm text-stone-600">Wallet balance</p>
        <p className="text-3xl font-bold text-emerald-800">{formatNaira(balance)}</p>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <p className="font-medium">Top up wallet</p>
        <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="number" placeholder="Amount (₦)" value={topupAmount} onChange={(e) => setTopupAmount(e.target.value)} />
        <Button onClick={handleTopup} disabled={isPending} className="w-full">Top up via Paystack</Button>
      </div>

      {unpaidInvoices.length > 0 && (
        <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
          <p className="font-medium">Pay from wallet</p>
          {unpaidInvoices.map((inv) => (
            <div key={inv.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="capitalize">{inv.invoiceType} — {formatNaira(inv.amountDue - (inv.amountPaid ?? 0))}</span>
              <div className="flex gap-2">
                <Button size="sm" disabled={isPending} onClick={() => handlePayFromWallet(inv.id)}>Pay</Button>
                {inv.invoiceType === "rent" && (
                  <Button size="sm" variant="outline" disabled={isPending} onClick={() => handlePaymentPlan(inv.id)}>Plan</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {message && <p className="text-sm text-emerald-700">{message}</p>}

      <div>
        <p className="mb-2 font-medium">Transaction history</p>
        {transactions.length === 0 ? (
          <p className="text-sm text-stone-500">No transactions yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {transactions.map((t) => (
              <li key={t.id} className="flex justify-between border-b border-stone-100 pb-2">
                <span className="capitalize">{t.type} {t.referenceModule && `· ${t.referenceModule}`}</span>
                <span>{formatNaira(t.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
