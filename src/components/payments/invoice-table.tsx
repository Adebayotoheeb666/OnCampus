"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";
import { initiateInvoicePayment } from "@/modules/payments/actions";
import type { invoices } from "@/db/schema";

type Invoice = typeof invoices.$inferSelect;

export function InvoiceTable({
  invoices: list,
  email,
}: {
  invoices: Invoice[];
  email: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [payingId, setPayingId] = useState<string | null>(null);

  function handlePay(invoiceId: string) {
    setPayingId(invoiceId);
    startTransition(async () => {
      const result = await initiateInvoicePayment(invoiceId, email);
      if (result.success) {
        window.location.href = result.authorizationUrl;
      } else {
        alert(result.error);
        setPayingId(null);
      }
    });
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 text-left">
          <tr>
            <th className="p-3">Type</th>
            <th className="p-3">Amount due</th>
            <th className="p-3">Paid</th>
            <th className="p-3">Due date</th>
            <th className="p-3">Status</th>
            <th className="p-3" />
          </tr>
        </thead>
        <tbody>
          {list.map((inv) => {
            const remaining = inv.amountDue - (inv.amountPaid ?? 0);
            return (
              <tr key={inv.id} className="border-t border-stone-100">
                <td className="p-3 capitalize">{inv.invoiceType}</td>
                <td className="p-3">{formatNaira(inv.amountDue)}</td>
                <td className="p-3">{formatNaira(inv.amountPaid ?? 0)}</td>
                <td className="p-3">{inv.dueDate.toLocaleDateString("en-NG")}</td>
                <td className="p-3 capitalize">{inv.status?.replace("_", " ")}</td>
                <td className="p-3">
                  {inv.status !== "paid" && remaining > 0 ? (
                    <Button
                      size="sm"
                      disabled={isPending && payingId === inv.id}
                      onClick={() => handlePay(inv.id)}
                    >
                      Pay {formatNaira(remaining)}
                    </Button>
                  ) : (
                    <Link href={`/resident/payment/${inv.id}`} className="text-xs text-emerald-700 hover:underline">
                      Receipt
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
