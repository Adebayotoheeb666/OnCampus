export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <header className="w-full sticky top-0 z-50 glass-header border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-4 md:px-6 py-2 w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
              <span>📚</span>
            </div>
            <span className="text-2xl font-extrabold text-primary hidden sm:inline">OnCampus</span>
          </div>
        </div>
      </header>

      <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden mt-16">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/80 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 py-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary-container/30 border border-secondary-container text-on-secondary-container px-3 py-1 rounded-full">
              <span className="text-xs font-semibold tracking-wider uppercase">✓ FUTA Official Partner</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
              Change a Life, One Bed at a Time
            </h1>

            <p className="text-lg text-on-surface-variant max-w-lg">
              EduStay bridges the gap between available campus housing and students in need. Direct-impact sponsorship that ensures a stable future for the next generation of leaders.
            </p>

            <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant shadow-sm max-w-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">2024 Campaign Progress</span>
                <span className="text-2xl font-bold text-impact-gold">65%</span>
              </div>
              <div className="w-full h-4 bg-surface-container-low rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-primary to-impact-gold" style={{ width: '65%' }} />
              </div>
              <div className="flex justify-between text-on-surface-variant text-xs font-semibold">
                <span>₦1.2M Raised</span>
                <span>₦2.0M Goal</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-4xl font-bold text-primary">0</span>
              <span className="text-xs font-semibold uppercase text-on-surface-variant mt-1">Beds Funded</span>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-4xl font-bold text-primary">450+</span>
              <span className="text-xs font-semibold uppercase text-on-surface-variant mt-1">Students Housed</span>
            </div>
            <div className="col-span-2 bg-primary p-4 rounded-xl flex items-center gap-4 text-on-primary shadow-lg">
              <div className="p-2 bg-white/10 rounded-lg">
                <span className="text-3xl">👥</span>
              </div>
              <div>
                <p className="font-bold text-sm">89 Sponsors Active</p>
                <p className="text-xs opacity-80">Join our community of change-makers today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-surface-container-low">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">How It Works</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Sponsoring a student&apos;s housing is a simple, secure, and transparent process designed to create immediate impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🛏️', title: '1. Choose a Bed', desc: 'Browse our inventory of verified campus hostel beds.' },
              { icon: '💳', title: '2. Fund the Gap', desc: 'Contribute any amount toward the total cost.' },
              { icon: '📊', title: '3. Track Impact', desc: 'Receive updates once the bed is fully funded.' },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-6 shadow-sm text-3xl">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-on-surface-variant">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
