import Link from "next/link";
import { ApplicationForm } from "@/components/allocation/application-form";

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Student application</h1>
        <p className="mt-2 text-stone-600">
          Apply for a free (sponsored) bed or request a paid bed for the OnCampus pilot at FUTA.
        </p>
        <p className="mt-2 text-sm text-stone-500">
          Already applied?{" "}
          <Link href="/apply/status" className="text-emerald-800 hover:underline">
            Track your application status
          </Link>
        </p>
      </div>
      <ApplicationForm />
    </div>
  );
}
