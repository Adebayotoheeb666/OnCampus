"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/beds", label: "Sponsor a Bed" },
  { href: "/apply", label: "Apply" },
  { href: "/resident", label: "Resident" },
  { href: "/impact", label: "Impact" },
  { href: "/sponsor/portal", label: "My Pledges" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
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

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex-shrink-0 p-2 hover:bg-[var(--surface-container-low)] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[var(--primary)]" style={{ fontSize: "24px" }}>
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-64 bg-[var(--surface-container-lowest)] shadow-xl md:hidden overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-[var(--primary)]">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-[var(--surface-container-low)] rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="px-4 py-3 text-[var(--on-surface)] hover:bg-[var(--surface-container-low)] rounded-lg font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/beds"
                onClick={closeMobileMenu}
                className="block w-full bg-[var(--primary)] text-[var(--on-primary)] px-6 py-3 rounded-xl font-bold text-center hover:opacity-90 transition-opacity"
              >
                Fund a Bed
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
