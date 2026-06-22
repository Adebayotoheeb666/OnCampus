"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  updateApplicantStatus,
  allocateApplicant,
  runAllocationCycle,
} from "@/modules/allocation/actions";
import { getScoreBreakdown } from "@/lib/allocation/scoring";
import type { NeedAssessment } from "@/lib/validations/allocation";
import type { applicants } from "@/db/schema";

type Applicant = typeof applicants.$inferSelect;

const STATUS_COLORS: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-amber-100 text-amber-800",
  allocated: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  waitlisted: "bg-stone-100 text-stone-800",
};

export function AllocationReviewTable({
  applicants: list,
  availableBeds,
}: {
  applicants: Applicant[];
  availableBeds: { id: string; bedLabel: string; blockName: string }[];
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");
  const [bedId, setBedId] = useState(availableBeds[0]?.id ?? "");
  const [detail, setDetail] = useState<Applicant | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function runAction(action: () => Promise<unknown>) {
    setMessage(null);
    startTransition(async () => {
      try {
        await action();
        setMessage("Action completed");
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Action failed");
      }
    });
  }

  const assessment: NeedAssessment | null = detail?.needAssessmentJson
    ? JSON.parse(detail.needAssessmentJson)
    : null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {message && <p className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left">
              <tr>
                <th className="p-3"><span className="sr-only">Select</span></th>
                <th className="p-3">Name</th>
                <th className="p-3">Level</th>
                <th className="p-3">Type</th>
                <th className="p-3">Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.id} className="border-t border-stone-100 hover:bg-stone-50">
                  <td className="p-3">
                    <input type="checkbox" checked={selected.has(a.id)} onChange={() => toggle(a.id)} />
                  </td>
                  <td className="p-3">
                    <button type="button" className="font-medium text-emerald-800 hover:underline" onClick={() => setDetail(a)}>
                      {a.fullName}
                    </button>
                  </td>
                  <td className="p-3">{a.level}</td>
                  <td className="p-3 capitalize">{a.applicationType.replace("_", " ")}</td>
                  <td className="p-3">{a.needScore ?? "—"}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${STATUS_COLORS[a.status ?? "submitted"]}`}>
                      {a.status?.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            size="sm"
            disabled={isPending || selected.size === 0}
            onClick={() =>
              runAction(async () => {
                await runAllocationCycle([...selected]);
              })
            }
          >
            Run allocation for selected
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={() => runAction(async () => { await runAllocationCycle(); })}
          >
            Run full cycle
          </Button>
        </div>
      </div>

      <div>
        <Card className="sticky top-24">
          {detail ? (
            <div className="space-y-3 text-sm">
              <h3 className="font-semibold">{detail.fullName}</h3>
              <p>{detail.email} · {detail.phone}</p>
              <p>JAMB/Matric: {detail.matricOrJambNo}</p>
              {assessment && (
                <div className="rounded-lg bg-stone-50 p-3">
                  <p className="font-medium">Score breakdown</p>
                  {Object.entries(getScoreBreakdown(assessment)).map(([k, v]) => (
                    <p key={k} className="text-stone-600">{k}: {v}</p>
                  ))}
                </div>
              )}
              <textarea
                className="w-full rounded-lg border border-stone-200 px-3 py-2"
                placeholder="Notes (required for manual actions)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
              {detail.status !== "allocated" && (
                <>
                  <select className="w-full rounded-lg border border-stone-200 px-3 py-2" value={bedId} onChange={(e) => setBedId(e.target.value)}>
                    {availableBeds.map((b) => (
                      <option key={b.id} value={b.id}>{b.blockName} · Bed {b.bedLabel}</option>
                    ))}
                  </select>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" disabled={!notes || !bedId || isPending} onClick={() => runAction(() => allocateApplicant(detail.id, bedId, notes))}>
                      Allocate to bed
                    </Button>
                    <Button size="sm" variant="outline" disabled={!notes || isPending} onClick={() => runAction(() => updateApplicantStatus(detail.id, "under_review", notes))}>
                      Mark under review
                    </Button>
                    <Button size="sm" variant="outline" disabled={!notes || isPending} onClick={() => runAction(() => updateApplicantStatus(detail.id, "waitlisted", notes))}>
                      Waitlist
                    </Button>
                    <Button size="sm" variant="ghost" disabled={!notes || isPending} onClick={() => runAction(() => updateApplicantStatus(detail.id, "rejected", notes))}>
                      Reject
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="text-sm text-stone-500">Select an applicant to review details and take action.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
