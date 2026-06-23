"use client";

import Link from "next/link";

const navLinks = [
  { href: "/beds", label: "Sponsor a Bed" },
  { href: "/apply", label: "Apply" },
  { href: "/resident", label: "Resident" },
  { href: "/impact", label: "Impact" },
  { href: "/sponsor/portal", label: "My Pledges" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="w-full top-0 sticky z-50 border-b border-[var(--outline-variant)]/30 bg-[var(--background)]/85 backdrop-blur" style={{ backdropFilter: "blur(8px)" }}>
      <div className="flex justify-between items-center px-4 md:px-8 py-3 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--on-primary)] font-bold">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <span className="text-xl font-bold text-[var(--primary)]" style={{ fontFamily: "Manrope" }}>OnCampus</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[var(--on-surface-variant)] hover:text-[var(--primary)] px-4 py-2 rounded-lg hover:bg-[var(--surface-container-low)] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/beds"
          className="hidden md:inline-flex bg-[var(--primary)] text-[var(--on-primary)] px-6 py-2.5 rounded-xl font-bold shadow-sm hover:shadow-md hover:opacity-90 transition-all text-sm"
        >
          Fund a Bed
        </Link>

        <div className="md:hidden flex-shrink-0">
          <span className="material-symbols-outlined text-[var(--primary)]" style={{ fontSize: "24px" }}>menu</span>
        </div>
      </div>
    </header>
  );
}
