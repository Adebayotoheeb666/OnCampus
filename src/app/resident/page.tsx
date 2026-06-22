import { ResidentLoginForm } from "@/components/payments/resident-login-form";
import { redirect } from "next/navigation";
import { getResidentSession } from "@/lib/auth/session";

export default async function ResidentPage() {
  const session = await getResidentSession();
  if (session) redirect("/resident/home");

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Resident portal</h1>
      <ResidentLoginForm />
    </div>
  );
}
