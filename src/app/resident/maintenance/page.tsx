import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ResidentNav } from "@/components/layout/resident-nav";
import { requireResidentContext } from "@/lib/resident/context";
import { getMaintenanceRequestsForTenant } from "@/modules/resident/queries";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-blue-100 text-blue-800",
  assigned: "bg-amber-100 text-amber-800",
  in_progress: "bg-orange-100 text-orange-800",
  resolved: "bg-emerald-100 text-emerald-800",
};

export default async function ResidentMaintenancePage() {
  const ctx = await requireResidentContext();
  const requests = await getMaintenanceRequestsForTenant(ctx.tenant.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ResidentNav active="/resident/maintenance" />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Maintenance</h1>
        <Link href="/resident/maintenance/new" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white">
          Report issue
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {requests.length === 0 ? (
          <p className="text-stone-500">No maintenance requests yet.</p>
        ) : (
          requests.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium capitalize">{r.category}</p>
                  <p className="mt-1 text-sm text-stone-600">{r.description}</p>
                  <p className="mt-2 text-xs text-stone-500">{r.createdAt.toLocaleString("en-NG")}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${STATUS_COLORS[r.status ?? "open"]}`}>
                  {r.status?.replace("_", " ")}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
