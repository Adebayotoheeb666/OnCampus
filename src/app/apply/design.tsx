'use client';

import { useState } from 'react';

export function ApplyPage() {
  const [step, setStep] = useState(1);
  const [residencyType, setResidencyType] = useState('');

  const stepLabels = {
    1: 'Step 1: Personal Identity',
    2: 'Step 2: Application Type',
    3: 'Step 3: Final Verification'
  };

  const stepProgress = {
    1: '33.33%',
    2: '66.66%',
    3: '100%'
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--on-background)]">
      {/* TopAppBar */}
      <nav className="w-full top-0 sticky z-50 bg-[var(--surface)] border-b border-[var(--outline-variant)] flex justify-between items-center px-4 md:px-6 py-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] flex items-center justify-center overflow-hidden">
            <span className="material-symbols-outlined text-[var(--primary)]">school</span>
          </div>
          <span className="text-xl font-extrabold text-[var(--primary)]">OnCampus</span>
        </div>
        <button className="material-symbols-outlined text-[var(--primary)] text-2xl cursor-pointer hover:opacity-80 transition-colors">
          contactless
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 mb-20">
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-2">Student Application</h1>
          <p className="text-lg text-[var(--on-surface-variant)] max-w-2xl">Complete your residency request in three simple steps. We provide both sponsored "Free Bed" and standard "Paid Bed" options.</p>
        </header>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-mono text-[var(--primary)] uppercase">{stepLabels[step as keyof typeof stepLabels]}</span>
            <span className="text-xs font-mono text-[var(--on-surface-variant)]">{step} of 3</span>
          </div>
          <div className="h-2 w-full bg-[var(--surface-container)] rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-600"
              style={{
                width: stepProgress[step as keyof typeof stepProgress],
                background: 'linear-gradient(90deg, #00322d 0%, #B45309 100%)'
              }}
            ></div>
          </div>
        </div>

        {/* Form Canvas */}
        <div className="bg-white bg-opacity-80 backdrop-blur rounded-lg p-6 md:p-10 min-h-[400px] flex flex-col border border-[var(--outline-variant)]">
          <form className="flex-grow">
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="transition-all duration-400">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">Full Legal Name</label>
                    <input className="p-3 border border-[var(--outline-variant)] rounded bg-white text-sm focus:border-[var(--primary)] transition-colors" placeholder="Johnathan Doe" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">JAMB / Matric Number</label>
                    <input className="p-3 border border-[var(--outline-variant)] rounded bg-white text-sm uppercase focus:border-[var(--primary)] transition-colors" placeholder="2024/U/12345" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">Gender</label>
                    <select className="p-3 border border-[var(--outline-variant)] rounded bg-white text-sm focus:border-[var(--primary)] transition-colors">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">Primary Institution</label>
                    <select className="p-3 border border-[var(--outline-variant)] rounded bg-white text-sm focus:border-[var(--primary)] transition-colors">
                      <option value="">Select Campus</option>
                      <option value="main">Main Campus (Central)</option>
                      <option value="north">North Campus</option>
                      <option value="east">East Tech Hub</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Application Type */}
            {step === 2 && (
              <div className="transition-all duration-400">
                <h3 className="font-bold text-2xl text-[var(--primary)] mb-6">Choose Residency Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Free Bed Card */}
                  <button
                    onClick={() => setResidencyType('free')}
                    className={`border-2 rounded-lg p-6 text-left hover:border-[var(--primary)] transition-all relative overflow-hidden group ${
                      residencyType === 'free'
                        ? 'border-[var(--primary)] bg-[var(--surface-container-low)]'
                        : 'border-[var(--outline-variant)]'
                    }`}
                    type="button"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-4xl text-[var(--primary)]">volunteer_activism</span>
                      <span className="bg-[rgb(37,99,235,0.1)] text-[var(--status-sponsored)] px-3 py-1 rounded-full text-xs font-mono uppercase">Highly Competitive</span>
                    </div>
                    <h4 className="font-bold text-lg text-[var(--primary)] mb-2">Free Sponsored Bed</h4>
                    <p className="text-sm text-[var(--on-surface-variant)]">Fully funded residency for students with high financial need. Requires impact reporting and verification.</p>
                    {residencyType === 'free' && (
                      <span className="absolute bottom-4 right-4 material-symbols-outlined text-[var(--primary)]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                  </button>

                  {/* Paid Bed Card */}
                  <button
                    onClick={() => setResidencyType('paid')}
                    className={`border-2 rounded-lg p-6 text-left hover:border-[var(--secondary)] transition-all relative overflow-hidden group ${
                      residencyType === 'paid'
                        ? 'border-[var(--secondary)] bg-[var(--surface-container-low)]'
                        : 'border-[var(--outline-variant)]'
                    }`}
                    type="button"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-4xl text-[var(--secondary)]">payments</span>
                      <span className="bg-[rgba(25,97,161,0.1)] text-[var(--secondary)] px-3 py-1 rounded-full text-xs font-mono uppercase">Instant Approval</span>
                    </div>
                    <h4 className="font-bold text-lg text-[var(--secondary)] mb-2">Paid Premium Bed</h4>
                    <p className="text-sm text-[var(--on-surface-variant)]">Standard paid residency with premium amenities. Guaranteed placement upon payment confirmation.</p>
                    {residencyType === 'paid' && (
                      <span className="absolute bottom-4 right-4 material-symbols-outlined text-[var(--secondary)]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Final Verification */}
            {step === 3 && (
              <div className="transition-all duration-400 text-center py-10">
                {residencyType === 'free' && (
                  <>
                    <h3 className="font-bold text-2xl text-[var(--primary)] mb-2">Sponsorship Assessment</h3>
                    <p className="text-[var(--on-surface-variant)] mb-8">Help us understand your eligibility for the Free Bed program.</p>
                    <div className="space-y-6 text-left">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">Estimated Household Annual Income</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]">$</span>
                          <input className="w-full p-3 pl-8 border border-[var(--outline-variant)] rounded bg-white text-sm" placeholder="0.00" type="number" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">Distance from Campus (km)</label>
                        <input className="w-full h-2 bg-[var(--surface-container)] rounded-lg accent-[var(--primary)]" type="range" min="0" max="500" defaultValue="10" />
                        <div className="flex justify-between text-xs font-mono text-[var(--on-surface-variant)]">
                          <span>Local {'< 5km'}</span>
                          <span className="text-[var(--primary)] font-bold">10 km</span>
                          <span>Distant {'> 450km'}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">Why do you need OnCampus sponsorship?</label>
                        <textarea className="p-3 border border-[var(--outline-variant)] rounded bg-white text-sm" placeholder="Briefly describe your situation..." rows={4}></textarea>
                      </div>
                    </div>
                  </>
                )}

                {residencyType === 'paid' && (
                  <>
                    <div className="w-20 h-20 bg-[rgba(25,97,161,0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-5xl text-[var(--secondary)]">receipt_long</span>
                    </div>
                    <h3 className="font-bold text-2xl text-[var(--primary)] mb-2">Ready to Secure Your Bed</h3>
                    <p className="text-[var(--on-surface-variant)] max-w-md mx-auto">You&apos;ve selected the Paid Bed option. Finalizing this application will direct you to the payment gateway to reserve your space.</p>
                  </>
                )}
              </div>
            )}
          </form>

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between items-center border-t border-[var(--outline-variant)] pt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
              className="flex items-center gap-2 text-[var(--secondary)] font-bold hover:underline transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>

            <button
              onClick={() => setStep(Math.min(3, step + 1))}
              className="bg-[var(--primary)] text-white px-8 py-3 rounded font-bold hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{step === 3 ? 'Submit Application' : 'Continue'}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-[var(--surface-container-lowest)] border-t border-[var(--outline-variant)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--on-surface-variant)]">
          <span className="font-bold text-[var(--primary)]">OnCampus</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Impact Report</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Transparency Policy</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Support</a>
          </div>
          <p>&copy; 2024 OnCampus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
