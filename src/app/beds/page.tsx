import Link from "next/link";
import { getAvailableBeds, getBlocks } from "@/modules/sponsor/queries";

type SearchParams = Promise<{ block?: string; gender?: string; status?: string }>;

export default async function BedsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [beds, blocks] = await Promise.all([
    getAvailableBeds({
      blockId: params.block,
      gender: params.gender,
      status: params.status,
    }),
    getBlocks(),
  ]);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Search and Global Actions */}
      <section className="px-4 md:px-6 pt-6 pb-4 max-w-6xl mx-auto">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-body-md" 
            placeholder="Search room number or bed ID..." 
            type="text"
          />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[64px] z-40 bg-background py-2 border-b border-outline-variant">
        <div className="flex items-center gap-2 px-4 md:px-6 overflow-x-auto max-w-6xl mx-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full font-label-caps text-xs whitespace-nowrap shadow-sm">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Filters
          </button>
          <div className="h-6 w-px bg-outline-variant mx-1"></div>
          <button className="px-4 py-2 border border-outline-variant rounded-full font-label-caps text-xs whitespace-nowrap text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container transition-colors">Status</button>
          <button className="px-4 py-2 border border-outline-variant rounded-full font-label-caps text-xs whitespace-nowrap text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container transition-colors">Block</button>
          <button className="px-4 py-2 border border-outline-variant rounded-full font-label-caps text-xs whitespace-nowrap text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container transition-colors">Gender</button>
          <button className="px-4 py-2 border border-outline-variant rounded-full font-label-caps text-xs whitespace-nowrap text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container transition-colors">Price</button>
        </div>
      </section>

      {/* Sorting & Results Info */}
      <div className="flex justify-between items-center px-4 md:px-6 py-4 max-w-6xl mx-auto border-b border-outline-variant">
        <span className="text-label-caps font-label-caps text-xs text-on-surface-variant">{beds.length} BEDS AVAILABLE</span>
        <div className="flex items-center gap-1 text-secondary cursor-pointer">
          <span className="text-label-caps font-label-caps text-xs">SORT BY: RELEVANCE</span>
          <span className="material-symbols-outlined text-[16px]">expand_more</span>
        </div>
      </div>

      {/* Bed Cards Grid */}
      <section className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 max-w-6xl mx-auto py-6">
        {beds && beds.length > 0 ? (
          beds.map((bed) => (
            <div key={bed.id} className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <div className="relative h-56 overflow-hidden bg-surface-container">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBY726MAmE1vI3SklrXR_ABw2LLoCdVZCOiUsC_8DesIry7Gt8YUYY4f1P-CkDVfZFOh7XoV7dMhX-nfMnpyhQqzfJSY2Px3lhZ8tNA36lY8cj584L_9-JDHdKTnDAKDJbIgwsx4XRIEbPuwUaghAOjZ9NEtmd7E7b7-lNjx9jyUvBPQXcgcIo7A5aJKoOqW8Be_P01kwsy165jFwWVtn1rz2YSBfHIIW59EZtno7b404qjWW-Xt0PA6yoggyJ-qDLcCf-Hny4f649l')` }}
                />
                <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur px-3 py-1 rounded-full border border-status-sponsored/20">
                  <span className="text-xs font-bold text-status-available">AVAILABLE</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-primary text-lg">{bed.roomNumber || `Bed ${bed.id}`}</h3>
                    <p className="text-xs font-bold text-on-surface-variant tracking-widest">BLOCK • MIXED</p>
                  </div>
                  <p className="font-bold text-secondary text-lg">₦{bed.targetAmountKobo ? (bed.targetAmountKobo / 100).toLocaleString() : '1,200'}<span className="text-sm font-normal text-on-surface-variant">/yr</span></p>
                </div>
                {/* Progress Bar */}
                <div className="mt-4 mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-on-surface-variant tracking-widest">FUNDING PROGRESS</span>
                    <span className="text-sm font-bold text-impact-gold">₦0 REMAINING</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-impact-gold" 
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
                <Link href={`/sponsor/checkout/${bed.id}`}>
                  <button className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 mt-auto hover:opacity-90">
                    <span className="material-symbols-outlined">volunteer_activism</span>
                    Fund This Bed
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-outline-variant p-12 text-center text-on-surface-variant col-span-full">
            No beds match your filters. Try adjusting filters or seed the database.
          </p>
        )}
      </section>
    </div>
  );
}
