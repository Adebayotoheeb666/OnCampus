import Link from "next/link";

export default async function SponsorPortalPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Welcome Header */}
      <section className="mb-10">
        <h1 className="font-headline-lg text-4xl font-bold text-primary mb-2">Welcome back, Dr. Adeyemi</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl">Your contributions are directly supporting 12 students this semester. Here is the current impact of your sponsorship portfolio.</p>
      </section>

      {/* Bento Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Total Impact */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant tracking-widest">TOTAL IMPACT</span>
            <span className="material-symbols-outlined text-status-available">payments</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">₦4,250,000</div>
            <div className="flex items-center gap-1 text-status-available text-sm mt-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-bold">+12% from last month</span>
            </div>
          </div>
        </div>

        {/* Beds Funded */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant tracking-widest">BEDS FUNDED</span>
            <span className="material-symbols-outlined text-secondary">bed</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">12 <span className="text-lg font-normal text-on-surface-variant">Active Units</span></div>
            <div className="w-full bg-surface-container-high h-2 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-impact-gold" style={{ width: '75%' }}></div>
            </div>
            <div className="text-xs font-bold text-on-surface-variant mt-2 tracking-widest">75% OF PLEDGE TARGET REACHED</div>
          </div>
        </div>

        {/* Active Pledges */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant tracking-widest">ACTIVE PLEDGES</span>
            <span className="material-symbols-outlined text-impact-gold">verified</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">₦850,000</div>
            <div className="text-sm text-on-surface-variant mt-1">Next renewal: Oct 12, 2024</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* My Impact Feed */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">My Impact Feed</h2>
            <a href="#" className="text-secondary font-bold text-xs flex items-center gap-2 hover:underline tracking-widest">
              VIEW ALL <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="space-y-4">
            {/* Feed Item 1 */}
            <div className="flex gap-4 p-5 bg-surface-container-lowest border border-outline-variant rounded-xl items-start">
              <div className="w-12 h-12 shrink-0 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-primary">Student moved in</h3>
                  <span className="text-xs font-bold text-on-surface-variant tracking-widest">2 HOURS AGO</span>
                </div>
                <p className="text-on-surface-variant mb-3 text-sm">Room 402-B at a campus has been occupied by a newly sponsored engineering student.</p>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-status-sponsored/10 text-status-sponsored text-xs font-bold tracking-widest">SPONSORED</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold tracking-widest">CAMPUS</span>
                </div>
              </div>
            </div>

            {/* Feed Item 2 */}
            <div className="flex gap-4 p-5 bg-surface-container-lowest border border-outline-variant rounded-xl items-start">
              <div className="w-12 h-12 shrink-0 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined">construction</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-primary">Room maintenance complete</h3>
                  <span className="text-xs font-bold text-on-surface-variant tracking-widest">YESTERDAY</span>
                </div>
                <p className="text-on-surface-variant mb-3 text-sm">Routine AC servicing and painting completed for Unit 112. Your sponsorship ensures a high-quality living standard.</p>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-status-maintenance/10 text-status-maintenance text-xs font-bold tracking-widest">MAINTENANCE</span>
                </div>
              </div>
            </div>

            {/* Feed Item 3 */}
            <div className="flex gap-4 p-5 bg-surface-container-lowest border border-outline-variant rounded-xl items-start opacity-75">
              <div className="w-12 h-12 shrink-0 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-primary">Impact Report Available</h3>
                  <span className="text-xs font-bold text-on-surface-variant tracking-widest">3 DAYS AGO</span>
                </div>
                <p className="text-on-surface-variant mb-3 text-sm">The Q3 transparency report for the housing project is now ready for review.</p>
                <button className="text-secondary font-bold text-sm underline">Download PDF</button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Side Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-primary rounded-2xl text-on-primary">
            <h3 className="font-headline-md text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/beds">
                <button className="w-full bg-white text-primary font-bold py-3 px-4 rounded-xl flex items-center justify-between hover:bg-primary-fixed transition-colors">
                  <span>Fund More Beds</span>
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
              </Link>
              <button className="w-full bg-primary-container text-on-primary-container border border-primary-fixed-dim/30 font-bold py-3 px-4 rounded-xl flex items-center justify-between hover:bg-primary-container/80 transition-colors">
                <span>Download Certificates</span>
                <span className="material-symbols-outlined">verified</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-surface-container-lowest border border-outline-variant rounded-2xl">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-impact-gold">military_tech</span>
              Sponsor Recognition
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-3xl">workspace_premium</span>
              </div>
              <div>
                <div className="font-bold">Platinum Tier</div>
                <div className="text-xs text-on-surface-variant uppercase tracking-wider">Since Jan 2023</div>
              </div>
            </div>
            <div className="space-y-3 text-sm border-t border-outline-variant pt-4">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Transparency Rating</span>
                <span className="text-status-available font-bold">A+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Tax Deductible Sum</span>
                <span className="font-bold">₦1.2M</span>
              </div>
            </div>
          </div>

          {/* Promo Card */}
          <div className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuARHDE0ciLYFZrLheVPfzxE7zOm66FhdDtKa6VF91HvPPStO0Ec921448nyYifCzw955AxXqYRq8lCqQPgmJZZz0Puh5X-x2Le9bsJ3mIAdMdFot99W4uLz_i5OnR69Z5OhT2KeVkkSbQeGdPFuf2VNH2KFW43ilQhmxDxr_Hs33V3_biYaFmjM3kHX5RepaFHlzLbpBg1GxdclVCZCDI6AiDQ9pkatVRHASNeS7EaV-obCEmPyyFStHYaG5A_OEU0IW6jksBIbq7sz')`
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-4">
              <span className="text-white font-bold">See their stories</span>
              <p className="text-primary-fixed text-xs">Watch how your sponsorship changed lives this year.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
