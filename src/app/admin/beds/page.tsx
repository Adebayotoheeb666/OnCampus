import { AdminNav } from "@/components/layout/admin-nav";
import { getBedInventory } from "@/modules/allocation/queries";

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

  const getRoomColor = (status: string) => {
    switch (status) {
      case "occupied":
        return { text: "text-stone-600", bg: "bg-stone-600/10" };
      case "available":
        return { text: "text-emerald-600", bg: "bg-emerald-600/10" };
      case "maintenance":
        return { text: "text-yellow-600", bg: "bg-yellow-600/10" };
      default:
        return { text: "text-stone-600", bg: "bg-stone-600/10" };
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/beds" />

      <main className="mx-auto max-w-7xl px-4 py-10">
        {/* Dashboard Summary */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm"
            >
              <p className="text-xs font-semibold uppercase text-stone-600 mb-2">
                {stat.label}
              </p>
              <h2 className="text-4xl font-bold text-stone-900">{stat.value}</h2>
              <div className="mt-4 flex items-center gap-2 text-emerald-600">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>
                <span className="text-xs font-bold">{stat.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-3">
            <select className="appearance-none bg-stone-100 border border-stone-300 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-stone-900">
              <option>All Blocks</option>
              <option>Block A</option>
              <option>Block B</option>
              <option>Block C</option>
            </select>
            <select className="appearance-none bg-stone-100 border border-stone-300 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-stone-900">
              <option>All Genders</option>
              <option>Male Only</option>
              <option>Female Only</option>
              <option>Mixed/Flexible</option>
            </select>
            <select className="appearance-none bg-stone-100 border border-stone-300 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-stone-900">
              <option>Status: All</option>
              <option>Occupied</option>
              <option>Available</option>
              <option>Maintenance</option>
            </select>
          </div>
          <div className="flex gap-2 bg-stone-200 p-1 rounded-full">
            <button className="bg-white text-stone-900 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">
                grid_view
              </span>
              GRID
            </button>
            <button className="text-stone-700 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-stone-300 transition-colors">
              <span className="material-symbols-outlined text-[18px]">map</span>
              FLOORPLAN
            </button>
          </div>
        </div>

        {/* Bed Grid Sections */}
        <div className="space-y-12">
          {blocks.map((block) => (
            <div key={block.id}>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-stone-900">
                  {block.name}
                </h3>
                <div className="h-[1px] flex-grow bg-stone-300" />
                <span className="text-xs font-semibold uppercase text-stone-600">
                  {block.total} BEDS TOTAL
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {block.beds.map((bed) => {
                  const colors = getRoomColor(bed.status || "available");
                  return (
                    <div
                      key={bed.id}
                      className="cursor-pointer border border-stone-300 bg-white p-4 rounded-xl flex flex-col items-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all"
                    >
                      <span className={`material-symbols-outlined text-3xl ${colors.text}`}>
                        bed
                      </span>
                      <span className="text-xs font-bold uppercase text-stone-900">
                        {bed.roomNumber}-{bed.bedLabel}
                      </span>
                      <div
                        className={`px-2 py-1 rounded-full ${colors.bg} ${colors.text} text-[10px] font-bold uppercase tracking-wider`}
                      >
                        {bed.status}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
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
