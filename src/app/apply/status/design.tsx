'use client';

import { useState } from 'react';

export function ApplicationStatusPage() {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--on-surface)]">
      {/* TopAppBar */}
      <header className="bg-[var(--surface)] w-full top-0 sticky z-40 border-b border-[var(--outline-variant)]">
        <div className="flex justify-between items-center px-4 md:px-6 py-2 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover" alt="OnCampus logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext x='12' y='16' font-size='20' fill='%2300322d' text-anchor='middle' font-weight='bold'%3EO%3C/text%3E%3C/svg%3E" />
            </div>
            <span className="text-xl font-extrabold text-[var(--primary)]">OnCampus</span>
          </div>
          <button className="material-symbols-outlined text-[var(--primary)] cursor-pointer hover:opacity-80 transition-colors p-2 rounded-full">
            contactless
          </button>
        </div>
      </header>

      <main className="min-h-screen max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32">
        {/* Search Section */}
        <section className="mb-12 max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-4">Application Tracking</h1>
          <p className="text-[var(--on-surface-variant)] mb-8">Enter your unique reference number to check the status of your university residency application.</p>
          <div className="relative group">
            <div className="flex items-center bg-white border border-[var(--outline-variant)] rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[var(--primary)] transition-all p-1">
              <input className="flex-1 border-none focus:outline-none px-4 py-3 text-xs font-mono uppercase" placeholder="REF-2024-XXXX" type="text" />
              <button
                onClick={() => setShowResults(true)}
                className="bg-[var(--primary)] text-white px-6 py-3 rounded font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">search</span>
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Results Area */}
        {showResults && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Timeline Section */}
            <div className="lg:col-span-5 bg-white border border-[var(--outline-variant)] rounded-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-bold text-2xl text-[var(--primary)]">Status Flow</h2>
                <span className="px-3 py-1 rounded-full bg-[rgba(25,97,161,0.2)] text-[var(--on-secondary-container)] text-xs font-mono uppercase border border-[rgba(25,97,161,0.3)]">Application #REF-2024-8812</span>
              </div>

              <div className="space-y-0 relative">
                {/* Timeline items */}
                {[
                  { label: 'Submitted', date: 'March 12, 2024 • 09:42 AM', desc: 'Initial documents received and validated.', active: true, current: false },
                  { label: 'Under Review', date: 'March 15, 2024 • 02:15 PM', desc: 'Background check and eligibility verification in progress.', active: true, current: false },
                  { label: 'Allocated', date: 'March 18, 2024 • 11:30 AM', desc: 'Placement Secured: Oak Hall Residence', active: false, current: true },
                  { label: 'Ready for Move-In', date: 'Pending induction briefing', desc: '', active: false, current: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 pb-10 relative">
                    {idx < 2 && <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-[var(--primary)]"></div>}
                    {idx === 2 && <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-[var(--outline-variant)]"></div>}

                    <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm ${
                      item.current
                        ? 'bg-[var(--status-available)] shadow-[0_0_0_6px_rgba(5,150,105,0.15)] animate-pulse'
                        : item.active
                        ? 'bg-[var(--primary)] shadow-[0_0_0_4px_rgba(0,50,45,0.1)]'
                        : 'bg-[var(--surface-container)] border-2 border-[var(--outline-variant)]'
                    }`}>
                      <span className="material-symbols-outlined text-sm">
                        {item.current ? 'apartment' : item.active ? 'check' : 'key'}
                      </span>
                    </div>

                    <div>
                      <p className={`font-bold ${item.current ? 'text-[var(--status-available)]' : 'text-[var(--on-surface)]'}`}>
                        {item.label}
                      </p>
                      <p className="text-[var(--on-surface-variant)] text-sm">{item.date}</p>
                      {item.desc && (
                        <p className={`mt-2 text-sm ${item.current ? 'font-semibold text-[var(--primary)]' : 'text-[var(--on-surface-variant)]'}`}>
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Info Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Room Assignment Card */}
              <div className="bg-white border border-[var(--outline-variant)] rounded-lg overflow-hidden shadow-sm">
                <div className="bg-[var(--primary)] p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-mono opacity-80 mb-1">OFFICIAL ASSIGNMENT</p>
                      <h3 className="text-2xl font-bold">Unit 402-B, Oak Hall</h3>
                    </div>
                    <span className="material-symbols-outlined text-5xl opacity-40">meeting_room</span>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">WING</p>
                    <p className="font-bold text-[var(--primary)]">North Tower</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">FLOOR</p>
                    <p className="font-bold text-[var(--primary)]">4th Floor</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">TYPE</p>
                    <p className="font-bold text-[var(--primary)]">Double Studio</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">ROOMIE</p>
                    <p className="font-bold text-[var(--primary)]">TBD</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">SPONSORSHIP</p>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-[rgb(37,99,235,0.1)] text-[var(--status-sponsored)] border border-[rgb(37,99,235,0.2)]">FULLY FUNDED</span>
                  </div>
                </div>
              </div>

              {/* Digital ID Card */}
              <div className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-32 h-32 bg-white p-3 rounded-lg border border-[var(--outline-variant)] shadow-inner shrink-0">
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">QR Code</div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-[var(--primary)] mb-2">Digital Resident ID Active</h4>
                  <p className="text-sm text-[var(--on-surface-variant)] mb-4">Your move-in pass is ready. Please present this QR code at the Oak Hall reception upon arrival on your move-in date.</p>
                  <button className="bg-[var(--secondary)] text-white px-4 py-2 rounded font-bold hover:opacity-90 transition-all flex items-center gap-2 mx-auto md:mx-0">
                    <span className="material-symbols-outlined text-sm">download</span>
                    Save ID Pass
                  </button>
                </div>
              </div>

              {/* Instructions Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: 'calendar_today', color: 'status-available', title: 'Select Move-in Date', desc: 'Choose your arrival slot between Aug 25 - Sept 1.' },
                  { icon: 'description', color: 'status-maintenance', title: 'Sign Agreement', desc: 'Review and e-sign the residency terms of conduct.' },
                  { icon: 'map', color: 'secondary', title: 'Location Info', desc: 'View maps, parking instructions, and hall rules.' },
                  { icon: 'help', color: 'on-surface', title: 'Support Desk', desc: 'Need help? Connect with the student housing team.' },
                ].map((item, idx) => (
                  <button key={idx} className="p-5 bg-white border border-[var(--outline-variant)] rounded-lg hover:shadow-md transition-shadow cursor-pointer group text-left">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors ${
                      item.color === 'status-available' ? 'bg-[rgba(5,150,105,0.1)] text-[var(--status-available)] group-hover:bg-[var(--status-available)] group-hover:text-white' :
                      item.color === 'status-maintenance' ? 'bg-[rgba(217,119,6,0.1)] text-[var(--status-maintenance)] group-hover:bg-[var(--status-maintenance)] group-hover:text-white' :
                      item.color === 'secondary' ? 'bg-[rgba(25,97,161,0.1)] text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white' :
                      'bg-[var(--surface-container-highest)] text-[var(--on-surface-variant)] group-hover:bg-[var(--primary)] group-hover:text-white'
                    }`}>
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <h5 className="font-bold text-[var(--on-surface)] mb-1">{item.title}</h5>
                    <p className="text-xs text-[var(--on-surface-variant)]">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-[var(--surface)] border-t border-[var(--outline-variant)]">
        <div className="flex justify-around items-center px-4 pb-safe pt-2">
          {[
            { icon: 'home', label: 'Home', active: false },
            { icon: 'local_laundry_service', label: 'Laundry', active: false },
            { icon: 'build', label: 'Repair', active: false },
            { icon: 'account_balance_wallet', label: 'Wallet', active: false },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-[var(--on-surface-variant)] p-2 text-xs gap-1">
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <footer className="hidden md:block w-full py-8 bg-[var(--surface-container-lowest)] border-t border-[var(--outline-variant)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--on-surface-variant)]">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[var(--primary)]">OnCampus</span>
            <p>&copy; 2024 OnCampus. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Impact Report</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Transparency Policy</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
