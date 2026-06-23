import Link from "next/link";
import { SponsorPledgesTable } from "@/components/sponsor/pledges-table";
import { requireSponsorContext } from "@/lib/sponsor/context";
import { getSponsorPledges, getCertificatesForSponsor } from "@/modules/sponsor/queries";
import { logoutSponsor } from "@/modules/auth/actions";

export default async function SponsorDashboardPage() {
  const { sponsor } = await requireSponsorContext();
  const [pledges, certificates] = await Promise.all([
    getSponsorPledges(sponsor.id),
    getCertificatesForSponsor(sponsor.id),
  ]);

  const certByPledge = new Map(certificates.map((c) => [c.pledge.id, c.certificate.fileUrl]));

  const rows = pledges.map((p) => ({
    ...p,
    certificateUrl: certByPledge.get(p.pledge.id) ?? null,
  }));

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Dashboard Header */}
      <section className="mb-10">
        <h1 className="font-headline-lg text-4xl font-bold text-primary mb-2">Sponsorship Dashboard</h1>
        <p className="text-lg text-on-surface-variant">Manage your active student bed sponsorships, monitor progress, and handle administrative renewals in one transparent portal.</p>
      </section>

      {/* Stats Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
          <p className="text-xs font-bold text-on-surface-variant tracking-widest mb-1">TOTAL SPONSORED</p>
          <h3 className="text-3xl font-bold text-primary">04 Beds</h3>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
          <p className="text-xs font-bold text-on-surface-variant tracking-widest mb-1">IMPACT RATIO</p>
          <h3 className="text-3xl font-bold text-impact-gold">87% Tenure</h3>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
          <p className="text-xs font-bold text-on-surface-variant tracking-widest mb-1">TOTAL CONTRIBUTION</p>
          <h3 className="text-3xl font-bold text-secondary">$12,450.00</h3>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
          <p className="text-xs font-bold text-on-surface-variant tracking-widest mb-1">EXPIRING SOON</p>
          <h3 className="text-3xl font-bold text-error-critical">01 Bed</h3>
        </div>
      </div>

      {/* Active Sponsorships Bento Grid */}
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined">hotel</span> Active Bed Inventory
      </h2>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary">Payment History</h2>
            <p className="text-on-surface-variant text-sm">View and download your tax-deductible sponsorship receipts.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-outline text-on-surface-variant text-sm font-bold px-4 py-2 rounded-full hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">download</span>
              Export
            </button>
            <button className="flex items-center gap-2 border border-outline text-on-surface-variant text-sm font-bold px-4 py-2 rounded-full hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
              Filter
            </button>
          </div>
        </div>

        {/* Pledges Table */}
        {rows && rows.length > 0 ? (
          <div className="overflow-x-auto">
            <SponsorPledgesTable pledges={rows} />
          </div>
        ) : (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4 block">inventory_2</span>
            <p className="text-on-surface-variant">No active sponsorships yet. Start sponsoring beds today!</p>
            <Link href="/beds">
              <button className="mt-4 bg-primary text-on-primary font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                Browse Beds
              </button>
            </Link>
          </div>
        )}
      </div>

      <p className="mt-8 text-sm text-on-surface-variant">
        <Link href="/impact" className="text-secondary font-bold hover:underline">
          View impact reports →
        </Link>
      </p>
    </main>
  );
}
