import { redirect } from "next/navigation";
import Link from "next/link";
import { SponsorOtpLoginForm } from "@/components/sponsor/otp-login-form";
import { getSponsorSession } from "@/lib/auth/session";

export default async function SponsorPortalPage() {
  const session = await getSponsorSession();
  if (session) redirect("/sponsor/portal/dashboard");

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">My pledges</h1>
      <SponsorOtpLoginForm />
      <p className="mt-6 text-center text-sm text-stone-500">
        New sponsor?{" "}
        <Link href="/beds" className="text-emerald-800 hover:underline">
          Fund a bed
        </Link>
      </p>
    </div>
  );
}
