import { AdminNav } from "@/components/layout/admin-nav";
import { Card, CardTitle } from "@/components/ui/card";
import { formatNaira } from "@/lib/utils";
import { getAssets, getMaintenanceSchedules, getOverdueSchedules } from "@/modules/facilities/queries";

export default async function AdminFacilitiesPage() {
  const [assets, schedules, overdue] = await Promise.all([
    getAssets(),
    getMaintenanceSchedules(),
    getOverdueSchedules(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <AdminNav active="/admin/facilities" />
      <h1 className="text-3xl font-bold">Facilities management</h1>
      <p className="mt-2 text-stone-600">Asset registry and preventive maintenance schedules.</p>

      {overdue.length > 0 && (
        <Card className="mt-6 border-red-200 bg-red-50">
          <CardTitle className="text-red-800">{overdue.length} overdue maintenance task(s)</CardTitle>
        </Card>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Assets</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Last serviced</th>
                <th className="p-3">Interval (days)</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id} className="border-t border-stone-100">
                  <td className="p-3">{a.name}</td>
                  <td className="p-3">{a.category}</td>
                  <td className="p-3">{a.lastServiced?.toLocaleDateString("en-NG") ?? "—"}</td>
                  <td className="p-3">{a.serviceIntervalDays ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {assets.length === 0 && <p className="p-6 text-center text-stone-500">No assets registered. Run db:seed.</p>}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Maintenance schedules</h2>
        <div className="mt-4 space-y-3">
          {schedules.map(({ schedule, assetName }) => (
            <Card key={schedule.id}>
              <p className="font-medium">{assetName}</p>
              <p className="text-sm text-stone-600">
                Due: {schedule.scheduledDate.toLocaleDateString("en-NG")} · {schedule.status}
                {schedule.cost ? ` · ${formatNaira(schedule.cost)}` : ""}
              </p>
            </Card>
          ))}
          {schedules.length === 0 && <p className="text-stone-500">No scheduled maintenance.</p>}
        </div>
      </section>
    </div>
  );
}
