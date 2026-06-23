import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/sponsor/checkout-form";
import { getBedById } from "@/modules/sponsor/queries";

type Params = Promise<{ bedId: string }>;

export default async function CheckoutPage({ params }: { params: Params }) {
  const { bedId } = await params;
  const bed = await getBedById(bedId);

  if (!bed) notFound();

  return (
    <main className="min-h-[calc(100vh-180px)] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Checkout Header */}
        <div className="mb-10 text-center">
          <h1 className="font-headline-lg text-4xl font-bold text-primary mb-2">Complete Sponsorship</h1>
          <p className="text-on-surface-variant max-w-lg mx-auto">Your contribution provides a stable home for a high-performing student in need. Securely finalize your support below.</p>
        </div>

        {/* Multi-Step Progress */}
        <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto px-4">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant -translate-y-1/2 z-0"></div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface flex items-center justify-center font-bold text-primary">1</div>
            <span className="text-xs font-bold text-primary tracking-widest">SUMMARY</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-outline-variant bg-surface flex items-center justify-center font-bold text-on-surface-variant">2</div>
            <span className="text-xs font-bold text-on-surface-variant tracking-widest">INFO</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-outline-variant bg-surface flex items-center justify-center font-bold text-on-surface-variant">3</div>
            <span className="text-xs font-bold text-on-surface-variant tracking-widest">PAYMENT</span>
          </div>
        </div>

        {/* Step Containers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Flow */}
          <div className="lg:col-span-8">
            {/* Step 1: Selection Summary */}
            <section className="space-y-6">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 overflow-hidden relative">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-48 h-32 rounded-lg relative overflow-hidden bg-surface-container">
                    <img 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdHkUNAEgjCy0VsYwWEpIU89V0NJD8xzlqd3G-Ji_lMeDHDdpLfEK04lBbnCJljwVeSNW-4Efsr8-L4WN2uAWwEnMThO1bN3mvXTZiMAdZNP_OaaxExRn3thAGp5-BvLU0qu_MhKc_G1VunVfw_CW3LJeyjFqimB6dpql8VN1vYSs1T-GeHcfXkYUeqnhMYxuguOZBGXfr9CYo8Tw2l289Uuvbs9dHy2ch1bPZHQiHp0IpBJN2nug0zVrBHapFP16U0Ysky0dQpWHZ"
                      alt="Room"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-status-available text-white text-xs font-bold rounded">PREMIUM TIER</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="text-xs font-bold text-secondary tracking-widest mb-1">UNIT IDENTIFIER</div>
                    <h3 className="text-2xl font-bold text-primary">Bed #{bed.id || 'EDU-7742-B'}</h3>
                    <div className="flex gap-4 text-on-surface-variant text-sm">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        <span>{bed.roomNumber || 'West Wing, Room 402'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        <span>Academic Year 2024/25</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-outline-variant pt-6 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs font-bold text-on-surface-variant tracking-widest mb-1">SPONSORSHIP AMOUNT</span>
                    <span className="text-2xl font-bold text-primary">${bed.pricePerYear || '1,200'}.00 <small className="text-sm font-normal text-on-surface-variant">/annual</small></span>
                  </div>
                  <div className="text-right flex flex-col justify-end">
                    <div className="flex items-center justify-end gap-2 text-status-sponsored">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span className="text-xs font-bold tracking-widest">FULLY TAX DEDUCTIBLE</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button className="bg-primary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
                  Continue to Information <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar/Impact Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-primary text-white rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-9xl">award_star</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-xs font-bold text-primary-fixed tracking-widest mb-4">SPONSORSHIP IMPACT</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary-fixed text-sm">check_circle</span>
                    <p className="text-sm">Full tuition for one academic year</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary-fixed text-sm">check_circle</span>
                    <p className="text-sm">High-speed campus fiber connectivity</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary-fixed text-sm">check_circle</span>
                    <p className="text-sm">24/7 Security & Health monitoring</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary-fixed text-sm">check_circle</span>
                    <p className="text-sm">Direct portal messaging with student</p>
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-primary-container">
                  <div className="flex justify-between items-center text-primary-fixed font-bold">
                    <span>TOTAL DUE</span>
                    <span className="text-2xl">${bed.pricePerYear || '1,200'}.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-high border border-outline-variant rounded-xl p-6 flex items-start gap-4">
              <div className="bg-status-sponsored/10 p-2 rounded-lg text-status-sponsored">
                <span className="material-symbols-outlined">shield_with_heart</span>
              </div>
              <div>
                <h5 className="font-bold text-on-surface text-sm">OnCampus Guarantee</h5>
                <p className="text-xs text-on-surface-variant leading-relaxed">If your sponsored bed remains empty for >30 days, we automatically reassign your impact to a high-priority waitlisted student.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
