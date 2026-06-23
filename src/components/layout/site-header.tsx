"use client";

import Link from "next/link";
const navLinks = [
  { href: "#inventory", label: "Browse Beds" },
  { href: "#impact", label: "Impact" },
  { href: "#how-it-works", label: "How it Works" },
];

export function SiteHeader() {
  return (
    <header className="w-full top-0 sticky z-50 border-b border-[var(--outline-variant)]/30 bg-[var(--background)]/85 backdrop-blur" style={{ backdropFilter: "blur(8px)" }}>
      <div className="flex justify-between items-center px-4 md:px-8 py-2 w-full max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--on-primary)] font-bold">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <span className="text-xl font-bold text-[var(--primary)]" style={{ fontFamily: "Manrope" }}>OnCampus</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] px-3 py-1 rounded transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#inventory"
            className="hidden md:inline-flex bg-[var(--primary)] text-[var(--on-primary)] px-5 py-2 rounded-xl font-bold shadow-sm hover:opacity-90 transition-opacity text-sm"
          >
            Sponsor Now
          </Link>
        </div>

        <div className="md:hidden">
          <span className="material-symbols-outlined text-[var(--primary)]" style={{ fontSize: "24px" }}>menu</span>
        </div>
      </div>
    </header>
  );
}
