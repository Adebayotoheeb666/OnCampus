"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginResident } from "@/modules/auth/actions";

export function ResidentLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [matricOrJambNo, setMatricOrJambNo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await loginResident(email, matricOrJambNo);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.push("/resident/home");
      router.refresh();
    });
  }

  return (
    <section className="bg-white bg-opacity-80 backdrop-blur-[12px] rounded-xl p-8 shadow-[0_12px_40px_rgba(0,50,45,0.04)] border border-outline-variant">
      <div className="mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">Resident Portal Sign In</h2>
        <p className="text-on-surface-variant font-body-md mt-1">Enter your email and JAMB/matric number from your application.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider" htmlFor="email">
            Email Address
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              mail
            </span>
            <input
              className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md"
              id="email"
              name="email"
              placeholder="student@university.edu"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Matric/JAMB Field */}
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider" htmlFor="matric">
            JAMB / Matric Number
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              card_membership
            </span>
            <input
              className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md"
              id="matric"
              name="matric"
              placeholder="e.g., 12345678"
              required
              value={matricOrJambNo}
              onChange={(e) => setMatricOrJambNo(e.target.value)}
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
          className="w-full bg-primary hover:bg-primary-container text-on-primary py-4 rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-primary/10"
          type="submit"
          disabled={isPending}
        >
          <span>{isPending ? "Signing in…" : "Sign In"}</span>
          <span className="material-symbols-outlined">{isPending ? 'refresh' : 'login'}</span>
        </button>
      </form>

      {/* Info Section */}
      <div className="mt-8 pt-6 border-t border-outline-variant flex items-start gap-3">
        <span className="material-symbols-outlined text-primary flex-shrink-0">info</span>
        <p className="text-[13px] leading-relaxed text-on-surface-variant font-body-md">
          Use the credentials from your housing application. If you don't have an account, please contact housing services.
        </p>
      </div>
    </section>
  );
}
