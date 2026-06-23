"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

interface BedGridClientProps {
  stats: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  blocks: Array<{
    id: string;
    name: string;
    beds: Array<{
      id: string;
      blockId: string;
      blockName: string;
      roomNumber: string;
      bedLabel: string;
      status: string | null;
      tenantName?: string | null;
    }>;
    total: number;
  }>;
}

export function BedGridClient({ stats, blocks }: BedGridClientProps) {
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
    <>
      {/* Dashboard Summary */}
      <motion.div
        className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
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
          </motion.div>
        ))}
      </motion.div>

      {/* Filters Bar */}
      <motion.div
        className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-wrap gap-3">
          <select className="appearance-none bg-stone-100 border border-stone-300 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-stone-900 transition-colors hover:border-stone-400">
            <option>All Blocks</option>
            <option>Block A</option>
            <option>Block B</option>
            <option>Block C</option>
          </select>
          <select className="appearance-none bg-stone-100 border border-stone-300 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-stone-900 transition-colors hover:border-stone-400">
            <option>All Genders</option>
            <option>Male Only</option>
            <option>Female Only</option>
            <option>Mixed/Flexible</option>
          </select>
          <select className="appearance-none bg-stone-100 border border-stone-300 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-stone-900 transition-colors hover:border-stone-400">
            <option>Status: All</option>
            <option>Occupied</option>
            <option>Available</option>
            <option>Maintenance</option>
          </select>
        </div>
        <div className="flex gap-2 bg-stone-200 p-1 rounded-full">
          <button className="bg-white text-stone-900 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm transition-all hover:shadow-md">
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
      </motion.div>

      {/* Bed Grid Sections */}
      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {blocks.map((block) => (
          <motion.div key={block.id} variants={itemVariants}>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-bold text-stone-900">
                {block.name}
              </h3>
              <div className="h-[1px] flex-grow bg-stone-300" />
              <span className="text-xs font-semibold uppercase text-stone-600">
                {block.total} BEDS TOTAL
              </span>
            </div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {block.beds.map((bed) => {
                const colors = getRoomColor(bed.status || "available");
                return (
                  <motion.div
                    key={bed.id}
                    variants={itemVariants}
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
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
