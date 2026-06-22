import "@/app/globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "OnCampus — Sponsor a Bed | FUTA",
  description:
    "Sponsor a bed for a first-year FUTA student through the OnCampus Sponsor a Bed initiative.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <SiteHeader />
        <main>{children}</main>
        <footer className="mt-16 border-t border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-stone-500">
            <p>OnCampus · Sponsor a Bed · Federal University of Technology, Akure</p>
            <p className="mt-1">Partnership inquiry: partnerships@oncampus.ng</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
