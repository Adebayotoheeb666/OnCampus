"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { loginAdmin } from "@/modules/auth/actions";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("admin@oncampus.ng");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const result = await loginAdmin(email, password);
      if (!result.success) {
        setError(result.error);
        return;
      }
      const next = searchParams.get("next") ?? "/admin/allocation";
      router.push(next);
      router.refresh();
    });
  }

  return (
    <Card>
      <CardTitle>Admin sign in</CardTitle>
      <p className="mt-2 text-sm text-stone-500">Default dev credentials: admin@oncampus.ng / admin123</p>
      <div className="mt-4 space-y-3">
        <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </div>
    </Card>
  );
}
