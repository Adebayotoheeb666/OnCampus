import Link from "next/link";
import { formatNaira } from "@/lib/utils";
import { SPONSORSHIP_TIERS, type SponsorshipTier } from "@/lib/constants";
import type { sponsorshipPledges } from "@/db/schema";

type PledgeRow = {
  pledge: typeof sponsorshipPledges.$inferSelect;
  bedLabel: string | null;
  blockName: string | null;
  roomNumber: string | null;
  certificateUrl?: string | null;
};

export function SponsorPledgesTable({ pledges }: { pledges: PledgeRow[] }) {
  const totalPaid = pledges.reduce((s, p) => s + (p.pledge.amountPaid ?? 0), 0);
  const totalPledged = pledges.reduce((s, p) => s + p.pledge.amountPledged, 0);
  const fulfilled = pledges.filter((p) => p.pledge.status === "fulfilled").length;

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-sm text-stone-600">Total pledged</p>
          <p className="text-xl font-bold">{formatNaira(totalPledged)}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-sm text-stone-600">Total paid</p>
          <p className="text-xl font-bold text-emerald-800">{formatNaira(totalPaid)}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-sm text-stone-600">Beds funded</p>
          <p className="text-xl font-bold">{fulfilled}</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-200">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left">
            <tr>
              <th className="p-3">Reference</th>
              <th className="p-3">Bed</th>
              <th className="p-3">Tier</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Status</th>
              <th className="p-3">Certificate</th>
            </tr>
          </thead>
          <tbody>
            {pledges.map((row) => {
              const tier = SPONSORSHIP_TIERS[row.pledge.tier as SponsorshipTier];
              return (
                <tr key={row.pledge.id} className="border-t border-stone-100">
                  <td className="p-3 font-mono text-xs">{row.pledge.id}</td>
                  <td className="p-3">
                    {row.blockName ? `${row.blockName} · ${row.roomNumber} · Bed ${row.bedLabel}` : "—"}
                  </td>
                  <td className="p-3">{tier.label}</td>
                  <td className="p-3">{formatNaira(row.pledge.amountPaid ?? 0)}</td>
                  <td className="p-3 capitalize">{row.pledge.status?.replace("_", " ")}</td>
                  <td className="p-3">
                    {row.certificateUrl ? (
                      <Link href={row.certificateUrl} className="text-emerald-800 hover:underline" target="_blank">
                        Download
                      </Link>
                    ) : row.pledge.status === "fulfilled" ? (
                      <Link href={`/api/certificates/${row.pledge.id}`} className="text-emerald-800 hover:underline" target="_blank">
                        Download
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {pledges.length === 0 && (
          <p className="p-8 text-center text-stone-500">No pledges yet.</p>
        )}
      </div>
    </div>
  );
}
