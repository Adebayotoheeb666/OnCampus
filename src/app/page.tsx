import Link from "next/link";
import { Button } from "@/components/ui/button";
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
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-r from-teal-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-800 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-20 grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 text-blue-900 px-4 py-2 rounded-full w-fit">
              <span className="text-sm font-semibold">✓ FUTA OFFICIAL PARTNER</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-teal-900 leading-tight">
              Change a Life, <br /> One Bed at a Time
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-700 max-w-lg">
              EduStay bridges the gap between available campus housing and students in need. Direct-impact sponsorship that ensures a stable future for the next generation of leaders.
            </p>

            {/* Campaign Progress Card */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md max-w-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-teal-900 tracking-wider">2024 CAMPAIGN PROGRESS</span>
                <span className="text-2xl font-bold text-amber-600">{campaignPercent}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-teal-900 to-amber-600 transition-all duration-1000" style={{ width: `${campaignPercent}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-600 font-semibold">
                <span>{formatNaira(stats.totalRaised)} RAISED</span>
                <span>{formatNaira(stats.totalTarget)} GOAL</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/beds">
                <Button size="lg" className="bg-teal-900 text-white hover:bg-teal-950 h-12 px-8 text-base">
                  Browse Available Beds →
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 p-6 rounded-xl flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-4xl font-bold text-teal-900">{stats.fundedBeds}</span>
              <span className="text-xs font-semibold text-gray-600 mt-2 tracking-wider">BEDS FUNDED</span>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-4xl font-bold text-teal-900">{CAMPAIGN_TARGET_BEDS}+</span>
              <span className="text-xs font-semibold text-gray-600 mt-2 tracking-wider">TARGET BEDS</span>
            </div>
            <div className="col-span-2 bg-teal-900 text-white p-6 rounded-xl flex items-center gap-4 shadow-lg">
              <div className="p-3 bg-white/10 rounded-lg">
                <span>👥</span>
              </div>
              <div>
                <p className="font-bold text-lg">89 Sponsors Active</p>
                <p className="text-teal-100 text-sm">Join our community of change-makers today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sponsoring a student&apos;s housing is a simple, secure, and transparent process designed to create immediate impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 text-2xl mb-6 font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-3">Choose a Bed</h3>
              <p className="text-gray-600">
                Browse our inventory of verified campus hostel beds. Select a room or a student currently seeking funding.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 text-2xl mb-6 font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-3">Fund the Gap</h3>
              <p className="text-gray-600">
                Contribute any amount toward the total cost. Your funds are held securely and released directly to the university housing office.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 text-2xl mb-6 font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-3">Track Impact</h3>
              <p className="text-gray-600">
                Receive updates once the bed is fully funded and the student has moved in. See the tangible difference your support makes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Beds Section */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-teal-900 mb-2">Available for Sponsorship</h2>
              <p className="text-gray-600">
                Every card represents a tangible impact. Filter by hostel block or funding progress to find a student to support.
              </p>
            </div>
            <Link href="/beds" className="text-teal-900 font-semibold hover:underline whitespace-nowrap">
              View all beds →
            </Link>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-teal-900 text-white rounded-lg whitespace-nowrap font-semibold hover:bg-teal-950 transition-colors">
              ALL BLOCKS
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg whitespace-nowrap font-semibold hover:bg-gray-300 transition-colors">
              BLOCK A
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg whitespace-nowrap font-semibold hover:bg-gray-300 transition-colors">
              BLOCK B
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg whitespace-nowrap font-semibold hover:bg-gray-300 transition-colors">
              LOW FUNDING
            </button>
          </div>

          {/* Beds Grid */}
          {featuredBeds.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBeds.map((bed) => (
                <BedCard key={bed.id} bed={bed} />
              ))}

              {/* Quick Sponsor Card */}
              <div className="bg-teal-900 text-white p-6 rounded-xl flex flex-col justify-between shadow-lg">
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    ✨
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gift a Semester</h3>
                  <p className="text-teal-100 opacity-80 mb-6">
                    Can&apos;t decide on a specific room? Your contribution will be automatically assigned to the bed with the highest need.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg font-semibold text-sm transition-colors border border-white/10">
                      $100
                    </button>
                    <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg font-semibold text-sm transition-colors border border-white/10">
                      $250
                    </button>
                    <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg font-semibold text-sm transition-colors border border-white/10">
                      $500
                    </button>
                  </div>
                  <button className="w-full bg-white text-teal-900 py-3 rounded-lg font-bold shadow-md hover:bg-gray-100 transition-colors">
                    Quick Sponsor
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
              No beds in the catalogue yet. Run <code className="text-sm">npm run db:seed</code> to load pilot inventory.
            </p>
          )}
        </div>
      </section>

      {/* Transparency Section */}
      <section className="w-full py-16 bg-teal-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="rounded-xl border border-teal-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-teal-900 mb-3">Built on Transparency</h2>
            <p className="text-gray-700 max-w-2xl mb-4">
              Every allocation decision is logged. Sponsors receive digital receipts and certificates. Impact reports are published with explicit student consent.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-teal-100 text-teal-900 px-4 py-2 rounded-full text-sm font-semibold">
                FUTA Partnership
              </span>
              <span className="bg-teal-100 text-teal-900 px-4 py-2 rounded-full text-sm font-semibold">
                Auditable Allocations
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
