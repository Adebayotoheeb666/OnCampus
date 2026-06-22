import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { ResidentNav } from "@/components/layout/resident-nav";
import { requireResidentContext } from "@/lib/resident/context";
import {
  getOpenMaintenanceCount,
  getRecentAnnouncements,
  getBookingsForTenant,
} from "@/modules/resident/queries";
import { getTenantPaymentSummary } from "@/modules/payments/queries";
import { formatNaira } from "@/lib/utils";

export default async function ResidentHomePage() {
  const ctx = await requireResidentContext();
  const [openMaintenance, announcements, bookings, payments] = await Promise.all([
    getOpenMaintenanceCount(ctx.tenant.id),
    getRecentAnnouncements(3),
    getBookingsForTenant(ctx.tenant.id),
    getTenantPaymentSummary(ctx.tenant.id),
  ]);

  const nextBooking = bookings.find((b) => b.booking.status === "booked" && b.booking.slotStart > new Date());

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <ResidentNav active="/resident/home" />
      <h1 className="text-2xl font-bold">Welcome, {ctx.applicant.fullName}</h1>
      <p className="text-stone-600">
        {ctx.blockName} · Room {ctx.roomNumber} · Bed {ctx.bedLabel}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/resident/maintenance/new", label: "Report issue", sub: `${openMaintenance} open` },
          { href: "/resident/laundry", label: "Book laundry", sub: nextBooking ? "Upcoming slot" : "No bookings" },
          { href: "/resident/wallet", label: "My wallet", sub: formatNaira(payments.walletBalance) },
          { href: "/resident/visitors", label: "Visitor pass", sub: "Pre-register" },
        ].map((tile) => (
          <Link key={tile.href} href={tile.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <p className="font-semibold">{tile.label}</p>
              <p className="mt-1 text-sm text-stone-500">{tile.sub}</p>
            </Card>
          </Link>
        ))}
      </div>

      {payments.balanceDue > 0 && (
        <Card className="mt-6 border-amber-200 bg-amber-50">
          <p className="font-medium text-amber-900">
            Outstanding balance: {formatNaira(payments.balanceDue)}
          </p>
          <Link href="/resident/dashboard" className="mt-2 inline-block text-sm text-amber-800 hover:underline">
            View invoices →
          </Link>
        </Card>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Announcements</h2>
        {announcements.length === 0 ? (
          <p className="mt-2 text-sm text-stone-500">No announcements yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {announcements.map((a) => (
              <Card key={a.id}>
                <CardTitle className="text-base">{a.title}</CardTitle>
                <p className="mt-1 text-sm text-stone-600">{a.body}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
