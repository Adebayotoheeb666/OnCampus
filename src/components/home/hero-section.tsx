import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  campaignPercent: number;
  totalRaised: number;
  totalTarget: number;
  fundedBeds: number;
}

export function HeroSection({ campaignPercent, totalRaised, totalTarget, fundedBeds }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden mt-16">
      <div className="absolute inset-0 z-0">
        <div
          className="bg-cover bg-center w-full h-full"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1553729815-925a128d715e?w=1200&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 py-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-secondary-container/30 border border-secondary-container text-on-secondary-container px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-xs font-semibold tracking-wider uppercase">FUTA Official Partner</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Change a Life,&nbsp;<br className="hidden md:block" /> One Bed at a Time
          </h1>

          <p className="text-lg text-on-surface-variant max-w-lg">
            EduStay bridges the gap between available campus housing and students in need. Direct-impact sponsorship that ensures a stable future for the next generation of leaders.
          </p>

          <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant shadow-sm max-w-md">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-primary">2024 Campaign Progress</span>
              <span className="text-2xl font-bold text-impact-gold">{campaignPercent}%</span>
            </div>
            <div className="w-full h-4 bg-surface-container-low rounded-full overflow-hidden mb-4">
              <div className="h-full impact-gradient transition-all duration-1000 ease-out" style={{ width: `${campaignPercent}%` }} />
            </div>
            <div className="flex justify-between text-on-surface-variant text-xs font-semibold">
              <span>₦{(totalRaised / 1000).toFixed(0)}K Raised</span>
              <span>₦{(totalTarget / 1000).toFixed(0)}K Goal</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="#inventory">
              <Button className="bg-primary text-on-primary px-8 py-3 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 w-full sm:w-auto">
                Browse Available Beds
                <span className="material-symbols-outlined">arrow_forward</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-4xl font-bold text-primary">{fundedBeds}</span>
            <span className="text-xs font-semibold uppercase text-on-surface-variant mt-1">Beds Funded</span>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-4xl font-bold text-primary">450+</span>
            <span className="text-xs font-semibold uppercase text-on-surface-variant mt-1">Students Housed</span>
          </div>
          <div className="col-span-2 bg-primary p-4 rounded-xl flex items-center gap-4 text-on-primary shadow-lg">
            <div className="p-2 bg-white/10 rounded-lg">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>diversity_3</span>
            </div>
            <div>
              <p className="font-bold text-sm">89 Sponsors Active</p>
              <p className="text-xs opacity-80">Join our community of change-makers today.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
