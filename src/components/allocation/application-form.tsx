"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { submitApplication } from "@/modules/allocation/actions";
import type { NeedAssessment } from "@/lib/validations/allocation";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

export function ApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    fullName: "",
    matricOrJambNo: "",
    level: "100L",
    gender: "male" as "male" | "female",
    phone: "",
    email: "",
    stateOfOrigin: "",
    applicationType: "free_bed" as "free_bed" | "paid_bed",
    needAssessment: {
      incomeBracket: "below_50k" as NeedAssessment["incomeBracket"],
      distanceCategory: "far" as NeedAssessment["distanceCategory"],
      guardianStatus: "single_parent" as NeedAssessment["guardianStatus"],
    },
  });

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const payload = {
        ...form,
        needAssessment: form.applicationType === "free_bed" ? form.needAssessment : undefined,
      };
      const result = await submitApplication(payload);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.push(`/apply/status?reference=${result.reference}`);
    });
  }

  const isFreeBed = form.applicationType === "free_bed";
  const totalSteps = isFreeBed ? 4 : 3;

  return (
    <Card>
      <div className="mb-6 flex gap-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${step >= s ? "bg-emerald-600" : "bg-stone-200"}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <CardTitle>Personal details</CardTitle>
          <input className="w-full rounded-lg border border-stone-200 px-3 py-2" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <input className="w-full rounded-lg border border-stone-200 px-3 py-2" placeholder="JAMB / Matric number" value={form.matricOrJambNo} onChange={(e) => setForm({ ...form, matricOrJambNo: e.target.value })} />
          <select className="w-full rounded-lg border border-stone-200 px-3 py-2" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
            {["100L", "200L", "300L", "400L", "500L"].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select className="w-full rounded-lg border border-stone-200 px-3 py-2" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as "male" | "female" })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input className="w-full rounded-lg border border-stone-200 px-3 py-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="w-full rounded-lg border border-stone-200 px-3 py-2" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <select className="w-full rounded-lg border border-stone-200 px-3 py-2" value={form.stateOfOrigin} onChange={(e) => setForm({ ...form, stateOfOrigin: e.target.value })}>
            <option value="">State of origin</option>
            {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <Button onClick={() => setStep(2)} className="w-full">Continue</Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <CardTitle>Application type</CardTitle>
          {(["free_bed", "paid_bed"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm({ ...form, applicationType: t })}
              className={`w-full rounded-lg border p-4 text-left ${form.applicationType === t ? "border-emerald-700 bg-emerald-50" : "border-stone-200"}`}
            >
              <p className="font-medium">{t === "free_bed" ? "Free Bed (100L sponsorship)" : "Paid Bed"}</p>
              <p className="mt-1 text-sm text-stone-600">
                {t === "free_bed"
                  ? "For first-year students who need a sponsored bed based on need assessment."
                  : "Request a paid bed with session rent invoicing."}
              </p>
            </button>
          ))}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
            <Button onClick={() => setStep(isFreeBed ? 3 : 3)} className="flex-1">Continue</Button>
          </div>
        </div>
      )}

      {step === 3 && isFreeBed && (
        <div className="space-y-4">
          <CardTitle>Need assessment</CardTitle>
          <label className="block text-sm font-medium">Household income (monthly)</label>
          <select
            className="w-full rounded-lg border border-stone-200 px-3 py-2"
            value={form.needAssessment.incomeBracket}
            onChange={(e) => setForm({ ...form, needAssessment: { ...form.needAssessment, incomeBracket: e.target.value as NeedAssessment["incomeBracket"] } })}
          >
            <option value="below_50k">Below ₦50,000</option>
            <option value="50k_100k">₦50,000 – ₦100,000</option>
            <option value="100k_200k">₦100,000 – ₦200,000</option>
            <option value="above_200k">Above ₦200,000</option>
          </select>
          <label className="block text-sm font-medium">Distance from FUTA</label>
          <select
            className="w-full rounded-lg border border-stone-200 px-3 py-2"
            value={form.needAssessment.distanceCategory}
            onChange={(e) => setForm({ ...form, needAssessment: { ...form.needAssessment, distanceCategory: e.target.value as NeedAssessment["distanceCategory"] } })}
          >
            <option value="onsite">On campus / very close</option>
            <option value="nearby">Within Akure</option>
            <option value="far">Outside Akure / other state</option>
          </select>
          <label className="block text-sm font-medium">Guardian status</label>
          <select
            className="w-full rounded-lg border border-stone-200 px-3 py-2"
            value={form.needAssessment.guardianStatus}
            onChange={(e) => setForm({ ...form, needAssessment: { ...form.needAssessment, guardianStatus: e.target.value as NeedAssessment["guardianStatus"] } })}
          >
            <option value="orphan">Orphan / no guardian</option>
            <option value="single_parent">Single parent / guardian</option>
            <option value="both_parents">Both parents / guardians</option>
          </select>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
            <Button onClick={() => setStep(4)} className="flex-1">Review</Button>
          </div>
        </div>
      )}

      {((step === 3 && !isFreeBed) || (step === 4 && isFreeBed)) && (
        <div className="space-y-4">
          <CardTitle>Review & submit</CardTitle>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-stone-600">Name</dt><dd>{form.fullName}</dd></div>
            <div className="flex justify-between"><dt className="text-stone-600">JAMB/Matric</dt><dd>{form.matricOrJambNo}</dd></div>
            <div className="flex justify-between"><dt className="text-stone-600">Level</dt><dd>{form.level}</dd></div>
            <div className="flex justify-between"><dt className="text-stone-600">Type</dt><dd className="capitalize">{form.applicationType.replace("_", " ")}</dd></div>
          </dl>
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(isFreeBed ? 3 : 2)} className="flex-1">Back</Button>
            <Button onClick={handleSubmit} disabled={isPending} className="flex-1">
              {isPending ? "Submitting…" : "Submit application"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
