import { Card, CardTitle } from "@/components/ui/card";
import { ResidentNav } from "@/components/layout/resident-nav";
import { VisitorRegistrationForm } from "@/components/resident/visitor-form";
import { requireResidentContext } from "@/lib/resident/context";
import { getVisitorsForTenant } from "@/modules/resident/queries";

export default async function ResidentVisitorsPage() {
  const ctx = await requireResidentContext();
  const visitors = await getVisitorsForTenant(ctx.tenant.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ResidentNav active="/resident/visitors" />
      <h1 className="text-2xl font-bold">Visitor pre-registration</h1>

      <Card className="mt-6">
        <CardTitle>Register a visitor</CardTitle>
        <div className="mt-4">
          <VisitorRegistrationForm tenantId={ctx.tenant.id} />
        </div>
      </Card>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Registered visitors</h2>
        <div className="mt-4 space-y-3">
          {visitors.map((v) => (
            <Card key={v.id}>
              <p className="font-medium">{v.visitorName}</p>
              <p className="text-sm text-stone-600">{v.visitorPhone ?? "No phone"}</p>
              <p className="text-xs text-stone-500">
                Expected: {v.expectedArrival?.toLocaleString("en-NG") ?? "—"} · {v.status}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
