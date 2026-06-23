'use client';

export default function AllocationPage() {
  return (
    <div className="bg-background text-on-background min-h-screen selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky z-40 bg-surface border-b border-outline-variant flex justify-between items-center px-gutter-mobile md:px-gutter-desktop py-base">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined">school</span>
          </div>
          <h1 className="text-headline-md font-headline-md font-extrabold text-primary">OnCampus</h1>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <a className="text-primary font-bold font-body-md transition-colors" href="#">
            Allocations
          </a>
          <a className="text-on-surface-variant font-body-md hover:text-primary transition-colors" href="#">
            Students
          </a>
          <a className="text-on-surface-variant font-body-md hover:text-primary transition-colors" href="#">
            Inventory
          </a>
          <a className="text-on-surface-variant font-body-md hover:text-primary transition-colors" href="#">
            Reports
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-primary">contactless</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden bg-surface-container-lowest"></div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-gutter-mobile md:px-gutter-desktop py-margin-safe">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Bed Allocations</h2>
            <p className="font-body-md text-on-surface-variant mt-1">Manage and assign student housing based on need and priority scores.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 border border-secondary text-secondary font-bold rounded-xl hover:bg-secondary-fixed transition-all active:scale-95">
              <span className="material-symbols-outlined">download</span>
              <span className="font-label-caps">Export List</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 shadow-lg shadow-primary/10 transition-all active:scale-95">
              <span className="material-symbols-outlined">rule_settings</span>
              <span className="font-label-caps uppercase">Run Allocation Engine</span>
            </button>
          </div>
        </section>

        {/* Stats Overview Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-caps">PENDING</span>
              <span className="material-symbols-outlined text-secondary">pending_actions</span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-on-surface">1,284</div>
              <div className="text-sm text-status-maintenance mt-1">+12 today</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-caps">WAITLISTED</span>
              <span className="material-symbols-outlined text-status-maintenance">hourglass_empty</span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-on-surface">432</div>
              <div className="text-sm text-on-surface-variant mt-1">Priority 100L: 89</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-caps">ALLOCATED</span>
              <span className="material-symbols-outlined text-status-available">check_circle</span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-on-surface">2,560</div>
              <div className="text-sm text-status-available mt-1">94% Capacity</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex flex-col h-full">
              <span className="text-on-surface-variant font-label-caps mb-2">ALLOCATION PROGRESS</span>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold">Total Processed</span>
                  <span className="text-sm font-bold">85%</span>
                </div>
                <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-impact-gold w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content: Filters & Table */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
          {/* Filter Bar */}
          <div className="p-4 border-b border-outline-variant flex flex-wrap gap-4 items-center bg-surface-bright">
            <div className="relative flex-1 min-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md"
                placeholder="Search student name, ID or major..."
                type="text"
              />
            </div>
            <select className="px-4 py-2 bg-white border border-outline-variant rounded-lg font-body-md focus:ring-primary focus:border-primary">
              <option>All Application Types</option>
              <option>Sponsored</option>
              <option>Paid</option>
            </select>
            <select className="px-4 py-2 bg-white border border-outline-variant rounded-lg font-body-md focus:ring-primary focus:border-primary">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Waitlisted</option>
              <option>Allocated</option>
            </select>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant">STUDENT DETAILS</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant">LEVEL</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant text-center">NEED SCORE</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant">TYPE</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant">STATUS</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest"></div>
                      <div>
                        <div className="font-body-md font-bold text-on-surface flex items-center gap-2">
                          Kolawole Adedapo
                          <span className="bg-error-container text-on-error-container text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                            Priority
                          </span>
                        </div>
                        <div className="text-xs text-on-surface-variant font-data-table">MAT/CS/2024/0042</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body-md font-bold text-primary">100L</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-label-caps text-error-critical font-bold">98/100</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-label-caps px-2 py-1 bg-status-sponsored/10 text-status-sponsored rounded-full">
                      SPONSORED
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-status-maintenance font-label-caps">
                      <span className="w-2 h-2 rounded-full bg-status-maintenance animate-pulse"></span>
                      WAITLISTED
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold shadow hover:shadow-md transition-all">
                      Allocate
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
