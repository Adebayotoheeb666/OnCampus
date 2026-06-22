import Link from "next/link";
import { formatNaira, fundingPercent } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { BedWithLocation } from "@/modules/sponsor/queries";

export function BedCard({ bed }: { bed: BedWithLocation }) {
  const percent = fundingPercent(bed.fundedAmountKobo, bed.targetAmountKobo);
  const isFundable = bed.status === "available" || percent < 100;
  const statusLabel = percent >= 100 ? "OCCUPIED" : percent >= 80 ? "ALMOST FUNDED" : "AVAILABLE";
  const statusColor = percent >= 100 ? "text-status-occupied" : percent >= 80 ? "text-status-sponsored" : "text-status-available";

  return (
    <article className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative h-48">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80')`,
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded shadow-sm">
          <span className={`text-xs font-semibold ${statusColor}`}>{statusLabel}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-primary">{bed.blockName}, Room {bed.roomNumber}</h3>
            <p className="text-xs font-semibold text-on-surface-variant uppercase">{bed.bedLabel}</p>
          </div>
          <span className="material-symbols-outlined text-primary">meeting_room</span>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">{percent}% Funded</span>
            <span className="text-xs font-bold text-impact-gold">{formatNaira(bed.fundedAmountKobo)} / {formatNaira(bed.targetAmountKobo)}</span>
          </div>
          <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
            <div className="h-full bg-impact-gold transition-all duration-500" style={{ width: `${Math.min(percent, 100)}%` }} />
          </div>
        </div>

        <Link href={`/sponsor/checkout/${bed.id}`}>
          <Button
            className="w-full bg-secondary text-on-secondary font-bold hover:opacity-90"
            disabled={!isFundable}
          >
            {isFundable ? "Sponsor This Bed" : "Fully Sponsored"}
          </Button>
        </Link>
      </div>
    </article>
  );
}
