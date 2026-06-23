'use client';

export function WalletPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-[var(--surface)] flex justify-between items-center px-4 md:px-6 py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] flex items-center justify-center overflow-hidden">
            <img className="w-full h-full object-cover" alt="OnCampus logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext x='12' y='16' font-size='20' fill='%2300322d' text-anchor='middle' font-weight='bold'%3EO%3C/text%3E%3C/svg%3E" />
          </div>
          <span className="text-xl font-extrabold text-[var(--primary)]">OnCampus</span>
        </div>
        <button className="hover:bg-[var(--surface-container-low)] transition-colors p-2 rounded-full">
          <span className="material-symbols-outlined text-[var(--primary)]">contactless</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6 mb-24">
        {/* Bento Grid for Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary Balance */}
          <div className="md:col-span-2 relative overflow-hidden rounded-lg bg-[var(--primary)] text-[var(--on-primary)] p-8 flex flex-col justify-between min-h-[220px] shadow-sm">
            <div className="relative z-10 flex flex-col space-y-2">
              <p className="text-xs font-mono uppercase opacity-80">Available Balance</p>
              <h1 className="text-5xl font-extrabold">$1,245.50</h1>
            </div>
            <div className="relative z-10 flex flex-wrap gap-4 mt-6">
              <button className="bg-[var(--primary-fixed)] text-[var(--on-primary-fixed)] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all">
                <span className="material-symbols-outlined">add_circle</span>
                Top Up
              </button>
              <button className="border border-[var(--primary-fixed)] text-[var(--primary-fixed)] px-6 py-3 rounded-full font-bold hover:bg-[var(--primary-container)] transition-all">
                Manage Payment Methods
              </button>
            </div>
          </div>

          {/* Quick Action Tile */}
          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-lg p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[var(--secondary-fixed)] text-[var(--on-secondary-fixed)] rounded-lg">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <span className="bg-[rgba(5,150,105,0.1)] text-[var(--status-available)] px-2 py-1 rounded text-xs font-bold uppercase">Linked</span>
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-lg text-[var(--primary)]">Student Bank</h3>
              <p className="text-sm text-[var(--on-surface-variant)]">Checking •••• 4829</p>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--outline-variant)]">
              <p className="text-xs font-mono text-[var(--on-surface-variant)] uppercase mb-2">Monthly Spending Limit</p>
              <div className="w-full bg-[var(--surface-container-high)] h-2 rounded-full overflow-hidden">
                <div className="bg-[var(--impact-gold)] h-full w-2/3"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs font-mono text-[var(--on-surface-variant)]">
                <span>$800 / $1200</span>
              </div>
            </div>
          </div>
        </section>

        {/* Transaction History */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl text-[var(--primary)]">Transaction History</h2>
            <div className="flex gap-2">
              <button className="p-2 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] rounded-full transition-all">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] rounded-full transition-all">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
                    <th className="px-6 py-4 text-xs font-mono text-[var(--on-surface-variant)] uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-mono text-[var(--on-surface-variant)] uppercase">Description</th>
                    <th className="px-6 py-4 text-xs font-mono text-[var(--on-surface-variant)] uppercase">Category</th>
                    <th className="px-6 py-4 text-xs font-mono text-[var(--on-surface-variant)] uppercase text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--outline-variant)]">
                  {[
                    { date: 'Oct 24, 2024', desc: 'Laundromat - Machine #4', location: 'Residential Wing B', cat: 'Laundromat', icon: 'local_laundry_service', amount: '-$4.50', type: 'debit', iconBg: 'status-sponsored' },
                    { date: 'Oct 22, 2024', desc: 'Wallet Top Up', location: 'Via Student Bank •••• 4829', cat: 'Top-up', icon: 'add', amount: '+$500.00', type: 'credit', iconBg: 'status-available' },
                    { date: 'Oct 20, 2024', desc: 'AC Unit Replacement Charge', location: 'Incident #4920 - Deductible', cat: 'Maintenance', icon: 'build', amount: '-$120.00', type: 'debit', iconBg: 'status-maintenance' },
                    { date: 'Oct 18, 2024', desc: 'Meal Plan Refund', location: 'System Reversal - Overcharge', cat: 'Refund', icon: 'replay', amount: '+$15.75', type: 'credit', iconBg: 'secondary' },
                  ].map((tx, idx) => (
                    <tr key={idx} className="hover:bg-[var(--surface-container-low)] transition-colors cursor-pointer">
                      <td className="px-6 py-4 text-sm text-[var(--on-surface)]">{tx.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded ${
                            tx.iconBg === 'status-sponsored' ? 'bg-[rgb(37,99,235,0.1)] text-[var(--status-sponsored)]' :
                            tx.iconBg === 'status-available' ? 'bg-[rgb(5,150,105,0.1)] text-[var(--status-available)]' :
                            tx.iconBg === 'status-maintenance' ? 'bg-[rgb(217,119,6,0.1)] text-[var(--status-maintenance)]' :
                            'bg-[rgba(25,97,161,0.1)] text-[var(--secondary)]'
                          } flex items-center justify-center`}>
                            <span className="material-symbols-outlined text-sm">{tx.icon}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[var(--on-surface)]">{tx.desc}</p>
                            <p className="text-xs font-mono text-[var(--on-surface-variant)]">{tx.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-[var(--surface-container-high)] px-2 py-1 rounded text-xs font-mono text-[var(--on-surface-variant)]">{tx.cat}</span>
                      </td>
                      <td className={`px-6 py-4 font-mono text-right text-sm ${tx.type === 'debit' ? 'text-[var(--error-critical)]' : 'text-[var(--status-available)]'}`}>{tx.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-[var(--outline-variant)] flex justify-center">
              <button className="text-xs font-mono text-[var(--primary)] hover:underline uppercase">View Full Statement</button>
            </div>
          </div>
        </section>

        {/* Spending Insight */}
        <section className="bg-[var(--secondary-container)] text-[var(--on-secondary-container)] rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="p-4 bg-[rgba(0,0,0,0.1)] rounded-full">
            <span className="material-symbols-outlined text-5xl">insights</span>
          </div>
          <div className="flex-grow space-y-1">
            <h3 className="font-bold text-2xl">Smart Spending Insight</h3>
            <p className="text-sm">Your laundry spending is 15% lower this month compared to September. You&apos;re successfully managing your student allowance!</p>
          </div>
          <button className="whitespace-nowrap px-6 py-3 bg-[var(--on-secondary-container)] text-[var(--secondary-container)] rounded-full font-bold hover:opacity-90 transition-all">
            See Analytics
          </button>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-[var(--surface)] border-t border-[var(--outline-variant)] flex justify-around items-center px-4 pb-safe pt-2">
        <button className="flex flex-col items-center justify-center text-[var(--on-surface-variant)] p-2 text-xs gap-1">
          <span className="material-symbols-outlined">home</span>
          Home
        </button>
        <button className="flex flex-col items-center justify-center text-[var(--on-surface-variant)] p-2 text-xs gap-1">
          <span className="material-symbols-outlined">local_laundry_service</span>
          Laundry
        </button>
        <button className="flex flex-col items-center justify-center text-[var(--on-surface-variant)] p-2 text-xs gap-1">
          <span className="material-symbols-outlined">build</span>
          Maintenance
        </button>
        <button className="flex flex-col items-center justify-center bg-[var(--secondary-container)] text-[var(--on-secondary-container)] rounded-lg p-2 text-xs gap-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
          Wallet
        </button>
      </nav>

      {/* Footer */}
      <footer className="hidden md:block w-full py-8 bg-[var(--surface-container-lowest)] border-t border-[var(--outline-variant)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--on-surface-variant)]">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-[var(--primary)]">OnCampus</span>
            <p>&copy; 2024 OnCampus Sponsorship. All rights reserved.</p>
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
