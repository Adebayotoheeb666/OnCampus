import { AdminNav } from "@/components/layout/admin-nav";
import { getAllocationAuditLog } from "@/modules/allocation/queries";

export default async function AllocationAuditPage() {
  const logs = await getAllocationAuditLog();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <AdminNav active="/admin/allocation/audit" />
      <h1 className="text-3xl font-bold">Allocation audit log</h1>
      <p className="mt-2 text-stone-600">Transparent record of every allocation decision.</p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-stone-200">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Applicant</th>
              <th className="p-3">Action</th>
              <th className="p-3">Bed</th>
              <th className="p-3">By</th>
              <th className="p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(({ log, applicantName, bedLabel, blockName, roomNumber }) => (
              <tr key={log.id} className="border-t border-stone-100">
                <td className="p-3 whitespace-nowrap">{log.createdAt.toLocaleString("en-NG")}</td>
                <td className="p-3">{applicantName}</td>
                <td className="p-3 capitalize">{log.action}</td>
                <td className="p-3">
                  {bedLabel ? `${blockName} · Rm ${roomNumber} · Bed ${bedLabel}` : "—"}
                </td>
                <td className="p-3">{log.performedBy ?? "—"}</td>
                <td className="p-3 max-w-xs truncate">{log.notes ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <p className="p-8 text-center text-stone-500">No allocation events recorded yet.</p>
        )}
      </div>
    </div>
  );
}
