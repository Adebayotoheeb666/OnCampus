import { AdminNav } from "@/components/layout/admin-nav";
import Link from "next/link";

export default function AdminDashboardPage() {
  const dashboards = [
    {
      title: "Financial Overview",
      description: "Q3 FY24 financial reports and analytics",
      icon: "trending_up",
      href: "/admin/finance",
      color: "from-emerald-600 to-emerald-700",
    },
    {
      title: "Beds Management",
      description: "Manage bed inventory and occupancy",
      icon: "bed",
      href: "/admin/beds",
      color: "from-blue-600 to-blue-700",
    },
    {
      title: "Facilities",
      description: "Infrastructure and asset registry",
      icon: "home_work",
      href: "/admin/facilities",
      color: "from-orange-600 to-orange-700",
    },
    {
      title: "Maintenance",
      description: "Maintenance oversight and task management",
      icon: "build",
      href: "/admin/maintenance",
      color: "from-amber-600 to-amber-700",
    },
    {
      title: "Security & Access",
      description: "Gate activity and visitor management",
      icon: "security",
      href: "/admin/security",
      color: "from-red-600 to-red-700",
    },
    {
      title: "Sponsors",
      description: "Sponsor pipeline and relationship management",
      icon: "volunteer_activism",
      href: "/admin/sponsors",
      color: "from-indigo-600 to-indigo-700",
    },
    {
      title: "Invoices",
      description: "Invoice and payment tracking",
      icon: "receipt_long",
      href: "/admin/invoices",
      color: "from-purple-600 to-purple-700",
    },
    {
      title: "Tenant Checkout",
      description: "Process tenant move-outs and room turnovers",
      icon: "how_to_reg",
      href: "/admin/tenants/checkout",
      color: "from-pink-600 to-pink-700",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin" />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-stone-900">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-stone-600">
            Welcome back. Manage all aspects of the OnCampus housing platform.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dashboards.map((dashboard) => (
            <Link
              key={dashboard.href}
              href={dashboard.href}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${dashboard.color} opacity-0 transition-opacity group-hover:opacity-5`}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="inline-block rounded-lg bg-stone-100 p-3 text-2xl group-hover:bg-stone-200 transition-colors">
                  <span className="material-symbols-outlined">{dashboard.icon}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-stone-900">
                  {dashboard.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600">
                  {dashboard.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="absolute right-4 bottom-4 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
            <p className="text-sm font-semibold text-stone-600 uppercase tracking-wide">
              Total Beds
            </p>
            <p className="mt-2 text-3xl font-bold text-stone-900">1,240</p>
            <p className="mt-2 text-xs text-stone-500">Across all blocks</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
            <p className="text-sm font-semibold text-stone-600 uppercase tracking-wide">
              Occupancy
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">95.4%</p>
            <p className="mt-2 text-xs text-stone-500">1,184 beds occupied</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
            <p className="text-sm font-semibold text-stone-600 uppercase tracking-wide">
              Active Sponsors
            </p>
            <p className="mt-2 text-3xl font-bold text-blue-600">89</p>
            <p className="mt-2 text-xs text-stone-500">Supporting students</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-200">
            <p className="text-sm font-semibold text-stone-600 uppercase tracking-wide">
              Maintenance Issues
            </p>
            <p className="mt-2 text-3xl font-bold text-orange-600">12</p>
            <p className="mt-2 text-xs text-stone-500">Active requests</p>
          </div>
        </div>
      </div>
    </div>
  );
}
