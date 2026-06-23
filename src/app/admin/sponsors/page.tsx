"use client";

import { AdminNav } from "@/components/layout/admin-nav";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, cardVariants } from "@/lib/animations";

export default function AdminSponsorsPage() {
  const columns = [
    { title: "Prospect", count: 0, sponsors: [] },
    { title: "Contacted", count: 0, sponsors: [] },
    { title: "Committed", count: 0, sponsors: [] },
    { title: "Active", count: 0, sponsors: [] },
    { title: "Lapsed", count: 0, sponsors: [] },
  ];

  const SponsorCard = ({ sponsor }: { sponsor: (typeof sponsors)[0] }) => (
    <motion.div
      variants={cardVariants}
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
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/sponsors" />

      <main className="mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <motion.div
          className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold text-stone-900">
              Sponsor Management
            </h1>
            <p className="mt-2 text-stone-600">
              Manage institutional partnerships and philanthropic growth.
            </p>
          </motion.div>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined">add</span>
            Add New Sponsor
          </motion.button>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          className="mb-8 bg-white border border-stone-200 p-4 rounded-xl flex flex-col md:flex-row gap-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-all"
              placeholder="Search sponsors by name, ID or contact..."
              type="text"
            />
          </div>
          <select className="bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-stone-900 transition-all hover:border-stone-300">
            <option>Sponsor Type: All</option>
            <option>Individual</option>
            <option>Corporate</option>
            <option>Alumni Association</option>
          </select>
          <select className="bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-stone-900 transition-all hover:border-stone-300">
            <option>Status: All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Lapsed</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <span className="material-symbols-outlined">filter_list</span>
          </motion.button>
        </motion.div>

        {/* Pipeline Overview */}
        <motion.div
          className="mb-8 flex overflow-x-auto gap-4 pb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {columns.map((column) => (
            <motion.div
              key={column.title}
              variants={itemVariants}
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
              <motion.div
                className="flex flex-col gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {column.sponsors.length > 0 ? (
                  column.sponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.name} sponsor={sponsor} />
                  ))
                ) : column.title === "Contacted" ? (
                  <div className="bg-white border-2 border-dashed border-stone-200 p-8 rounded-xl text-center text-stone-400 italic text-sm flex items-center justify-center min-h-[120px]">
                    Drop records here
                  </div>
                ) : null}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </main>
    </div>
  );
}
