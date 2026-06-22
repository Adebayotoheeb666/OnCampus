"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { loginResident } from "@/modules/auth/actions";

export function ResidentLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [matricOrJambNo, setMatricOrJambNo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
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
    <Card>
      <CardTitle>Resident portal</CardTitle>
      <p className="mt-2 text-sm text-stone-600">
        Sign in with the email and JAMB/matric number from your application.
      </p>
      <div className="mt-4 space-y-3">
        <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-lg border border-stone-200 px-3 py-2" placeholder="JAMB / Matric number" value={matricOrJambNo} onChange={(e) => setMatricOrJambNo(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </div>
    </Card>
  );
}
