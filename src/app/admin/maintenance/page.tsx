import { AdminNav } from "@/components/layout/admin-nav";
import { db } from "@/db";
import { maintenanceRequests } from "@/db/schema";
import { desc, eq, sql, and } from "drizzle-orm";

export default async function AdminMaintenancePage() {
  // Fetch all maintenance requests
  const tasks = await db
    .select()
    .from(maintenanceRequests)
    .where(
      and(
        sql`${maintenanceRequests.status} IN ('open', 'assigned', 'in_progress')`,
      ),
    )
    .orderBy(desc(maintenanceRequests.createdAt));

  // Calculate stats
  const allRequests = await db.select().from(maintenanceRequests);
  const activeCount = tasks.length;
  const resolvedCount = allRequests.filter(
    (r) => r.status === "resolved",
  ).length;

  // Estimate monthly spend (mock data - would need cost data in schema)
  const monthlySpend = 12480;

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/maintenance" />

      <main className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900">
            Maintenance Oversight
          </h1>
        </div>

        {/* Monthly Cost Summary */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm border border-stone-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl text-stone-900">
              payments
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase text-stone-600 mb-1">
              Monthly Maintenance Spend
            </p>
            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-stone-900">
                ${(monthlySpend / 100).toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <span className="material-symbols-outlined text-sm">
                  trending_down
                </span>
                4.2%
              </span>
            </div>
            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full bg-gradient-to-r from-stone-900 to-yellow-600"
                style={{ width: "65%" }}
              />
            </div>
            <p className="text-xs text-stone-600 italic">
              Budget utilization: 65% of $19,200 allocation
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4 shadow-sm border border-stone-200">
            <p className="text-xs font-semibold uppercase text-stone-600 mb-1">
              Active Requests
            </p>
            <p className="text-2xl font-bold text-yellow-600">{activeCount}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-stone-200">
            <p className="text-xs font-semibold uppercase text-stone-600 mb-1">
              Resolved (30d)
            </p>
            <p className="text-2xl font-bold text-emerald-600">{resolvedCount}</p>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="mb-8">
          <button className="w-full bg-stone-900 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-sm hover:bg-stone-800 transition-colors">
            <span className="material-symbols-outlined">add_task</span>
            Log Preventive Maintenance
          </button>
        </div>

        {/* Task List Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <span className="rounded-full bg-stone-900 text-white px-4 py-2 text-sm font-medium whitespace-nowrap">
            All Tasks
          </span>
          <span className="rounded-full bg-stone-200 text-stone-700 px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-stone-300">
            Urgent
          </span>
          <span className="rounded-full bg-stone-200 text-stone-700 px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-stone-300">
            In Progress
          </span>
          <span className="rounded-full bg-stone-200 text-stone-700 px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-stone-300">
            Pending
          </span>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-stone-900">
            Pending & In-Progress
          </h3>

          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl bg-white p-4 shadow-sm border border-stone-200 hover:border-stone-900/30 transition-all"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-[10px] font-bold uppercase mb-2 ${
                        task.priority === "urgent"
                          ? "bg-red-100 text-red-700"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {task.priority === "urgent" ? "Urgent" : "Normal"}
                    </span>
                    <h4 className="font-bold text-stone-900 mt-1">
                      {task.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1">
                      Category: {task.category}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-stone-400">
                    more_vert
                  </span>
                </div>

                {/* Assigned Info */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-blue-600">
                      {task.status === "in_progress" ? "engineering" : "pending_actions"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-stone-900">
                      {task.assignedTo || "Unassigned"}
                    </span>
                    <span className="text-[10px] text-stone-600 uppercase font-semibold">
                      {task.assignedTo ? "Assigned Staff" : "Awaiting Assignment"}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between border-t border-stone-200 pt-3">
                  <div className="flex items-center gap-2 text-yellow-600">
                    <span className="material-symbols-outlined text-sm">
                      {task.status === "in_progress"
                        ? "schedule"
                        : "pending_actions"}
                    </span>
                    <span className="text-xs font-bold uppercase">
                      {task.status === "open"
                        ? "Open"
                        : task.status === "assigned"
                          ? "Assigned"
                          : task.status === "in_progress"
                            ? "In Progress"
                            : "Resolved"}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-600">
                    Submitted: {task.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-stone-500">
              No active maintenance requests
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
