"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { checkoutTenant } from "@/modules/allocation/actions";

type TenantRow = {
  tenant: { id: string; sessionEnd: Date };
  applicantName: string;
  bedLabel: string;
  blockName: string;
  roomNumber: string;
};

export function TenantCheckoutPanel({ tenants: list }: { tenants: TenantRow[] }) {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      {list.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          No tenants approaching session end.
        </p>
      ) : (
        list.map((row) => (
          <Card key={row.tenant.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{row.applicantName}</p>
                <p className="text-sm text-stone-600">
                  {row.blockName} · Room {row.roomNumber} · Bed {row.bedLabel}
                </p>
                <p className="text-xs text-stone-500">
                  Session ends: {row.tenant.sessionEnd.toLocaleDateString("en-NG")}
                </p>
              </div>
              <div className="flex min-w-[240px] flex-col gap-2">
                <textarea
                  className="rounded-lg border border-stone-200 px-3 py-2 text-sm"
                  placeholder="Inspection notes"
                  value={notes[row.tenant.id] ?? ""}
                  onChange={(e) => setNotes({ ...notes, [row.tenant.id]: e.target.value })}
                  rows={2}
                />
                <Button
                  size="sm"
                  disabled={!notes[row.tenant.id] || isPending}
                  onClick={() =>
                    startTransition(() => checkoutTenant(row.tenant.id, notes[row.tenant.id]))
                  }
                >
                  Confirm checkout
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
