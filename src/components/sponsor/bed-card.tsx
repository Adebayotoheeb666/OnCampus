import Link from "next/link";
import { formatNaira, fundingPercent } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import type { BedWithLocation } from "@/modules/sponsor/queries";

export function BedCard({ bed }: { bed: BedWithLocation }) {
  const remaining = Math.max(0, bed.targetAmountKobo - bed.fundedAmountKobo);
  const isFundable = bed.status === "available" || fundingPercent(bed.fundedAmountKobo, bed.targetAmountKobo) < 100;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-emerald-50 to-stone-100">
        <span className="text-4xl font-bold text-emerald-200">{bed.bedLabel}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
            {bed.blockName} · Room {bed.roomNumber}
          </p>
          <h3 className="text-lg font-semibold text-stone-900">Bed {bed.bedLabel}</h3>
        </div>
        <ProgressBar funded={bed.fundedAmountKobo} target={bed.targetAmountKobo} />
        <p className="text-sm text-stone-600">
          {remaining > 0 ? `${formatNaira(remaining)} remaining` : "Fully funded"}
        </p>
        {isFundable ? (
          <Link href={`/sponsor/checkout/${bed.id}`} className="mt-auto">
            <Button className="w-full">Fund This Bed</Button>
          </Link>
        ) : (
          <Button className="mt-auto w-full" disabled>
            Fully Sponsored
          </Button>
        )}
      </div>
    </article>
  );
}
