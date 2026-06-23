'use client';

export function LaundryPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--on-surface)]">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-[var(--surface)] transition-colors border-b border-[var(--outline-variant)]">
        <div className="flex justify-between items-center px-4 md:px-6 py-2 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] flex items-center justify-center text-[var(--primary-fixed)]">
              <span className="material-symbols-outlined">school</span>
            </div>
            <span className="text-xl font-extrabold text-[var(--primary)]">OnCampus</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-[var(--primary)] p-2 hover:bg-[var(--surface-container-low)] transition-colors rounded-full">
              contactless
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-2">Laundry Services</h1>
          <p className="text-[var(--on-surface-variant)]">Schedule your washing cycle and monitor machine status in real-time.</p>
        </div>

        {/* Real-time Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Machine 1 */}
          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] p-5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[rgb(5,150,105,0.1)] flex items-center justify-center text-[var(--status-available)]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_laundry_service</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--primary)]">Machine 1</h3>
                <p className="text-xs text-[var(--on-surface-variant)] font-mono uppercase">WASHER • 8KG</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[rgb(5,150,105,0.1)] text-[var(--status-available)] text-xs font-bold rounded-full">AVAILABLE</span>
          </div>

          {/* Machine 2 */}
          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] p-5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[rgb(37,99,235,0.1)] flex items-center justify-center text-[var(--status-sponsored)]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_laundry_service</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--primary)]">Machine 2</h3>
                <p className="text-xs text-[var(--on-surface-variant)] font-mono uppercase">WASHER • 8KG</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[rgb(37,99,235,0.1)] text-[var(--status-sponsored)] text-xs font-bold rounded-full">IN USE</span>
          </div>

          {/* Machine 3 */}
          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] p-5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[rgb(217,119,6,0.1)] flex items-center justify-center text-[var(--status-maintenance)]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>build</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--primary)]">Machine 3</h3>
                <p className="text-xs text-[var(--on-surface-variant)] font-mono uppercase">DRYER • 10KG</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[rgb(217,119,6,0.1)] text-[var(--status-maintenance)] text-xs font-bold rounded-full">MAINTENANCE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Booking Grid */}
          <div className="lg:col-span-8 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-lg overflow-hidden">
            <div className="p-6 border-b border-[var(--outline-variant)] flex justify-between items-center bg-[rgba(243,243,246,0.3)]">
              <h2 className="font-bold text-2xl text-[var(--primary)]">Schedule for Today</h2>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-[var(--surface-container-high)] rounded-full transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="text-xs font-mono text-[var(--primary)] uppercase">OCT 24, 2024</span>
                <button className="p-1 hover:bg-[var(--surface-container-high)] rounded-full transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[600px] p-6">
                {/* Grid Header */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">TIME SLOT</div>
                  <div className="text-xs font-mono text-[var(--on-surface-variant)] uppercase text-center">MACHINE 1</div>
                  <div className="text-xs font-mono text-[var(--on-surface-variant)] uppercase text-center">MACHINE 2</div>
                  <div className="text-xs font-mono text-[var(--on-surface-variant)] uppercase text-center">MACHINE 3</div>
                </div>

                {/* Time Slots */}
                <div className="space-y-3">
                  {[
                    { time: '08:00 - 09:30', machines: ['Select', 'OCCUPIED', 'OUT OF ORDER'] },
                    { time: '09:30 - 11:00', machines: ['Booked', 'Select', 'OUT OF ORDER'] },
                    { time: '11:00 - 12:30', machines: ['Select', 'Select', 'OUT OF ORDER'] },
                    { time: '12:30 - 14:00', machines: ['Select', 'OCCUPIED', 'OUT OF ORDER'] },
                    { time: '14:00 - 15:30', machines: ['Select', 'Select', 'OUT OF ORDER'] },
                  ].map((slot, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-4 items-center">
                      <div className="text-xs font-mono text-[var(--on-surface-variant)]">{slot.time}</div>
                      {slot.machines.map((status, i) => (
                        <div key={i}>
                          {status === 'Select' && (
                            <button className="w-full h-12 rounded-lg bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] text-sm border border-dashed border-[var(--outline)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
                              Select
                            </button>
                          )}
                          {status === 'Booked' && (
                            <button className="w-full h-12 rounded-lg bg-[var(--primary-container)] text-[var(--on-primary-container)] text-sm border border-[var(--primary)]">
                              Booked
                            </button>
                          )}
                          {status === 'OCCUPIED' && (
                            <div className="w-full h-12 rounded-lg bg-[rgba(71,85,105,0.1)] flex items-center justify-center text-[var(--status-occupied)] text-xs font-bold cursor-not-allowed">
                              OCCUPIED
                            </div>
                          )}
                          {status === 'OUT OF ORDER' && (
                            <div className="w-full h-12 rounded-lg bg-[rgba(217,119,6,0.05)] flex items-center justify-center text-[rgba(217,119,6,0.4)] text-xs font-bold cursor-not-allowed">
                              OUT OF ORDER
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* My Bookings Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Booking Card */}
            <div className="bg-[var(--primary)] text-[var(--on-primary)] p-6 rounded-lg relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <p className="text-xs font-mono uppercase opacity-80 mb-2">QUICK BOOKING</p>
                <h3 className="text-2xl font-bold mb-4">Express Wash Available</h3>
                <p className="text-sm opacity-90 mb-6">Need a quick cycle? Machine 1 is available right now for an express wash.</p>
                <button className="w-full bg-[var(--primary-fixed)] text-[var(--on-primary-fixed)] font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Book Now
                </button>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[rgba(0,75,68,0.2)] rounded-full blur-3xl"></div>
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-lg p-6">
              <h2 className="font-bold text-lg text-[var(--primary)] mb-6">My Upcoming Bookings</h2>
              <div className="space-y-4">
                <div className="flex flex-col p-4 bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[var(--primary)]">local_laundry_service</span>
                      <div>
                        <p className="font-bold text-sm text-[var(--primary)]">Machine 1</p>
                        <p className="text-xs font-mono text-[var(--on-surface-variant)]">TODAY, 09:30 AM</p>
                      </div>
                    </div>
                    <button className="text-[var(--error)] text-xs font-mono hover:underline">CANCEL</button>
                  </div>
                </div>

                <div className="flex flex-col p-4 bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-lg opacity-70">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[var(--primary)]">local_laundry_service</span>
                      <div>
                        <p className="font-bold text-sm text-[var(--primary)]">Machine 2</p>
                        <p className="text-xs font-mono text-[var(--on-surface-variant)]">TOMORROW, 14:00 PM</p>
                      </div>
                    </div>
                    <button className="text-[var(--error)] text-xs font-mono hover:underline">CANCEL</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-[rgba(226,226,229,0.3)] p-6 rounded-lg border border-[var(--outline-variant)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[var(--impact-gold)]">lightbulb</span>
                <h4 className="font-bold text-sm text-[var(--primary)]">Resident Reminder</h4>
              </div>
              <p className="text-sm text-[var(--on-surface-variant)]">
                Please remove your laundry within 15 minutes of completion to ensure others can use the machines. Thank you for your cooperation!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-[var(--surface)] border-t border-[var(--outline-variant)]">
        <div className="flex justify-around items-center px-4 pb-safe pt-2">
          <button className="flex flex-col items-center justify-center text-[var(--on-surface-variant)] p-2">
            <span className="material-symbols-outlined">home</span>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-[var(--secondary-container)] text-[var(--on-secondary-container)] rounded-lg p-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_laundry_service</span>
            <span className="text-xs mt-1">Laundry</span>
          </button>
          <button className="flex flex-col items-center justify-center text-[var(--on-surface-variant)] p-2">
            <span className="material-symbols-outlined">build</span>
            <span className="text-xs mt-1">Maintenance</span>
          </button>
          <button className="flex flex-col items-center justify-center text-[var(--on-surface-variant)] p-2">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="text-xs mt-1">Wallet</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
