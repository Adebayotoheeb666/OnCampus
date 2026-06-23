import { AdminNav } from "@/components/layout/admin-nav";
import { getBedInventory } from "@/modules/allocation/queries";
import { BedGridClient } from "./bed-grid-client";

export default async function AdminBedsPage() {
  const beds = await getBedInventory();

  // Calculate stats from real data
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter((b) => b.status === "occupied").length;
  const availableBeds = beds.filter((b) => b.status === "available").length;
  const maintenanceBeds = beds.filter((b) => b.status === "maintenance").length;
  const occupancyRate = totalBeds > 0 ? ((occupiedBeds / totalBeds) * 100).toFixed(1) : 0;
  const vacancyRate = totalBeds > 0 ? ((availableBeds / totalBeds) * 100).toFixed(1) : 0;

  const stats = [
    { label: "TOTAL BEDS", value: totalBeds.toLocaleString(), detail: "All units" },
    { label: "OCCUPIED", value: occupiedBeds.toLocaleString(), detail: `${occupancyRate}% Occupancy` },
    { label: "AVAILABLE", value: availableBeds.toLocaleString(), detail: `${vacancyRate}% Vacancy` },
    { label: "MAINTENANCE", value: maintenanceBeds.toLocaleString(), detail: "Undergoing repairs" },
  ];

  // Group beds by block
  const blockMap = new Map<string, typeof beds>();
  beds.forEach((bed) => {
    const key = bed.blockId;
    if (!blockMap.has(key)) {
      blockMap.set(key, []);
    }
    blockMap.get(key)!.push(bed);
  });

  const blocks = Array.from(blockMap.entries()).map(([blockId, blockBeds]) => ({
    id: blockId,
    name: blockBeds[0]?.blockName || "Unknown Block",
    beds: blockBeds,
    total: blockBeds.length,
  }));

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/beds" />

      <main className="mx-auto max-w-7xl px-4 py-10">
        {/* Dashboard Summary and Bed Grid - Client Component */}
        <BedGridClient stats={stats} blocks={blocks} />
      </main>

      {/* Detail Panel Placeholder */}
      <div className="hidden fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-60 border-l border-stone-300" id="detailPanel">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold text-stone-900" id="panelRoomTitle">
              Room Details
            </h4>
            <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div id="panelContent" className="flex-grow" />
          <div className="mt-auto pt-8 flex gap-4">
            <button className="flex-1 bg-stone-900 text-white py-3 rounded-xl font-bold text-xs hover:bg-stone-800 transition-colors">
              EDIT ROOM
            </button>
            <button className="flex-1 border border-stone-900 text-stone-900 py-3 rounded-xl font-bold text-xs hover:bg-stone-100 transition-colors">
              LOG ISSUE
            </button>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black/20 z-55 hidden opacity-0 transition-opacity duration-300"
        id="backdrop"
      />
    </div>
  );
}
