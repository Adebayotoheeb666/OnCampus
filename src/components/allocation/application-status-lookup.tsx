"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export function ApplicationStatusLookup() {
  const router = useRouter();
  const [mode, setMode] = useState<"reference" | "email">("reference");
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [matricOrJambNo, setMatricOrJambNo] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleLookup() {
    startTransition(() => {
      if (mode === "reference") {
        router.push(`/apply/status?reference=${encodeURIComponent(reference)}`);
      } else {
        const params = new URLSearchParams({ email, matricOrJambNo });
        router.push(`/apply/status?${params}`);
      }
    });
  }

  return (
    <Card>
      <CardTitle>Track your application</CardTitle>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => setMode("reference")} className={`rounded-lg px-3 py-1.5 text-sm ${mode === "reference" ? "bg-emerald-100 text-emerald-800" : "text-stone-600"}`}>
          By reference
        </button>
        <button type="button" onClick={() => setMode("email")} className={`rounded-lg px-3 py-1.5 text-sm ${mode === "email" ? "bg-emerald-100 text-emerald-800" : "text-stone-600"}`}>
          By email + JAMB
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {mode === "reference" ? (
          <input className="w-full rounded-lg border border-stone-200 px-3 py-2" placeholder="Application reference (e.g. app_…)" value={reference} onChange={(e) => setReference(e.target.value)} />
        ) : (
          <>
            <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full rounded-lg border border-stone-200 px-3 py-2" placeholder="JAMB / Matric number" value={matricOrJambNo} onChange={(e) => setMatricOrJambNo(e.target.value)} />
          </>
        )}
        <Button onClick={handleLookup} disabled={isPending} className="w-full">
          {isPending ? "Looking up…" : "Check status"}
        </Button>
      </div>
    </Card>
  );
}
