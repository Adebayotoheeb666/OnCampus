import { SponsorOtpLoginForm } from "@/components/sponsor/otp-login-form";
import { redirect } from "next/navigation";
import { getSponsorSession } from "@/lib/auth/session";

export default async function SponsorLoginPage() {
  const session = await getSponsorSession();
  if (session) redirect("/sponsor/portal/dashboard");

  return (
    <div className="bg-surface-bright text-on-surface font-body-md min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center relative overflow-hidden px-gutter-mobile py-margin-safe">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-[440px] relative z-10">
          {/* Branding Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[48px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight">OnCampus</h1>
            <p className="font-body-md text-on-surface-variant mt-2">Sponsor Portal</p>
          </div>

          {/* Login Form */}
          <SponsorOtpLoginForm />

          {/* Disclaimer */}
          <footer className="mt-10 text-center space-y-4">
            <p className="text-label-caps font-label-caps text-on-surface-variant opacity-70 px-4">
              Sign in to view your sponsorship impact and manage your pledges.
            </p>
            <div className="flex justify-center gap-6">
              <a className="text-label-caps font-label-caps text-outline hover:text-primary transition-colors" href="/">
                Home
              </a>
              <a className="text-label-caps font-label-caps text-outline hover:text-primary transition-colors" href="/impact">
                Our Impact
              </a>
            </div>
          </footer>
        </div>
      </main>

      {/* Decorative Footer */}
      <div className="h-1.5 w-full bg-gradient-to-r from-secondary via-primary to-secondary opacity-80"></div>
    </div>
  );
}
