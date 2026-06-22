"use client";

import { useTransition } from "react";
import { Card } from "@/components/ui/card";
import { SPONSOR_PIPELINE_STAGES } from "@/lib/constants";
import { updateSponsorPipelineStatus } from "@/modules/sponsor/actions";
import type { sponsors } from "@/db/schema";

type Sponsor = typeof sponsors.$inferSelect;

const STAGE_LABELS: Record<string, string> = {
  prospect: "Prospect",
  contacted: "Contacted",
  committed: "Committed",
  active: "Active",
  lapsed: "Lapsed",
};

export function SponsorCrmBoard({ sponsors: sponsorList }: { sponsors: Sponsor[] }) {
  const [, startTransition] = useTransition();

  function moveSponsor(sponsorId: string, status: Sponsor["status"]) {
    if (!status) return;
    startTransition(() => updateSponsorPipelineStatus(sponsorId, status));
  }

  return (
    <div className="grid gap-4 overflow-x-auto md:grid-cols-5">
      {SPONSOR_PIPELINE_STAGES.map((stage) => {
        const column = sponsorList.filter((s) => s.status === stage);
        return (
          <div key={stage} className="min-w-[200px] rounded-xl bg-stone-100 p-3">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-600">
              {STAGE_LABELS[stage]}
            </h3>
            <div className="space-y-2">
              {column.map((sponsor) => (
                <Card key={sponsor.id} className="p-3">
                  <p className="font-medium text-sm">{sponsor.fullName}</p>
                  {sponsor.organizationName && (
                    <p className="text-xs text-stone-500">{sponsor.organizationName}</p>
                  )}
                  <p className="mt-1 text-xs text-stone-500">{sponsor.email}</p>
                  <select
                    className="mt-2 w-full rounded border border-stone-200 px-2 py-1 text-xs"
                    value={sponsor.status ?? "prospect"}
                    onChange={(e) =>
                      moveSponsor(sponsor.id, e.target.value as Sponsor["status"])
                    }
                  >
                    {SPONSOR_PIPELINE_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {STAGE_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </Card>
              ))}
              {column.length === 0 && (
                <p className="py-4 text-center text-xs text-stone-400">No sponsors</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
