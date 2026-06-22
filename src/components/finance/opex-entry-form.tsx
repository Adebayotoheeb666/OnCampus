"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { createOpexEntry } from "@/modules/finance/actions";

export function OpexEntryForm() {
  const [category, setCategory] = useState<"utilities" | "staff" | "security" | "misc">("utilities");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [incurredAt, setIncurredAt] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setMessage(null);
    const amountKobo = Math.round(parseFloat(amount) * 100);
    if (!amountKobo || amountKobo <= 0) {
      setMessage("Enter a valid amount in Naira");
      return;
    }
    startTransition(async () => {
      const result = await createOpexEntry({
        category,
        amount: amountKobo,
        description,
        incurredAt,
      });
      if (result.success) {
        setMessage("OPEX entry recorded");
        setAmount("");
        setDescription("");
      } else {
        setMessage(result.error);
      }
    });
  }

  return (
    <Card>
      <CardTitle>Log OPEX entry</CardTitle>
      <div className="mt-4 space-y-3">
        <select className="w-full rounded-lg border border-stone-200 px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value as typeof category)}>
          <option value="utilities">Utilities</option>
          <option value="staff">Staff</option>
          <option value="security">Security</option>
          <option value="misc">Misc</option>
        </select>
        <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="number" placeholder="Amount (₦)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="date" value={incurredAt} onChange={(e) => setIncurredAt(e.target.value)} />
        <textarea className="w-full rounded-lg border border-stone-200 px-3 py-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
        {message && <p className="text-sm text-emerald-700">{message}</p>}
        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? "Saving…" : "Save entry"}
        </Button>
      </div>
    </Card>
  );
}
