import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BedCard } from "@/components/sponsor/bed-card";
import { CAMPAIGN_TARGET_BEDS } from "@/lib/constants";
import { formatNaira, fundingPercent } from "@/lib/utils";
import { getAvailableBeds, getCampaignStats } from "@/modules/sponsor/queries";

export default async function HomePage() {
  const [stats, beds] = await Promise.all([
    getCampaignStats(),
    getAvailableBeds({ status: "available" }),
  ]);

  const campaignPercent = fundingPercent(stats.totalRaised, stats.totalTarget);
  const featuredBeds = beds.slice(0, 3);

  return (
    <>
      <section className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-200">
            FUTA Pilot · Sponsor a Bed
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            Give a first-year student a safe place to call home
          </h1>
          <p className="mt-4 max-w-xl text-lg text-emerald-100">
            OnCampus connects alumni, diaspora sponsors, and partners with 100L students
            who need accommodation at the Federal University of Technology, Akure.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/beds">
              <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
                Sponsor a Bed
              </Button>
            </Link>
            <Link href="/impact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                See Our Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-emerald-800">{stats.fundedBeds}</p>
            <p className="text-sm text-stone-600">Beds funded</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-emerald-800">{CAMPAIGN_TARGET_BEDS}</p>
            <p className="text-sm text-stone-600">Pilot target beds</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-emerald-800">{formatNaira(stats.totalRaised)}</p>
            <p className="text-sm text-stone-600">Total raised</p>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Campaign progress</h2>
          <p className="mt-1 text-sm text-stone-600">
            {campaignPercent}% of our pilot funding goal reached
          </p>
          <ProgressBar
            className="mt-4"
            funded={stats.totalRaised}
            target={stats.totalTarget || 1}
          />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Beds awaiting sponsors</h2>
              <p className="mt-1 text-stone-600">Choose a bed and fund it fully or partially</p>
            </div>
            <Link href="/beds" className="text-sm font-medium text-emerald-800 hover:underline">
              View all beds →
            </Link>
          </div>
          {featuredBeds.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBeds.map((bed) => (
                <BedCard key={bed.id} bed={bed} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
              No beds in the catalogue yet. Run <code className="text-sm">npm run db:seed</code> to
              load pilot inventory.
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-8">
          <h2 className="text-xl font-semibold text-emerald-900">Built on transparency</h2>
          <p className="mt-2 max-w-2xl text-stone-700">
            Every allocation decision is logged. Sponsors receive digital receipts and certificates.
            Impact reports are published with explicit student consent.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-800">
              FUTA Partnership
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-800">
              Auditable allocations
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
