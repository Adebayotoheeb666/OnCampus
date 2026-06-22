import "@/app/globals.css";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "OnCampus | Change a Life, One Bed at a Time",
  description:
    "EduStay bridges the gap between available campus housing and students in need. Direct-impact sponsorship that ensures a stable future for the next generation of leaders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <head>
        <meta name="theme-color" content="#00322d" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-sans: Inter, system-ui, -apple-system, sans-serif;
            --font-serif: Manrope, system-ui, -apple-system, sans-serif;
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-background text-on-background pb-20 md:pb-0">
        {/* <HomeHeader /> */}
        <main>{children}</main>
        <footer className="mt-16 border-t border-outline-variant bg-surface-container-low">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-primary mb-3">OnCampus</h3>
                <p className="text-sm text-on-surface-variant">Change a life, one bed at a time.</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3 text-sm">Platform</h4>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li><a href="#" className="hover:text-primary transition-colors">Browse Beds</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">My Sponsorships</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Impact Stories</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3 text-sm">Company</h4>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-outline-variant pt-8">
              <p className="text-sm text-on-surface-variant">
                OnCampus · Sponsor a Bed · Federal University of Technology, Akure · Partnership inquiry: partnerships@oncampus.ng
              </p>
              <p className="text-xs text-on-surface-variant mt-2">© 2024 OnCampus. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
