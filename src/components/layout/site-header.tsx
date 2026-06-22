import Link from "next/link";
const navLinks = [
  { href: "/beds", label: "Sponsor a Bed" },
  { href: "/apply", label: "Apply" },
  { href: "/resident", label: "Resident" },
  { href: "/impact", label: "Impact" },
  { href: "/sponsor/portal", label: "My Pledges" },
  { href: "/admin/allocation", label: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-sm font-bold text-white">
            OC
          </span>
          <div>
            <p className="text-sm font-bold text-stone-900">OnCampus</p>
            <p className="text-xs text-stone-500">Sponsor a Bed · FUTA</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-600 hover:text-emerald-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/beds"
          className="hidden rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 md:inline-flex"
        >
          Fund a Bed
        </Link>
      </div>
    </header>
  );
}
