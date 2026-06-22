import Link from "next/link";
import { BedCard } from "@/components/sponsor/bed-card";
import type { BedWithLocation } from "@/modules/sponsor/queries";

interface InventorySectionProps {
  beds: BedWithLocation[];
}

export function InventorySection({ beds }: InventorySectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20" id="inventory">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-12">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Available for Sponsorship</h2>
          <p className="text-on-surface-variant">Every card represents a tangible impact. Filter by hostel block or funding progress to find a student to support.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          <button className="px-4 py-2 bg-primary text-on-primary rounded-xl whitespace-nowrap text-xs font-semibold hover:opacity-90 transition-opacity">ALL BLOCKS</button>
          <button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-xl whitespace-nowrap text-xs font-semibold hover:bg-surface-variant transition-colors">BLOCK A</button>
          <button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-xl whitespace-nowrap text-xs font-semibold hover:bg-surface-variant transition-colors">BLOCK B</button>
          <button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-xl whitespace-nowrap text-xs font-semibold hover:bg-surface-variant transition-colors">LOW FUNDING</button>
        </div>
      </div>

      {beds.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {beds.slice(0, 3).map((bed) => (
              <BedCard key={bed.id} bed={bed} />
            ))}
          </div>

          <div className="bg-primary p-6 md:p-8 rounded-xl border border-primary flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-on-primary shadow-lg">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>auto_awesome</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Gift a Semester</h3>
              <p className="text-on-primary-container opacity-80 max-w-md">Can&rsquo;t decide on a specific room? Your contribution will be automatically assigned to the bed with the highest need.</p>
            </div>
            <div className="space-y-3 w-full md:w-auto">
              <div className="flex gap-2">
                <button className="flex-1 md:flex-initial bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-xs font-semibold transition-colors border border-white/10">$100</button>
                <button className="flex-1 md:flex-initial bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-xs font-semibold transition-colors border border-white/10">$250</button>
                <button className="flex-1 md:flex-initial bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-xs font-semibold transition-colors border border-white/10">$500</button>
              </div>
              <button className="w-full bg-primary-fixed text-on-primary-fixed py-3 rounded-xl font-bold shadow-md hover:scale-105 active:scale-95 transition-transform">Quick Sponsor</button>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-outline-variant p-12 text-center">
          <p className="text-on-surface-variant">No beds in the catalogue yet. Run <code className="text-sm bg-surface-container px-2 py-1 rounded">npm run db:seed</code> to load pilot inventory.</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/beds" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
          View all beds
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
