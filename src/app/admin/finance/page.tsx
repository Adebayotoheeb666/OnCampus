"use client";

import { AdminNav } from "@/components/layout/admin-nav";
import Link from "next/link";

export default function AdminFinancePage() {
  // Mock data for the dashboard
  const financialData = {
    totalRevenue: "$482.5k",
    revenueChange: "+12.4%",
    opex: "$192.8k",
    netPosition: "$289.7k",
    freeBedCoverage: "82%",
  };

  const revenueBreakdown = [
    {
      name: "Sponsorships",
      amount: "$241k",
      percentage: 50,
      color: "bg-blue-500",
      icon: "volunteer_activism",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      name: "Student Rent",
      amount: "$168k",
      percentage: 35,
      color: "bg-emerald-600",
      icon: "home_work",
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      name: "Amenities",
      amount: "$73k",
      percentage: 15,
      color: "bg-yellow-600",
      icon: "local_laundry_service",
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  const transactions = [
    {
      name: "Stellar Corp Grant",
      type: "Sponsorship",
      date: "Oct 12",
      amount: "+$12,500",
      status: "positive",
      icon: "download",
    },
    {
      name: "HVAC Maintenance",
      type: "Maintenance",
      date: "Oct 10",
      amount: "-$3,240",
      status: "negative",
      icon: "upload",
    },
    {
      name: "Laundry Token Sales",
      type: "Amenity",
      date: "Oct 09",
      amount: "+$840",
      status: "positive",
      icon: "download",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/finance" />

      <main className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-stone-600">
            Financial Overview
          </p>
          <h1 className="text-3xl font-bold text-stone-900">Q3 FY24 Dashboard</h1>
        </div>

        {/* Financial Summary Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {/* Total Revenue Card */}
          <div className="col-span-2 rounded-xl bg-white p-6 shadow-sm border border-stone-200">
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
                {financialData.totalRevenue}
              </span>
              <span className="text-sm font-bold text-emerald-600">
                {financialData.revenueChange}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full bg-stone-900"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          {/* OPEX Card */}
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
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
              {financialData.opex}
            </span>
          </div>

          {/* Net Position Card */}
          <div className="rounded-xl bg-white p-6 shadow-sm border-l-4 border-l-emerald-600 border border-stone-200">
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
              {financialData.netPosition}
            </span>
          </div>
        </div>

        {/* Stability Gauge Section */}
        <div className="mb-8 flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border border-stone-200">
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
            <div className="text-4xl font-bold text-stone-900">
              {financialData.freeBedCoverage}
            </div>
            <div className="text-xs uppercase text-stone-600 font-semibold">
              Ratio
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="mb-8">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-600">
            Revenue by Source
          </h3>
          <div className="space-y-3">
            {revenueBreakdown.map((source) => (
              <div
                key={source.name}
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
                  <div
                    className={source.color}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
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
              <div key={idx} className="flex items-center justify-between p-4">
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
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
