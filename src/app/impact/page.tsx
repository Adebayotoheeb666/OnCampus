import { getCampaignStats, getPublishedImpactStories } from "@/modules/sponsor/queries";

export default async function ImpactPage() {
  const [stats, stories] = await Promise.all([
    getCampaignStats(),
    getPublishedImpactStories(),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12">
      {/* Aggregate Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 mb-4">
          <h1 className="font-headline-lg text-4xl font-bold text-primary mb-2">Our Shared Impact</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">Real numbers. Real students. Real stability. See how your contributions are transforming university life.</p>
        </div>

        {/* Metric Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-48">
          <div>
            <span className="text-xs font-bold text-status-sponsored bg-status-sponsored/10 px-2 py-1 rounded">LIFETIME IMPACT</span>
            <h2 className="text-4xl font-bold text-primary mt-4">{stats.fundedBeds || 1248}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-status-available">diversity_3</span>
            <span className="text-sm text-on-surface-variant">Students Housed</span>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-48">
          <div>
            <span className="text-xs font-bold text-impact-gold bg-impact-gold/10 px-2 py-1 rounded">ACADEMIC SUCCESS</span>
            <h2 className="text-4xl font-bold text-primary mt-4">94.2%</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-status-maintenance">school</span>
            <span className="text-sm text-on-surface-variant">Graduation Rate</span>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-48">
          <div>
            <span className="text-xs font-bold text-status-available bg-status-available/10 px-2 py-1 rounded">EQUITY SCORE</span>
            <h2 className="text-4xl font-bold text-primary mt-4">88%</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">payments</span>
            <span className="text-sm text-on-surface-variant">Average Need Met</span>
          </div>
        </div>

        {/* Full-width Progress */}
        <div className="md:col-span-3 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs font-bold text-primary tracking-widest">FREE-BED COVERAGE RATIO</span>
            <span className="text-sm font-bold text-impact-gold">72% Goal Reached</span>
          </div>
          <div className="w-full h-4 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary via-primary-fixed to-impact-gold w-[72%] transition-all duration-1000"></div>
          </div>
          <p className="mt-4 text-on-surface-variant text-sm">We are currently supporting 720 out of 1,000 students identified as high-need residents.</p>
        </div>
      </section>

      {/* Student Stories Gallery */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <h2 className="text-3xl font-bold text-primary">Voices from the Residences</h2>
          <a href="#" className="text-secondary font-bold hover:underline flex items-center gap-2 text-sm">
            View All Stories
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

        {stories && stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured Story */}
            <div className="md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden group">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div 
                  className="h-80 md:h-full bg-cover bg-center" 
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9UYyV5ooyHFI1FULZZDe7skm-RjWuSvF6YNc4dqx6pQimQdoSvNWnngRVDjUiJJo85aYWKq2gbG9cOf1_xjq_kZP25W47TqOU2RxEATo-9x4fIKDo9s1GyDiBrLO6MdR6eqzk9PyJs08vZ4e_tR56Eyakwm8h0PlbfJ-7aopsrh_9DSMb4JxaAdHdijXmVj6bdb0fCRif6_HCeKjUk0egkocPakihgLImgMX1iBQSS18a2M5r6Pnpvb7n5R5nzyiyjBdI2f7IlTSJ')`
                  }}
                />
                <div className="p-8 flex flex-col justify-center space-y-6">
                  <span className="text-xs font-bold text-status-sponsored tracking-widest">CLASS OF 2024</span>
                  <blockquote className="text-2xl font-bold text-primary italic">"OnCampus didn&apos;t just give me a room; they gave me the mental space to focus on my research without fear of homelessness."</blockquote>
                  <div>
                    <p className="font-bold text-primary">{stories[0]?.title || "Marcus J."}</p>
                    <p className="text-on-surface-variant text-sm">{stories[0]?.excerpt || "Biomedical Engineering"}</p>
                  </div>
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold self-start hover:bg-primary-container transition-colors active:scale-95">
                    Read Story
                  </button>
                </div>
              </div>
            </div>

            {/* Small Stories */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {stories.slice(1, 3).map((story, idx) => (
                <div key={story.id} className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex gap-6 items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-surface-container">
                    <img 
                      className="w-full h-full object-cover" 
                      src={idx === 0 ? "https://lh3.googleusercontent.com/aida-public/AB6AXuC4gl_N9KdHbhouy8d2hdVwvYSa9C0WEBvpBcJnc06hO_wFSe44_HgzXkkwg4V941ivohBLvDaHV9cZ0VhnkFquw8_0A1CVvj-_6AoT9n1vfxGf0J6VtGgy1H-ksNIImwyF5iApxodX6HC9mwmJe7jvDKjH-zwAsfnXmXsZdJLLUod9kqLvjtRWenQMv5-Va-GJu9r31OhMJsQnhrGkhzus2MVLCw4KKFP1nFIBbj_ORw6Rj2v37HbsZkWe9MwSHMcc5HQKOD46baX8" : "https://lh3.googleusercontent.com/aida-public/AB6AXuD0RhRkslj4taY2m4E32qqQk-YjiRsekCh-4mdlhz68lpOs6AgCQUeovU5eVzz6S3_GqnIiC_WC0U8IbV9FF49tnkcmFU-MYsL5u-j9H2--vTYAhhMVS4LziZKy6J5T8Pey3DsVETUgIzrEWW9nVCfdeu18TDFO5GZqTJW24RaCMGgLy56vUo7XbOE1GCsIhdm3PPNtm960fd7-yNrB-rPoj3SvCkJUikm4DDeNfcsAqOl2VgLJ57GxbliRROezDBzrExy7jWshdXSm"}
                      alt={story.title}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-on-surface italic">{story.excerpt}</p>
                    <p className="text-xs font-bold text-primary tracking-widest">{story.title}</p>
                    <a href="#" className="text-secondary text-xs font-bold hover:underline inline-block mt-2">READ STORY</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-outline-variant p-8 text-center text-on-surface-variant">
            Impact stories will appear here once students grant consent and content is published.
          </p>
        )}
      </section>

      {/* Transparency Section */}
      <section className="bg-tertiary-container text-on-tertiary-container rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Full Fund Transparency</h2>
            <p className="text-lg">Every dollar donated to OnCampus is tracked through our blockchain-verified ledger. We maintain a strict 92% efficiency rate, ensuring your contributions go directly to bed space and resident support services.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-status-available"></div>
                <span className="text-xs font-bold tracking-widest">92% RESIDENT HOUSING</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-secondary-container"></div>
                <span className="text-xs font-bold tracking-widest">5% ACADEMIC MENTORSHIP</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-outline-variant"></div>
                <span className="text-xs font-bold tracking-widest">3% OPERATIONAL OVERHEAD</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center space-y-6">
            <span className="material-symbols-outlined text-6xl text-primary-fixed-dim block">analytics</span>
            <h3 className="text-2xl font-bold text-white">2024 Impact Report</h3>
            <p className="text-on-tertiary-container text-sm">A detailed breakdown of university partnerships, student demographics, and financial auditing.</p>
            <button className="w-full bg-secondary text-on-secondary px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-secondary/90 transition-all active:scale-95">
              <span className="material-symbols-outlined">download</span>
              Download Full Report (PDF)
            </button>
            <p className="text-xs text-on-tertiary-container/60 font-label-caps uppercase">Last updated: Oct 12, 2024</p>
          </div>
        </div>
      </section>
    </main>
  );
}
