import { AdminNav } from "@/components/layout/admin-nav";
import { TenantCheckoutPanel } from "@/components/admin/tenant-checkout-panel";
import { getTenantsNearingCheckout } from "@/modules/allocation/queries";

export default async function TenantCheckoutPage() {
  const tenants = await getTenantsNearingCheckout(60);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <AdminNav active="/admin/tenants/checkout" />
      <h1 className="text-3xl font-bold">Tenant checkout</h1>
      <p className="mt-2 text-stone-600">
        Process end-of-session checkouts and free beds for re-allocation.
      </p>
      <div className="mt-8">
        <TenantCheckoutPanel tenants={tenants} />
      </div>
    </div>
  );
}
