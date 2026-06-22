"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { registerVisitor } from "@/modules/resident/actions";

export function VisitorRegistrationForm({ tenantId }: { tenantId: string }) {
  const router = useRouter();
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [expectedArrival, setExpectedArrival] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const result = await registerVisitor({ tenantId, visitorName, visitorPhone, expectedArrival });
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
      setVisitorName("");
      setVisitorPhone("");
      setExpectedArrival("");
    });
  }

  return (
    <div className="space-y-4">
      <input className="w-full rounded-lg border border-stone-200 px-3 py-2" placeholder="Visitor name" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} />
      <input className="w-full rounded-lg border border-stone-200 px-3 py-2" placeholder="Visitor phone" value={visitorPhone} onChange={(e) => setVisitorPhone(e.target.value)} />
      <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="datetime-local" value={expectedArrival} onChange={(e) => setExpectedArrival(e.target.value)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={handleSubmit} disabled={isPending} className="w-full">
        {isPending ? "Registering…" : "Pre-register visitor"}
      </Button>
    </div>
  );
}
