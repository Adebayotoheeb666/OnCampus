import Link from "next/link";
import { logoutAdmin } from "@/modules/auth/actions";

const adminLinks = [
  { href: "/admin/sponsors", label: "Sponsors" },
  { href: "/admin/beds", label: "Beds" },
  { href: "/admin/allocation", label: "Allocation" },
  { href: "/admin/allocation/audit", label: "Audit" },
  { href: "/admin/tenants/checkout", label: "Checkouts" },
  { href: "/admin/invoices", label: "Invoices" },
  { href: "/admin/finance", label: "Finance" },
  { href: "/admin/maintenance", label: "Maintenance" },
  { href: "/admin/security", label: "Security" },
  { href: "/admin/facilities", label: "Facilities" },
];

export function AdminNav({ active }: { active?: string }) {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
      {adminLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            active === link.href
              ? "bg-emerald-700 text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          {link.label}
        </Link>
      ))}
      <form action={logoutAdmin} className="ml-auto">
        <button type="submit" className="text-sm text-stone-500 hover:text-stone-800">
          Sign out
        </button>
      </form>
    </nav>
  );
}
