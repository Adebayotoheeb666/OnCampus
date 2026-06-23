"use client";

import { AdminNav } from "@/components/layout/admin-nav";

export default function AdminSponsorsPage() {
  const sponsors = [
    {
      name: "Global Tech Fund",
      type: "Corporate",
      value: "$15,000",
      valueLabel: "Est. Value",
      priority: "High Priority",
      lastContact: "Last: 2 days ago",
      column: "prospect",
    },
    {
      name: "Alumni Group A",
      type: "Alumni",
      value: "₦2.4M",
      valueLabel: "Est. Value",
      priority: "Neutral",
      lastContact: "Last: 1 week ago",
      column: "prospect",
    },
    {
      name: "Heritage Foundation",
      type: "Institutional",
      value: "$50,000",
      valueLabel: "Committed",
      priority: "Follow-up Due",
      lastContact: "Last: Today",
      column: "committed",
    },
    {
      name: "Zion Estates Ltd",
      type: "Corporate",
      value: "₦12.5M",
      valueLabel: "Current Value",
      priority: "Active",
      lastContact: "Last: 3 weeks ago",
      column: "active",
      hasLeftBorder: true,
    },
    {
      name: "Dr. Sarah Adams",
      type: "Individual",
      value: "₦500,000",
      valueLabel: "Last Value",
      priority: "Lapsed",
      lastContact: "Last: 6 months ago",
      column: "lapsed",
      isGrayscale: true,
    },
  ];

  const prospectSponsors = sponsors.filter((s) => s.column === "prospect");
  const committedSponsors = sponsors.filter((s) => s.column === "committed");
  const activeSponsors = sponsors.filter((s) => s.column === "active");
  const lapsedSponsors = sponsors.filter((s) => s.column === "lapsed");

  const columns = [
    { title: "Prospect", count: prospectSponsors.length, sponsors: prospectSponsors },
    { title: "Contacted", count: 12, sponsors: [] },
    { title: "Committed", count: committedSponsors.length, sponsors: committedSponsors },
    { title: "Active", count: activeSponsors.length, sponsors: activeSponsors },
    { title: "Lapsed", count: lapsedSponsors.length, sponsors: lapsedSponsors },
  ];

  const SponsorCard = ({ sponsor }) => (
    <div
      className={`bg-white border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group ${
        sponsor.hasLeftBorder ? "border-l-4 border-l-emerald-600" : "border-stone-200"
      } ${sponsor.isGrayscale ? "opacity-70 grayscale-[0.2]" : ""}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-stone-900 text-sm group-hover:text-blue-600 transition-colors">
          {sponsor.name}
        </h4>
        <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded-full font-bold uppercase">
          {sponsor.type}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-600 font-bold text-lg">{sponsor.value}</span>
        <span className="text-stone-600 text-xs font-semibold">
          {sponsor.valueLabel}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-stone-200 pt-3">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-stone-600">
            calendar_today
          </span>
          <span className="text-xs text-stone-600">{sponsor.lastContact}</span>
        </div>
        <span
          className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
            sponsor.priority === "High Priority"
              ? "bg-orange-50 text-orange-600"
              : sponsor.priority === "Follow-up Due"
                ? "bg-emerald-50 text-emerald-600"
                : sponsor.priority === "Active"
                  ? "bg-emerald-50 text-emerald-600"
                  : sponsor.priority === "Lapsed"
                    ? "bg-red-50 text-red-600"
                    : "bg-stone-100 text-stone-600"
          }`}
        >
          {sponsor.priority}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/sponsors" />

      <main className="mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">
              Sponsor Management
            </h1>
            <p className="mt-2 text-stone-600">
              Manage institutional partnerships and philanthropic growth.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-sm">
            <span className="material-symbols-outlined">add</span>
            Add New Sponsor
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 bg-white border border-stone-200 p-4 rounded-xl flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none"
              placeholder="Search sponsors by name, ID or contact..."
              type="text"
            />
          </div>
          <select className="bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-stone-900">
            <option>Sponsor Type: All</option>
            <option>Individual</option>
            <option>Corporate</option>
            <option>Alumni Association</option>
          </select>
          <select className="bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-stone-900">
            <option>Status: All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Lapsed</option>
          </select>
          <button className="p-2 border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>

        {/* Pipeline Overview */}
        <div className="mb-8 flex overflow-x-auto gap-4 pb-4">
          {columns.map((column) => (
            <div
              key={column.title}
              className="min-w-[300px] flex-shrink-0 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  {column.title} ({column.count})
                </h3>
                <span className="material-symbols-outlined text-stone-400 text-sm">
                  more_horiz
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {column.sponsors.length > 0 ? (
                  column.sponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.name} sponsor={sponsor} />
                  ))
                ) : column.title === "Contacted" ? (
                  <div className="bg-white border-2 border-dashed border-stone-200 p-8 rounded-xl text-center text-stone-400 italic text-sm flex items-center justify-center min-h-[120px]">
                    Drop records here
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Insights Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-stone-900 mb-6">
            Sponsorship Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 bg-gradient-to-br from-stone-900 to-stone-800 text-white p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-48">
              <div className="relative z-10">
                <p className="text-xs font-semibold opacity-70 mb-2 uppercase">
                  Total Funding Secured
                </p>
                <p className="text-4xl font-bold">₦48,200,000</p>
              </div>
              <div className="relative z-10 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400">
                  trending_up
                </span>
                <span className="text-sm">+12% vs last quarter</span>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <span className="material-symbols-outlined text-[160px]">
                  monetization_on
                </span>
              </div>
            </div>
            <div className="bg-white border border-stone-200 p-6 rounded-2xl flex flex-col justify-between h-48">
              <p className="text-xs font-semibold uppercase text-stone-600 mb-2">
                Retention Rate
              </p>
              <p className="text-4xl font-bold text-stone-900">92%</p>
              <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-full" style={{ width: "92%" }} />
              </div>
            </div>
            <div className="bg-white border border-stone-200 p-6 rounded-2xl flex flex-col justify-between h-48">
              <p className="text-xs font-semibold uppercase text-stone-600 mb-2">
                Avg. Deal Size
              </p>
              <p className="text-4xl font-bold text-stone-900">$4,200</p>
              <div className="flex items-center gap-2 text-stone-600 text-xs">
                <span className="material-symbols-outlined text-sm">groups</span>
                Across 148 sponsors
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
