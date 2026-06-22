import { AdminNav } from "@/components/layout/admin-nav";
import { VisitorVerifyPanel } from "@/components/admin/visitor-verify-panel";
import { getAccessLogs, getIncidents } from "@/modules/security/queries";
import { getExpectedVisitors } from "@/modules/resident/queries";

export default async function AdminSecurityPage() {
  const [visitors, accessLogs, incidents] = await Promise.all([
    getExpectedVisitors(),
    getAccessLogs(30),
    getIncidents(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <AdminNav active="/admin/security" />
      <h1 className="text-3xl font-bold">Security & access</h1>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Visitor verification</h2>
        <div className="mt-4">
          <VisitorVerifyPanel visitors={visitors} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Recent access logs</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left">
              <tr>
                <th className="p-3">Time</th>
                <th className="p-3">Direction</th>
                <th className="p-3">Gate</th>
                <th className="p-3">Tenant / Visitor</th>
              </tr>
            </thead>
            <tbody>
              {accessLogs.map((log) => (
                <tr key={log.id} className="border-t border-stone-100">
                  <td className="p-3">{log.timestamp.toLocaleString("en-NG")}</td>
                  <td className="p-3 capitalize">{log.direction}</td>
                  <td className="p-3">{log.gateId}</td>
                  <td className="p-3 font-mono text-xs">{log.tenantId ?? log.visitorLogId ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {accessLogs.length === 0 && <p className="p-6 text-center text-stone-500">No access logs yet.</p>}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Incidents</h2>
        <div className="mt-4 space-y-3">
          {incidents.length === 0 ? (
            <p className="text-stone-500">No incidents reported.</p>
          ) : (
            incidents.map((inc) => (
              <div key={inc.id} className="rounded-lg border border-stone-200 p-4">
                <p className="font-medium capitalize">{inc.category} · {inc.severity}</p>
                <p className="mt-1 text-sm text-stone-600">{inc.description}</p>
                <p className="mt-1 text-xs text-stone-500">{inc.status} · {inc.createdAt.toLocaleString("en-NG")}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
