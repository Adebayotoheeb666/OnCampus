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
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
