"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { bookLaundromatSlot } from "@/modules/resident/actions";

type Machine = { id: string; machineLabel: string; status: string | null };

export function LaundryBookingForm({
  tenantId,
  machines,
}: {
  tenantId: string;
  machines: Machine[];
}) {
  const router = useRouter();
  const [machineId, setMachineId] = useState(machines[0]?.id ?? "");
  const [slotStart, setSlotStart] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const result = await bookLaundromatSlot({ tenantId, machineId, slotStart });
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
      setSlotStart("");
    });
  }

  const available = machines.filter((m) => m.status === "available");

  return (
    <div className="space-y-4">
      <select className="w-full rounded-lg border border-stone-200 px-3 py-2" value={machineId} onChange={(e) => setMachineId(e.target.value)}>
        {available.map((m) => (
          <option key={m.id} value={m.id}>{m.machineLabel}</option>
        ))}
      </select>
      <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="datetime-local" value={slotStart} onChange={(e) => setSlotStart(e.target.value)} />
      <p className="text-xs text-stone-500">Each booking is a 1-hour slot.</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={handleSubmit} disabled={isPending || !slotStart || !machineId} className="w-full">
        {isPending ? "Booking…" : "Book slot"}
      </Button>
    </div>
  );
}
