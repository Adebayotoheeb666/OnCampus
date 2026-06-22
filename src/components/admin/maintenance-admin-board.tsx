"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updateMaintenanceStatus } from "@/modules/resident/actions";
import type { maintenanceRequests } from "@/db/schema";

type Request = typeof maintenanceRequests.$inferSelect;

export function MaintenanceAdminBoard({ requests }: { requests: Request[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <p className="text-stone-500">No maintenance requests.</p>
      ) : (
        requests.map((r) => (
          <Card key={r.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-medium capitalize">{r.category} · {r.priority}</p>
                  <p className="mt-1 text-sm text-stone-600">{r.description}</p>
                  {r.photoUrl && (
                    <a href={r.photoUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-emerald-700 hover:underline">
                      View photo
                    </a>
                  )}
                <p className="mt-1 text-xs text-stone-500">Tenant: {r.tenantId} · {r.createdAt.toLocaleString("en-NG")}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs capitalize text-stone-500">{r.status?.replace("_", " ")}</span>
                {r.status !== "resolved" && (
                  <>
                    <Button size="sm" variant="outline" disabled={isPending} onClick={() => startTransition(() => updateMaintenanceStatus(r.id, "assigned", "facilities"))}>
                      Assign
                    </Button>
                    <Button size="sm" variant="outline" disabled={isPending} onClick={() => startTransition(() => updateMaintenanceStatus(r.id, "in_progress"))}>
                      In progress
                    </Button>
                    <Button size="sm" disabled={isPending} onClick={() => startTransition(() => updateMaintenanceStatus(r.id, "resolved"))}>
                      Resolve
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
