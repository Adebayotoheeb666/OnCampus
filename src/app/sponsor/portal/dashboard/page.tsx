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
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {sponsor.fullName}</h1>
          <p className="text-stone-600">{sponsor.email}</p>
        </div>
        <form action={logoutSponsor}>
          <button type="submit" className="text-sm text-stone-500 hover:text-stone-800">
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-8">
        <SponsorPledgesTable pledges={rows} />
      </div>

      <p className="mt-8 text-sm text-stone-500">
        <Link href="/impact" className="text-emerald-800 hover:underline">
          View impact reports →
        </Link>
      </p>
    </div>
  );
}
