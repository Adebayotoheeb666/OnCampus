import { Card } from "@/components/ui/card";
import { ResidentNav } from "@/components/layout/resident-nav";
import { LaundryBookingForm } from "@/components/resident/laundry-booking-form";
import { requireResidentContext } from "@/lib/resident/context";
import { getLaundromatMachines, getBookingsForTenant } from "@/modules/resident/queries";

export default async function ResidentLaundryPage() {
  const ctx = await requireResidentContext();
  const [machines, bookings] = await Promise.all([
    getLaundromatMachines(),
    getBookingsForTenant(ctx.tenant.id),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ResidentNav active="/resident/laundry" />
      <h1 className="text-2xl font-bold">Laundromat booking</h1>

      <Card className="mt-6">
        <LaundryBookingForm tenantId={ctx.tenant.id} machines={machines} />
      </Card>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Your bookings</h2>
        <div className="mt-4 space-y-3">
          {bookings.length === 0 ? (
            <p className="text-sm text-stone-500">No bookings yet.</p>
          ) : (
            bookings.map(({ booking, machineLabel }) => (
              <Card key={booking.id}>
                <p className="font-medium">{machineLabel}</p>
                <p className="text-sm text-stone-600">
                  {booking.slotStart.toLocaleString("en-NG")} – {booking.slotEnd.toLocaleTimeString("en-NG")}
                </p>
                <p className="text-xs capitalize text-stone-500">{booking.status}</p>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
