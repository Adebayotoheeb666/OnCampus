import { AdminNav } from "@/components/layout/admin-nav";
import { getFinanceOverview, getDefaultPeriod, getOpexEntries } from "@/modules/finance/queries";
import { FinanceClient } from "@/components/admin/finance-client";

export default async function AdminFinancePage() {
  const period = getDefaultPeriod();
  const overview = await getFinanceOverview(period);
  const opexList = await getOpexEntries(period);

  const totalRevenue = overview.totalRevenue;
  const sponsorRevenue = overview.sponsorRevenue;
  const rentRevenue = overview.rentRevenue;
  const totalOpex = overview.totalOpex;

  const revenueBreakdown = [
    {
      name: "Sponsorships",
      amount: `₦${(sponsorRevenue / 100).toLocaleString()}`,
      percentage: totalRevenue > 0 ? (sponsorRevenue / totalRevenue) * 100 : 0,
      color: "bg-blue-500",
      icon: "volunteer_activism",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      name: "Student Rent",
      amount: `₦${(rentRevenue / 100).toLocaleString()}`,
      percentage: totalRevenue > 0 ? (rentRevenue / totalRevenue) * 100 : 0,
      color: "bg-emerald-600",
      icon: "home_work",
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  const transactions = opexList.slice(0, 3).map((entry) => ({
    name: entry.description || "Transaction",
    type: entry.category.charAt(0).toUpperCase() + entry.category.slice(1),
    date: entry.incurredAt.toLocaleDateString("en-NG", { month: "short", day: "numeric" }),
    amount: `-₦${(entry.amount / 100).toLocaleString()}`,
    status: "negative" as const,
    icon: "upload",
  }));

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

        <FinanceClient
          totalRevenue={totalRevenue}
          totalOpex={totalOpex}
          freeBedCoverageRatio={overview.freeBedCoverageRatio}
          revenueBreakdown={revenueBreakdown}
          transactions={transactions}
          period={period}
        />
      </main>
    </div>
  );
}
