import { AdminNav } from "@/components/layout/admin-nav";
import { MaintenanceAdminBoard } from "@/components/admin/maintenance-admin-board";
import { getAllMaintenanceRequests } from "@/modules/resident/queries";

export default async function AdminMaintenancePage() {
  const requests = await getAllMaintenanceRequests();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <AdminNav active="/admin/maintenance" />
      <h1 className="text-3xl font-bold">Maintenance requests</h1>
      <p className="mt-2 text-stone-600">Reactive requests from residents, routed from the Resident App.</p>
      <div className="mt-8">
        <MaintenanceAdminBoard requests={requests} />
      </div>
    </div>
  );
}
