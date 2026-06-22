import { AdminNav } from "@/components/layout/admin-nav";
import { SponsorCrmBoard } from "@/components/admin/sponsor-crm-board";
import { getSponsorsForCrm, getCampaignStats } from "@/modules/sponsor/queries";
import { formatNaira } from "@/lib/utils";

export default async function AdminSponsorCrmPage() {
  const [sponsors, stats] = await Promise.all([
    getSponsorsForCrm(),
    getCampaignStats(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <AdminNav active="/admin/sponsors" />
      <h1 className="text-3xl font-bold">Sponsor CRM</h1>
      <p className="mt-2 text-stone-600">
        Manage the sponsor pipeline from prospect to active. {stats.fundedBeds} of {stats.totalBeds} beds funded • {formatNaira(stats.totalRaised)} raised.
      </p>
      
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-stone-200 p-4">
          <p className="text-sm font-medium text-stone-600">Total raised</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{formatNaira(stats.totalRaised)}</p>
        </div>
        <div className="rounded-lg border border-stone-200 p-4">
          <p className="text-sm font-medium text-stone-600">Target</p>
          <p className="mt-1 text-2xl font-bold">{formatNaira(stats.totalTarget)}</p>
        </div>
        <div className="rounded-lg border border-stone-200 p-4">
          <p className="text-sm font-medium text-stone-600">Coverage</p>
          <p className="mt-1 text-2xl font-bold">{stats.totalTarget > 0 ? Math.round((stats.totalRaised / stats.totalTarget) * 100) : 0}%</p>
        </div>
        <div className="rounded-lg border border-stone-200 p-4">
          <p className="text-sm font-medium text-stone-600">Active sponsors</p>
          <p className="mt-1 text-2xl font-bold">{sponsors.length}</p>
        </div>
      </div>

      <div className="mt-8">
        <SponsorCrmBoard sponsors={sponsors} />
      </div>
    </div>
  );
}
