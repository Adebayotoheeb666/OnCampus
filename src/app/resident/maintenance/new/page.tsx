import { Card, CardTitle } from "@/components/ui/card";
import { ResidentNav } from "@/components/layout/resident-nav";
import { MaintenanceRequestForm } from "@/components/resident/maintenance-form";
import { requireResidentContext } from "@/lib/resident/context";

export default async function NewMaintenancePage() {
  const ctx = await requireResidentContext();

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <ResidentNav active="/resident/maintenance" />
      <Card>
        <CardTitle>Report a maintenance issue</CardTitle>
        <div className="mt-4">
          <MaintenanceRequestForm tenantId={ctx.tenant.id} />
        </div>
      </Card>
    </div>
  );
}
