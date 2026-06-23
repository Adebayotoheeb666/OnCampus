"use client";

import { AdminNav } from "@/components/layout/admin-nav";

export default function AdminFacilitiesPage() {
  const assets = [
    {
      name: "Generator 1",
      icon: "electric_bolt",
      assetId: "EDU-PWR-001",
      status: "operational",
      lastServiced: "Oct 12, 2023",
      nextService: "In 12 Days",
      nextServiceColor: "text-yellow-600",
    },
    {
      name: "Borehole Pump",
      icon: "water_pump",
      assetId: "EDU-WTR-042",
      status: "critical",
      lastServiced: "Aug 05, 2023",
      nextService: "Overdue 4 Days",
      nextServiceColor: "text-red-600",
      isCritical: true,
    },
    {
      name: "Laundromat Machines",
      icon: "local_laundry_service",
      assetId: "EDU-FAC-009 (Cluster)",
      status: "maintenance",
      lastServiced: "Jan 15, 2024",
      nextService: "In 88 Days",
      nextServiceColor: "text-stone-900",
    },
    {
      name: "Main HVAC System",
      icon: "hvac",
      assetId: "EDU-CLIM-012",
      status: "operational",
      lastServiced: "Nov 30, 2023",
      nextService: "In 45 Days",
      nextServiceColor: "text-stone-900",
    },
  ];

  const upcomingTasks = [
    {
      date: "12",
      month: "FEB",
      title: "Generator Refueling",
      location: "Main Power Shed",
      isOverdue: false,
    },
    {
      date: "04",
      month: "OVER",
      title: "Borehole Inspection",
      detail: "URGENT: Technician No-show",
      isOverdue: true,
    },
    {
      date: "01",
      month: "MAR",
      title: "HVAC Filter Swap",
      detail: "Team B Schedule",
      isOverdue: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-600",
          badge: "bg-emerald-500/10 text-emerald-600",
        };
      case "critical":
        return {
          bg: "bg-red-100",
          text: "text-red-600",
          badge: "bg-red-500/10 text-red-600",
        };
      case "maintenance":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-600",
          badge: "bg-yellow-500/10 text-yellow-600",
        };
      default:
        return {
          bg: "bg-stone-100",
          text: "text-stone-600",
          badge: "bg-stone-500/10 text-stone-600",
        };
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/facilities" />

      <main className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Header */}
        <div className="lg:col-span-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-600 mb-1">
                Facilities Management
              </p>
              <h1 className="text-4xl font-bold text-stone-900">
                Infrastructure Registry
              </h1>
            </div>
            <div className="flex gap-4">
              <div className="bg-white border border-stone-200 p-4 rounded-xl flex flex-col min-w-[140px]">
                <span className="text-[10px] font-semibold uppercase text-stone-600">
                  Active Assets
                </span>
                <span className="text-2xl font-bold text-stone-900">42</span>
              </div>
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex flex-col min-w-[140px]">
                <span className="text-[10px] font-semibold uppercase text-red-900">
                  Overdue Service
                </span>
                <span className="text-2xl font-bold text-red-600">03</span>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Registry */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <span className="material-symbols-outlined">inventory_2</span>
              Asset Registry
            </h3>
            <div className="flex gap-2">
              <button className="p-2 border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

          {/* Asset Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((asset) => {
              const colors = getStatusColor(asset.status);
              return (
                <div
                  key={asset.assetId}
                  className={`border p-6 rounded-xl hover:shadow-lg transition-all ${
                    asset.isCritical
                      ? "border-red-200 bg-white relative overflow-hidden"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  {asset.isCritical && (
                    <div className="absolute top-0 right-0 p-2 bg-red-600 text-white text-[10px] font-bold">
                      CRITICAL
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-full ${colors.bg}`}>
                      <span className={`material-symbols-outlined ${colors.text}`}>
                        {asset.icon}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${colors.badge}`}
                    >
                      {asset.status === "operational"
                        ? "Operational"
                        : asset.status === "critical"
                          ? "Overdue"
                          : "Maintenance"}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-stone-900 mb-1">
                    {asset.name}
                  </h4>
                  <p className="text-[11px] text-stone-600 mb-4 uppercase font-semibold">
                    Asset ID: {asset.assetId}
                  </p>
                  <div className="space-y-3 pt-4 border-t border-stone-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Last Serviced</span>
                      <span className="text-stone-900 font-medium">
                        {asset.lastServiced}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Next Service</span>
                      <span
                        className={`font-bold italic ${asset.nextServiceColor}`}
                      >
                        {asset.nextService}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Schedule & Quick Action */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mini Calendar */}
          <div className="bg-white border border-stone-200 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-stone-900">February 2024</span>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-stone-100 rounded transition-colors">
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                <button className="p-1 hover:bg-stone-100 rounded transition-colors">
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2 text-[10px] font-semibold text-stone-600">
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-[12px]">
              {Array.from({ length: 28 }).map((_, idx) => {
                const day = idx + 1;
                let classes = "h-8 flex items-center justify-center border border-stone-200 rounded";
                if (day === 4) classes += " bg-red-100 font-bold";
                if (day === 8) classes += " bg-stone-900 text-white";
                if (day === 12) classes += " bg-yellow-100";
                return <div key={idx} className={classes}>{day}</div>;
              })}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-100 px-4 py-3 border-b border-stone-200">
              <h4 className="text-xs font-bold uppercase text-stone-900">
                Upcoming Tasks
              </h4>
            </div>
            <div className="divide-y divide-stone-200">
              {upcomingTasks.map((task, idx) => (
                <div
                  key={idx}
                  className={`p-4 flex gap-3 hover:bg-stone-50 transition-colors cursor-pointer ${
                    task.isOverdue ? "bg-red-50" : ""
                  }`}
                >
                  <div className="text-center min-w-[40px]">
                    <span className="block text-[10px] font-semibold text-stone-600">
                      {task.isOverdue ? "OVER" : task.month}
                    </span>
                    <span className="block text-lg font-bold text-stone-900">
                      {task.date}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-stone-900">
                      {task.title}
                    </p>
                    <p className="text-[12px] text-stone-600 flex items-center gap-1">
                      {task.isOverdue ? (
                        <span className="font-bold text-red-600">
                          {task.detail}
                        </span>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[14px]">
                            location_on
                          </span>
                          {task.location || task.detail}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-stone-100 text-stone-900 font-bold text-xs hover:bg-stone-200 transition-colors">
              VIEW FULL CALENDAR
            </button>
          </div>

          {/* Quick Action */}
          <div className="bg-emerald-700 text-white p-6 rounded-xl">
            <h4 className="text-lg font-bold mb-2">Facility Incident?</h4>
            <p className="text-sm mb-6 opacity-80">
              Report infrastructure failures or request unscheduled maintenance
              immediately.
            </p>
            <button className="w-full bg-white text-emerald-700 font-bold py-3 rounded-lg hover:bg-stone-100 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add_circle</span>
              Log New Maintenance Task
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
