"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

interface FinanceClientProps {
  totalRevenue: number;
  totalOpex: number;
  freeBedCoverageRatio: number;
  revenueBreakdown: Array<{
    name: string;
    amount: string;
    percentage: number;
    color: string;
    icon: string;
    iconColor: string;
    bgColor: string;
  }>;
  transactions: Array<{
    name: string;
    type: string;
    date: string;
    amount: string;
    status: "positive" | "negative";
    icon: string;
  }>;
  period: { label: string };
}

export function FinanceClient({
  totalRevenue,
  totalOpex,
  freeBedCoverageRatio,
  revenueBreakdown,
  transactions,
  period,
}: FinanceClientProps) {
  return (
    <>
      {/* Financial Summary Grid */}
      <motion.div
        className="mb-8 grid gap-4 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Total Revenue Card */}
        <motion.div
          variants={itemVariants}
          className="col-span-2 rounded-xl bg-white p-6 shadow-sm border border-stone-200"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-100 p-2">
              <span className="material-symbols-outlined text-emerald-600">
                trending_up
              </span>
            </div>
            <span className="text-xs font-semibold uppercase text-stone-600">
              Total Revenue
            </span>
          </div>
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-stone-900">
              ₦{(totalRevenue / 100).toLocaleString()}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
            <motion.div
              className="h-full bg-stone-900"
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* OPEX Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-white p-6 shadow-sm border border-stone-200"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-lg bg-stone-200 p-2">
              <span className="material-symbols-outlined text-stone-600">
                payments
              </span>
            </div>
            <span className="text-xs font-semibold uppercase text-stone-600">
              OPEX
            </span>
          </div>
          <span className="text-2xl font-bold text-stone-900">
            ₦{(totalOpex / 100).toLocaleString()}
          </span>
        </motion.div>

        {/* Net Position Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-white p-6 shadow-sm border-l-4 border-l-emerald-600 border border-stone-200"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-lg bg-stone-200 p-2">
              <span className="material-symbols-outlined text-emerald-600">
                account_balance
              </span>
            </div>
            <span className="text-xs font-semibold uppercase text-stone-600">
              Net Position
            </span>
          </div>
          <span className="text-2xl font-bold text-stone-900">
            ₦{((totalRevenue - totalOpex) / 100).toLocaleString()}
          </span>
        </motion.div>
      </motion.div>

      {/* Stability Gauge Section */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="mb-8 flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border border-stone-200"
      >
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-bold text-stone-900">Stability Gauge</h3>
          <p className="mt-2 text-sm text-stone-600">
            Free-Bed Coverage Ratio: Measures institutional capacity to support
            non-paying students.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1">
            <span className="material-symbols-outlined text-xs text-emerald-600">
              verified
            </span>
            <span className="text-xs font-bold uppercase text-emerald-600">
              High Stability
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <motion.div
            className="text-4xl font-bold text-stone-900"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {(freeBedCoverageRatio * 100).toFixed(0)}%
          </motion.div>
          <div className="text-xs uppercase text-stone-600 font-semibold">
            Ratio
          </div>
        </div>
      </motion.div>

      {/* Revenue Breakdown */}
      <motion.div
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-600">
          Revenue by Source
        </h3>
        <div className="space-y-3">
          {revenueBreakdown.map((source) => (
            <motion.div
              key={source.name}
              variants={itemVariants}
              className="rounded-xl border border-stone-200 bg-white p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full ${source.bgColor} p-3`}>
                    <span
                      className={`material-symbols-outlined ${source.iconColor}`}
                    >
                      {source.icon}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900">
                      {source.name}
                    </div>
                    <div className="text-xs text-stone-600 font-bold">
                      {source.amount}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
                <motion.div
                  className={source.color}
                  initial={{ width: 0 }}
                  animate={{ width: `${source.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-600">
            Recent Transactions
          </h3>
          <Link
            href="/admin/finance"
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
          {transactions.map((transaction, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-stone-100 p-2">
                  <span className="material-symbols-outlined text-xs text-stone-600">
                    {transaction.icon}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-stone-900">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-stone-600 uppercase">
                    {transaction.type} • {transaction.date}
                  </p>
                </div>
              </div>
              <span
                className={`font-bold text-sm ${
                  transaction.status === "positive"
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {transaction.amount}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
