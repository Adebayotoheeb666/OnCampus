'use client';

export default function AllocationAuditPage() {
  return (
    <div className="bg-surface-bright text-on-surface font-body-md min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant">
        <div className="flex justify-between items-center px-gutter-desktop py-base w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-primary"></div>
            </div>
            <h1 className="text-headline-md font-headline-md font-extrabold text-primary">OnCampus</h1>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a className="text-on-surface-variant hover:bg-surface-container-low transition-colors px-3 py-2 rounded-lg font-data-table" href="#">
              Dashboard
            </a>
            <a className="text-primary font-bold px-3 py-2 rounded-lg font-data-table" href="#">
              Allocation Audit
            </a>
            <a className="text-on-surface-variant hover:bg-surface-container-low transition-colors px-3 py-2 rounded-lg font-data-table" href="#">
              Student Profiles
            </a>
            <a className="text-on-surface-variant hover:bg-surface-container-low transition-colors px-3 py-2 rounded-lg font-data-table" href="#">
              Facility Map
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary cursor-pointer active:opacity-80 p-2 hover:bg-surface-container-low rounded-full">
              contactless
            </span>
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container text-sm">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter-desktop py-margin-safe space-y-8">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-label-caps font-label-caps text-secondary uppercase tracking-widest">
              Administrative Transparency
            </span>
            <h2 className="text-headline-lg font-headline-lg text-primary">Allocation Audit Log</h2>
            <p className="text-body-md text-on-surface-variant max-w-2xl">
              Maintain institutional accountability with a complete, transparent record of all bed assignments.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-full hover:shadow-lg transition-all active:scale-95">
            <span className="material-symbols-outlined text-xl">download</span>
            <span>Download CSV Report</span>
          </button>
        </section>

        {/* Filters & Search Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 lg:col-span-8 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant flex items-center gap-4">
            <span className="material-symbols-outlined text-outline">search</span>
            <input
              className="w-full bg-transparent border-none focus:ring-0 text-body-md placeholder:text-outline-variant"
              placeholder="Search by student name, ID, or staff member..."
              type="text"
            />
          </div>
          <div className="md:col-span-3 lg:col-span-2 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant flex flex-col justify-center">
            <label className="text-label-caps text-outline-variant mb-1">Status Type</label>
            <select className="bg-transparent border-none p-0 text-data-table font-semibold focus:ring-0">
              <option>All Actions</option>
              <option>Bed Allocated</option>
              <option>Score Updated</option>
            </select>
          </div>
          <div className="md:col-span-3 lg:col-span-2 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant flex flex-col justify-center">
            <label className="text-label-caps text-outline-variant mb-1">Date Range</label>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-data-table font-semibold">Last 30 Days</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
          </div>
        </section>

        {/* Audit Table Component */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-caps text-label-caps uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps uppercase tracking-wider">Action</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps uppercase tracking-wider">Asset ID</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps uppercase tracking-wider">Performed By</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-5 text-data-table font-medium whitespace-nowrap">Oct 24, 2023 · 14:32</td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-status-available bg-opacity-10 text-status-available text-[10px] font-bold rounded uppercase">
                      Bed Allocated
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary">Marcus Thorne</span>
                      <span className="text-xs text-outline italic">#MT-2023-891</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-label-caps text-label-caps">B-104-A</td>
                  <td className="px-6 py-5 text-data-table">Dr. Sarah Jenkins</td>
                  <td className="px-6 py-5 text-body-md text-on-surface-variant max-w-xs truncate">Auto-match algorithm triggered.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-outline-variant bg-surface">
            <span className="text-data-table text-on-surface-variant">Showing 1 to 5 of 1,248 entries</span>
            <div className="flex gap-2">
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Summary Insight Bento */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-primary text-on-primary rounded-xl space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="text-label-caps font-label-caps opacity-80 uppercase">Allocation Velocity</h4>
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div className="text-headline-md">+14%</div>
            <p className="text-xs opacity-70">Increase in audit entries this week.</p>
          </div>

          <div className="p-6 bg-surface-container-highest rounded-xl space-y-4 border border-outline-variant">
            <div className="flex justify-between items-start">
              <h4 className="text-label-caps font-label-caps text-outline uppercase">Integrity Status</h4>
              <span className="material-symbols-outlined text-status-available">verified</span>
            </div>
            <div className="text-headline-md font-bold text-primary">100% Valid</div>
            <p className="text-xs text-on-surface-variant">All records match the transparency log.</p>
          </div>

          <div className="p-6 bg-surface-container-lowest rounded-xl space-y-4 border border-outline-variant">
            <div className="flex justify-between items-start">
              <h4 className="text-label-caps font-label-caps text-outline uppercase">Active Admins</h4>
              <span className="material-symbols-outlined text-secondary">groups</span>
            </div>
            <div className="text-headline-md font-bold text-primary">12 Staff</div>
            <p className="text-xs text-on-surface-variant">Unique staff members today.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-margin-safe bg-surface-container-lowest border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter-desktop gap-base max-w-container-max mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-headline-md text-headline-md text-primary">OnCampus</div>
            <p className="text-body-md text-on-surface-variant">© 2024 OnCampus. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a className="text-on-surface-variant hover:text-secondary font-body-md transition-opacity" href="#">
              Transparency Policy
            </a>
            <a className="text-on-surface-variant hover:text-secondary font-body-md transition-opacity" href="#">
              Terms
            </a>
            <a className="text-on-surface-variant hover:text-secondary font-body-md transition-opacity" href="#">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
