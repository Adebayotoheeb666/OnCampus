"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestSponsorOtp } from "@/modules/auth/otp";
import { loginSponsorWithOtp } from "@/modules/auth/actions";

export function SponsorOtpLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDevCode(null);
    startTransition(async () => {
      const result = await requestSponsorOtp(email);
      if (!result.success) {
        setError(result.error);
        return;
      }
      if (result.devCode) setDevCode(result.devCode);
      setStep("code");
    });
  }

  function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await loginSponsorWithOtp(email, code);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.push("/sponsor/portal/dashboard");
      router.refresh();
    });
  }

  return (
    <section className="bg-white bg-opacity-80 backdrop-blur-[12px] rounded-xl p-8 shadow-[0_12px_40px_rgba(0,50,45,0.04)] border border-outline-variant">
      <div className="mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">Sponsor Sign In</h2>
        <p className="text-on-surface-variant font-body-md mt-1">Sign in with the email used for your sponsorship.</p>
      </div>

      {step === "email" ? (
        <form className="space-y-6" onSubmit={sendOtp}>
          {/* Email Field */}
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">
                mail
              </span>
              <input
                className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none font-body-md"
                id="email"
                name="email"
                placeholder="sponsor@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="flex gap-3 rounded-lg bg-red-50 border border-red-200 p-3">
              <span className="material-symbols-outlined text-red-600 flex-shrink-0">error</span>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Action Button */}
          <button
            className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary py-4 rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-secondary/10"
            type="submit"
            disabled={isPending || !email}
          >
            <span>{isPending ? "Sending…" : "Send Sign-In Code"}</span>
            <span className="material-symbols-outlined">{isPending ? 'refresh' : 'mail'}</span>
          </button>
        </form>
      ) : (
        <form className="space-y-6" onSubmit={verifyOtp}>
          {/* Dev Code Display */}
          {devCode && (
            <div className="flex gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4">
              <span className="material-symbols-outlined text-amber-600 flex-shrink-0">info</span>
              <div>
                <p className="text-sm font-label-caps text-amber-900 uppercase tracking-wider">Dev Mode Code</p>
                <p className="text-lg font-bold text-amber-900 font-mono mt-1">{devCode}</p>
              </div>
            </div>
          )}

          {/* Code Field */}
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider" htmlFor="code">
              Verification Code
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">
                security
              </span>
              <input
                className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none font-body-md text-center tracking-widest font-mono text-lg"
                id="code"
                name="code"
                placeholder="000000"
                required
                type="text"
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
              />
            </div>
            <p className="text-xs text-on-surface-variant">Check your email for the 6-digit code</p>
          </div>

          {error && (
            <div className="flex gap-3 rounded-lg bg-red-50 border border-red-200 p-3">
              <span className="material-symbols-outlined text-red-600 flex-shrink-0">error</span>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Action Button */}
          <button
            className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary py-4 rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isPending || code.length < 6}
          >
            <span>{isPending ? "Verifying…" : "Verify & Sign In"}</span>
            <span className="material-symbols-outlined">{isPending ? 'refresh' : 'check'}</span>
          </button>

          {/* Back Button */}
          <button
            type="button"
            className="w-full py-3 text-secondary font-label-caps font-bold uppercase tracking-wider hover:text-secondary/80 transition-colors"
            onClick={() => {
              setStep("email");
              setCode("");
              setError(null);
            }}
          >
            Use a Different Email
          </button>
        </form>
      )}

      {/* Info Section */}
      <div className="mt-8 pt-6 border-t border-outline-variant flex items-start gap-3">
        <span className="material-symbols-outlined text-secondary flex-shrink-0">verified_user</span>
        <p className="text-[13px] leading-relaxed text-on-surface-variant font-body-md">
          We'll send a one-time code to your email. No password needed. Your sponsorship data is secure.
        </p>
      </div>
    </section>
  );
}
