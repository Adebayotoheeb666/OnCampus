"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { SPONSORSHIP_TIERS, type SponsorshipTier } from "@/lib/constants";
import { formatNaira } from "@/lib/utils";
import { createSponsorshipCheckout } from "@/modules/sponsor/actions";
import type { BedWithLocation } from "@/modules/sponsor/queries";

type Props = {
  bed: BedWithLocation;
};

export function CheckoutForm({ bed }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    type: "individual" as "individual" | "organization",
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    isDiaspora: false,
    tier: "full_bed" as SponsorshipTier,
    recurring: false,
  });

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const result = await createSponsorshipCheckout({
        ...form,
        bedId: bed.id,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.push(result.authorizationUrl);
    });
  }

  const tier = SPONSORSHIP_TIERS[form.tier];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <div className="mb-6 flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full ${step >= s ? "bg-emerald-600" : "bg-stone-200"}`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <CardTitle>Your details</CardTitle>
              <div className="flex gap-2">
                {(["individual", "organization"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => updateField("type", t)}
                    className={`rounded-lg border px-4 py-2 text-sm capitalize ${
                      form.type === t
                        ? "border-emerald-700 bg-emerald-50 text-emerald-800"
                        : "border-stone-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <input
                className="w-full rounded-lg border border-stone-200 px-3 py-2"
                placeholder={form.type === "organization" ? "Contact name" : "Full name"}
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
              {form.type === "organization" && (
                <input
                  className="w-full rounded-lg border border-stone-200 px-3 py-2"
                  placeholder="Organization name"
                  value={form.organizationName}
                  onChange={(e) => updateField("organizationName", e.target.value)}
                />
              )}
              <input
                className="w-full rounded-lg border border-stone-200 px-3 py-2"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-stone-200 px-3 py-2"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isDiaspora}
                  onChange={(e) => updateField("isDiaspora", e.target.checked)}
                />
                I am sponsoring from outside Nigeria (diaspora)
              </label>
              <Button onClick={() => setStep(2)} className="w-full">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <CardTitle>Choose sponsorship tier</CardTitle>
              {(Object.keys(SPONSORSHIP_TIERS) as SponsorshipTier[]).map((key) => {
                const t = SPONSORSHIP_TIERS[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      updateField("tier", key);
                      if ("recurring" in t && t.recurring) updateField("recurring", true);
                    }}
                    className={`w-full rounded-lg border p-4 text-left ${
                      form.tier === key ? "border-emerald-700 bg-emerald-50" : "border-stone-200"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{t.label}</span>
                      <span className="font-semibold text-emerald-800">
                        {formatNaira(t.amountKobo)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600">{t.description}</p>
                  </button>
                );
              })}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  Continue to payment
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <CardTitle>Payment</CardTitle>
              <p className="text-sm text-stone-600">
                You will be redirected to Paystack to complete your sponsorship payment securely.
              </p>
              {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={isPending} className="flex-1">
                  {isPending ? "Processing…" : `Pay ${formatNaira(tier.amountKobo)}`}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <aside>
        <Card className="sticky top-24">
          <CardTitle>Order summary</CardTitle>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-600">Bed</dt>
              <dd>
                {bed.blockName} · {bed.roomNumber} · Bed {bed.bedLabel}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-600">Tier</dt>
              <dd>{tier.label}</dd>
            </div>
            <div className="flex justify-between border-t border-stone-100 pt-2 font-semibold">
              <dt>Total</dt>
              <dd className="text-emerald-800">{formatNaira(tier.amountKobo)}</dd>
            </div>
          </dl>
        </Card>
      </aside>
    </div>
  );
}
