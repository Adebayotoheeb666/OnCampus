import { AdminNav } from "@/components/layout/admin-nav";
import { Card, CardTitle } from "@/components/ui/card";
import { OpexEntryForm } from "@/components/finance/opex-entry-form";
import { formatNaira } from "@/lib/utils";
import {
  getFinanceOverview,
  getRevenueBreakdown,
  getOpexEntries,
  getDefaultPeriod,
} from "@/modules/finance/queries";

export default async function AdminFinancePage() {
  const period = getDefaultPeriod();
  const [overview, revenue, opexList] = await Promise.all([
    getFinanceOverview(period),
    getRevenueBreakdown(period),
    getOpexEntries(period),
  ]);

  const coveragePercent = Math.round(overview.freeBedCoverageRatio * 100);
  const coverageStatus =
    coveragePercent >= 100 ? "text-emerald-700" : coveragePercent >= 70 ? "text-amber-700" : "text-red-700";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <AdminNav active="/admin/finance" />
      <h1 className="text-3xl font-bold">Finance overview</h1>
      <p className="mt-2 text-stone-600">{period.label} reporting period</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-sm text-stone-600">Total revenue</p>
          <p className="text-2xl font-bold text-emerald-800">{formatNaira(overview.totalRevenue)}</p>
        </Card>
        <Card>
          <p className="text-sm text-stone-600">Total OPEX</p>
          <p className="text-2xl font-bold">{formatNaira(overview.totalOpex)}</p>
        </Card>
        <Card>
          <p className="text-sm text-stone-600">Net position</p>
          <p className={`text-2xl font-bold ${overview.netPosition >= 0 ? "text-emerald-800" : "text-red-700"}`}>
            {formatNaira(overview.netPosition)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-stone-600">Free-bed coverage</p>
          <p className={`text-2xl font-bold ${coverageStatus}`}>{coveragePercent}%</p>
          <p className="text-xs text-stone-500">{overview.freeBedCount} free · {overview.paidBedCount} paid beds occupied</p>
        </Card>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardTitle>Revenue by source</CardTitle>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Sponsorships</dt>
              <dd className="font-medium">{formatNaira(overview.sponsorRevenue)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Rent & payments</dt>
              <dd className="font-medium">{formatNaira(overview.rentRevenue)}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <p className="text-sm font-medium text-stone-700">Recent transactions</p>
            <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto text-xs text-stone-600">
              {[...revenue.sponsorships, ...revenue.rent].slice(0, 10).map((r) => (
                <li key={r.id} className="flex justify-between">
                  <span className="capitalize">{r.source}</span>
                  <span>{formatNaira(r.amount)}</span>
                </li>
              ))}
              {revenue.sponsorships.length + revenue.rent.length === 0 && (
                <li>No transactions this period</li>
              )}
            </ul>
          </div>
        </Card>

        <OpexEntryForm />
      </div>

      {opexList.length > 0 && (
        <Card className="mt-8">
          <CardTitle>OPEX entries this period</CardTitle>
          <ul className="mt-4 space-y-2 text-sm">
            {opexList.map((entry) => (
              <li key={entry.id} className="flex justify-between border-b border-stone-100 pb-2">
                <span className="capitalize">{entry.category} — {entry.description ?? "No description"}</span>
                <span className="font-medium">{formatNaira(entry.amount)}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
