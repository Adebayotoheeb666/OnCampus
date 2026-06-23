import "@/app/globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "OnCampus | Change a Life, One Bed at a Time",
  description:
    "Sponsor a bed for a first-year FUTA student through OnCampus. Direct-impact sponsorship that ensures a stable future for the next generation of leaders.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--on-background)] antialiased">
        <SiteHeader />
        <main>{children}</main>
        <footer className="w-full pt-12 pb-6 md:pb-4 bg-[var(--surface-container-lowest)] border-t border-[var(--outline-variant)]">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
              {/* Brand Column */}
              <div className="md:col-span-4 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--on-primary)]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                  </div>
                  <span className="text-lg font-bold text-[var(--primary)]" style={{ fontFamily: "Manrope" }}>OnCampus</span>
                </div>
                <p className="text-[var(--on-surface-variant)] text-sm max-w-sm">
                  Bridging the student housing gap at FUTA through direct, transparent, and high-impact sponsorship. Ensuring every student has a stable place to call home.
                </p>
                <div className="flex gap-4">
                  <a className="w-10 h-10 rounded-full bg-[var(--surface-container-low)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)] transition-all">
                    <span className="material-symbols-outlined text-5xl" style={{ fontSize: "20px" }}>public</span>
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[var(--surface-container-low)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)] transition-all">
                    <span className="material-symbols-outlined text-5xl" style={{ fontSize: "20px" }}>share</span>
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[var(--surface-container-low)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)] transition-all">
                    <span className="material-symbols-outlined text-5xl" style={{ fontSize: "20px" }}>mail</span>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="font-bold text-xs text-[var(--primary)] tracking-widest">QUICK LINKS</h4>
                <ul className="space-y-2">
                  <li><a className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--secondary)] transition-colors" href="/beds">Browse Beds</a></li>
                  <li><a className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--secondary)] transition-colors" href="/impact">Impact Report</a></li>
                  <li><a className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--secondary)] transition-colors" href="#how-it-works">How it Works</a></li>
                  <li><a className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--secondary)] transition-colors" href="/faqs">FAQs</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div className="md:col-span-3 space-y-4">
                <h4 className="font-bold text-xs text-[var(--primary)] tracking-widest">LEGAL &amp; COMPLIANCE</h4>
                <ul className="space-y-2">
                  <li><a className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--secondary)] transition-colors" href="/privacy-policy">Privacy Policy</a></li>
                  <li><a className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--secondary)] transition-colors" href="/terms-of-service">Terms of Service</a></li>
                  <li><a className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--secondary)] transition-colors" href="/transparency-report">Transparency Report</a></li>
                  <li><a className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--secondary)] transition-colors" href="/audit-statement">Audit Statements</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="md:col-span-3 space-y-4">
                <h4 className="font-bold text-xs text-[var(--primary)] tracking-widest">CONTACT INFO</h4>
                <ul className="space-y-2 text-sm text-[var(--on-surface-variant)]">
                  <li>📧 sponsor@oncampus.ng</li>
                  <li>🤝 partnerships@oncampus.ng</li>
                  <li>🏢 FUTA, Akure, Nigeria</li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--outline-variant)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--on-surface-variant)]">
              <p>&copy; 2024 OnCampus. All rights reserved. Sponsor a Bed initiative.</p>
              <p>Partnership inquiry: partnerships@oncampus.ng</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
