"use client";

import { AdminNav } from "@/components/layout/admin-nav";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, cardVariants } from "@/lib/animations";

export default function AdminSecurityPage() {
  const stats = [
    { label: "Active Residents", value: "1,248", detail: "94% On-Premise" },
    { label: "Gate Load", value: "Medium", detail: "65% Capacity" },
  ];

  const activities = [
    {
      type: "anomaly",
      priority: "critical",
      title: "Unrecognized ID Scan",
      location: "East Gate - Turnstile 04",
      time: "14:02",
      detail: "Access Denied",
      hasActions: true,
    },
    {
      type: "normal",
      person: "Elena Rodriguez",
      id: "#2249-A",
      direction: "IN",
      time: "14:05:12",
      image: true,
    },
    {
      type: "normal",
      person: "James Wilson",
      id: "VISITOR • DELIVERY",
      direction: "OUT",
      time: "13:58:44",
      image: true,
    },
    {
      type: "normal",
      person: "Marcus Chen",
      id: "#1102-C",
      direction: "IN",
      time: "13:55:20",
      image: true,
    },
  ];

  const visitors = [
    {
      name: "Sarah Jenkins",
      detail: "Parent Visit • Unit 402",
      status: "Approved",
      eta: "15:00 - 18:00",
    },
    {
      name: "Prime Logistics",
      detail: "Service Delivery • Package Hub",
      status: "Arriving Soon",
      eta: "14:30 - 15:30",
    },
  ];

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

        {/* Quick Stats */}
        <motion.div
          className="mb-8 grid gap-4 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="rounded-xl bg-white p-4 shadow-sm border border-stone-200 hover:shadow-lg transition-all"
            >
              <p className="text-xs font-semibold uppercase text-stone-600 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
              <div
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200"
                style={{ display: stat.label === "Gate Load" ? "block" : "none" }}
              >
                <motion.div
                  className="h-full bg-yellow-600"
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-xs text-stone-600">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.div>

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

          {activities.map((activity, idx) => {
            if (activity.type === "anomaly") {
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="rounded-xl bg-red-50 border-2 border-red-600 p-4 flex gap-4 items-start shadow-md"
                >
                  <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-lg">
                      warning
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase text-red-600">
                        CRITICAL ANOMALY
                      </span>
                      <span className="text-xs text-red-900">{activity.time}</span>
                    </div>
                    <p className="font-bold text-red-900 text-sm">
                      {activity.title}
                    </p>
                    <p className="text-red-900 opacity-80 text-xs">
                      {activity.location} - {activity.detail}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
                      >
                        Lock Gate
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/20 text-red-900 px-3 py-2 rounded-lg text-xs font-bold border border-red-600 hover:bg-white/30 transition-colors"
                      >
                        Review Log
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="rounded-xl bg-white border border-stone-200 p-3 flex gap-3 items-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-stone-200 bg-stone-200">
                  {activity.image && (
                    <div className="w-full h-full bg-stone-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-stone-900 text-sm">
                    {activity.person}
                  </p>
                  <p className="text-stone-600 text-[11px] uppercase font-semibold">
                    RESIDENT • ID {activity.id}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`block font-bold text-sm ${
                      activity.direction === "IN"
                        ? "text-emerald-600"
                        : "text-stone-600"
                    }`}
                  >
                    {activity.direction}
                  </span>
                  <span className="text-stone-600 text-[10px]">
                    {activity.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
