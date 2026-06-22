"use client";

import Image from "next/image";

export function ImpactSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-surface-container-lowest overflow-hidden" id="impact">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg relative w-full h-[400px] md:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                alt="Student in dormitory"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-impact-gold rounded-2xl p-6 shadow-lg text-on-surface max-w-xs">
              <p className="font-bold text-lg mb-1">&quot;Changed my life&quot;</p>
              <p className="text-sm opacity-90">
                With my bed fully sponsored, I can focus on studies without worrying about where to sleep.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Real Stories, Real Impact</h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              Behind every bed is a story of resilience and dreams. Our sponsors aren&apos;t just funding accommodation—they&apos;re enabling education, changing lives, and building futures.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">Student Success</h3>
                  <p className="text-sm text-on-surface-variant">450+ students have secure housing through our program</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">Academic Performance</h3>
                  <p className="text-sm text-on-surface-variant">Sponsored students show 25% improvement in academic outcomes</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">people</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">Community Impact</h3>
                  <p className="text-sm text-on-surface-variant">Building a supportive ecosystem that extends beyond housing</p>
                </div>
              </div>
            </div>

            <button className="mt-8 bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
              Read Student Stories
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
