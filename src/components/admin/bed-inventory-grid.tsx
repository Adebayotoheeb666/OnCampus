"use client";

import { useTransition } from "react";
import { updateBedStatus } from "@/modules/allocation/actions";
import type { BedInventoryItem } from "@/modules/allocation/queries";

const STATUS_COLORS: Record<string, string> = {
  available: "border-emerald-300 bg-emerald-50",
  sponsored: "border-blue-300 bg-blue-50",
  occupied: "border-amber-300 bg-amber-50",
  maintenance: "border-red-300 bg-red-50",
};

export function BedInventoryGrid({ beds }: { beds: BedInventoryItem[] }) {
  const [, startTransition] = useTransition();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {beds.map((bed) => (
        <div
          key={bed.id}
          className={`rounded-lg border-2 p-3 ${STATUS_COLORS[bed.status ?? "available"]}`}
        >
          <p className="text-xs font-medium uppercase text-stone-500">{bed.blockName}</p>
          <p className="font-semibold">Rm {bed.roomNumber} · Bed {bed.bedLabel}</p>
          <p className="mt-1 text-xs capitalize text-stone-600">{bed.status} · {bed.fundingType.replace("_", " ")}</p>
          {bed.tenantName && <p className="mt-1 text-xs text-stone-700">Tenant: {bed.tenantName}</p>}
          <select
            className="mt-2 w-full rounded border border-stone-200 px-2 py-1 text-xs"
            value={bed.status ?? "available"}
            onChange={(e) =>
              startTransition(() =>
                updateBedStatus(bed.id, e.target.value as "available" | "sponsored" | "occupied" | "maintenance"),
              )
            }
          >
            {["available", "sponsored", "occupied", "maintenance"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
