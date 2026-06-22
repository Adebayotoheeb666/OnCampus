import { Suspense } from "react";
import { AdminLoginForm } from "@/components/auth/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-16">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
