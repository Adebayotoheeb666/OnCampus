"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { approveVisitorEntry } from "@/modules/security/actions";
import type { visitorLogs } from "@/db/schema";

type Visitor = typeof visitorLogs.$inferSelect;

export function VisitorVerifyPanel({ visitors }: { visitors: Visitor[] }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {message && <p className="mb-4 text-sm text-emerald-700">{message}</p>}
      <div className="space-y-3">
        {visitors.length === 0 ? (
          <p className="text-stone-500">No expected visitors.</p>
        ) : (
          visitors.map((v) => (
            <div key={v.id} className="flex items-center justify-between rounded-lg border border-stone-200 p-4">
              <div>
                <p className="font-medium">{v.visitorName}</p>
                <p className="text-sm text-stone-600">{v.visitorPhone ?? "No phone"}</p>
                <p className="text-xs text-stone-500">
                  Expected: {v.expectedArrival?.toLocaleString("en-NG") ?? "—"}
                </p>
              </div>
              <Button
                size="sm"
                disabled={isPending}
                onClick={() =>
                  startTransition(async () => {
                    const result = await approveVisitorEntry(v.id);
                    setMessage(result.success ? `Checked in ${v.visitorName}` : result.error);
                  })
                }
              >
                Approve entry
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
