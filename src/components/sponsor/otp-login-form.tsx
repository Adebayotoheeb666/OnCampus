"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
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

  function sendOtp() {
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

  function verifyOtp() {
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
    <Card>
      <CardTitle>Sponsor sign in</CardTitle>
      <p className="mt-2 text-sm text-stone-600">
        We will email a one-time code to the address used during your sponsorship.
      </p>

      {step === "email" ? (
        <div className="mt-4 space-y-3">
          <input
            className="w-full rounded-lg border border-stone-200 px-3 py-2"
            type="email"
            placeholder="Sponsor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button onClick={sendOtp} disabled={isPending || !email} className="w-full">
            {isPending ? "Sending…" : "Send sign-in code"}
          </Button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {devCode && (
            <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
              Dev mode code: <strong>{devCode}</strong>
            </p>
          )}
          <input
            className="w-full rounded-lg border border-stone-200 px-3 py-2 tracking-widest"
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button onClick={verifyOtp} disabled={isPending || code.length < 6} className="w-full">
            {isPending ? "Verifying…" : "Verify & sign in"}
          </Button>
          <button type="button" className="w-full text-sm text-stone-500 hover:text-stone-800" onClick={() => setStep("email")}>
            Use a different email
          </button>
        </div>
      )}
    </Card>
  );
}
