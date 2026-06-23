"use client";

import { AdminNav } from "@/components/layout/admin-nav";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, cardVariants } from "@/lib/animations";

export default function AdminSecurityPage() {
  const stats = [];
  const activities = [];
  const visitors = [];

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/security" />

      <main className="mx-auto max-w-2xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900">
            Security & Access Control
          </h1>
        </div>


        {/* View Toggle & Emergency */}
        <motion.div
          className="mb-6 space-y-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 rounded-full bg-stone-200 p-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-full bg-blue-500 text-white py-2 px-4 text-xs font-bold uppercase transition-all"
            >
              Gate Activity
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-full text-stone-700 py-2 px-4 text-xs font-bold uppercase hover:bg-stone-300 transition-all"
            >
              Expected Visitors
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-red-700 transition-colors"
          >
            <span className="material-symbols-outlined">report_problem</span>
            REPORT SECURITY INCIDENT
          </motion.button>
        </motion.div>

        {/* Gate Activity Feed */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-stone-900">Live Activity</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              <span className="text-xs font-semibold uppercase text-stone-600">
                REAL-TIME
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
