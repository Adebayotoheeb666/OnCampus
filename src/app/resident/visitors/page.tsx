'use client';

export default function VisitorsPage() {
  return (
    <div className="min-h-screen bg-[#f9f9fc] flex flex-col pb-24 md:pb-0">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-white flex justify-between items-center px-4 md:px-6 py-2 border-b border-[#bfc9c6]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#004b44] flex items-center justify-center overflow-hidden">
            <span className="text-white font-bold">OC</span>
          </div>
          <h1 className="text-lg font-bold text-[#00322d]">OnCampus</h1>
        </div>
        <button className="p-2 hover:bg-[#f3f3f6] transition-colors rounded-full text-[#00322d]">
          <span className="material-symbols-outlined">contactless</span>
        </button>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 md:px-6 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-[#004b44] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#7ebab0] mb-4">Secure Visitor Access</h2>
            <p className="text-lg text-[#7ebab0]/80 max-w-xl">Pre-register your guests for a seamless entry experience. Every visit is tracked to maintain our high standards of campus safety.</p>
          </div>
          <div className="z-10">
            <button className="bg-[#00322d] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95 hover:bg-opacity-90">
              <span className="material-symbols-outlined">person_add</span>
              Pre-Register Visitor
            </button>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Upcoming Visitors Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#00322d]">Upcoming Visitors</h3>
              <span className="text-xs font-mono font-bold px-2 py-1 bg-[#81b9ff] text-[#004980] rounded-lg">3 SCHEDULED</span>
            </div>

            <div className="space-y-3">
              {[].length > 0 ? (
                [].map((visitor, idx) => (
                  <div key={idx} className={`p-4 rounded-xl flex items-center justify-between transition-all ${
                    visitor.special
                      ? 'bg-[#f3f3f6] border border-[#bfc9c6]'
                      : 'glass-card bg-white/70 backdrop-blur border border-[#e2e2e5]'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        visitor.special
                          ? 'bg-[#059669] text-white'
                          : 'bg-[#e8e8ea]'
                      }`}>
                        <span className="material-symbols-outlined">{visitor.special ? 'how_to_reg' : 'person'}</span>
                      </div>
                      <div>
                        <p className="font-bold text-[#00322d]">{visitor.name}</p>
                        <p className="text-xs text-[#3f4947] font-mono font-bold">{visitor.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full inline-block ${
                        visitor.special
                          ? 'bg-[#059669]/10 text-[#059669]'
                          : 'bg-[#2563EB]/10 text-[#2563EB]'
                      }`}>
                        {visitor.status}
                      </span>
                      <p className="text-xs text-[#3f4947] mt-1">{visitor.detail}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[#3f4947]">
                  No upcoming visitors scheduled
                </div>
              )}
            </div>
          </div>

          {/* Visitor History Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#00322d]">Recent History</h3>
              <button className="text-[#1961a1] font-bold hover:underline text-sm">View All</button>
            </div>

            <div className="bg-white border border-[#bfc9c6] rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#e8e8ea] border-b border-[#bfc9c6]">
                  <tr>
                    <th className="px-4 py-3 text-xs font-mono font-bold text-[#3f4947]">Visitor</th>
                    <th className="px-4 py-3 text-xs font-mono font-bold text-[#3f4947]">Date</th>
                    <th className="px-4 py-3 text-xs font-mono font-bold text-[#3f4947] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bfc9c6]">
                  {[].length > 0 ? (
                    [].map((visitor, idx) => (
                      <tr key={idx} className="hover:bg-[#f3f3f6] transition-colors">
                        <td className="px-4 py-4 font-bold text-[#00322d]">{visitor.name}</td>
                        <td className="px-4 py-4 text-[#3f4947]">{visitor.date}</td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-xs font-mono font-bold px-2 py-1 bg-[#475569]/10 text-[#475569] rounded">
                            Checked Out
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-[#3f4947]">
                        No visitor history
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Digital ID Promotion */}
            <div className="bg-[#282d2c] text-white p-4 rounded-xl shadow-lg flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">qr_code_2</span>
              </div>
              <div>
                <h4 className="font-bold">Instant Entry Code</h4>
                <p className="text-xs text-[#dee4e2]">Share a one-time secure QR code with your visitors for auto-gate entry.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Section */}
        <section className="bg-white rounded-xl p-6 border border-[#bfc9c6]">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden bg-[#e8e8ea] flex items-center justify-center grayscale">
              <span className="material-symbols-outlined text-6xl text-[#3f4947]">security</span>
            </div>
            <div className="flex-grow">
              <h4 className="text-xl font-bold text-[#00322d] mb-2">Our Commitment to Safety</h4>
              <p className="text-[#3f4947] mb-4">Every visitor is logged in our real-time transparency ledger. This ensures only authorized persons have access to resident floors. All visitor logs are encrypted and stored for 30 days for your protection.</p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1 text-xs font-mono font-bold text-[#059669] bg-[#059669]/5 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-sm">verified_user</span> 24/7 Monitoring
                </span>
                <span className="flex items-center gap-1 text-xs font-mono font-bold text-[#059669] bg-[#059669]/5 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-sm">policy</span> No-Unauthorized Policy
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 bg-white md:hidden shadow-[0_-4px_12px_rgba(0,50,45,0.04)] border-t border-[#bfc9c6]">
        <div className="flex justify-around items-center px-4 pb-safe pt-2">
          {[
            { icon: 'home', label: 'Home' },
            { icon: 'local_laundry_service', label: 'Laundry' },
            { icon: 'person_pin', label: 'Visitors', active: true },
            { icon: 'account_balance_wallet', label: 'Wallet' },
          ].map((item, idx) => (
            <div key={idx} className={`flex flex-col items-center justify-center p-2 scale-95 active:scale-90 cursor-pointer ${
              item.active 
                ? 'bg-[#d2e4ff] text-[#001c37] rounded-xl' 
                : 'text-[#3f4947] hover:text-[#00322d]'
            }`}>
              <span className="material-symbols-outlined" style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
              <span className="text-xs font-mono font-bold mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
