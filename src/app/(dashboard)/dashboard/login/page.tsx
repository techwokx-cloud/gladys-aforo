import Image from "next/image";
import LoginForm from "@/components/dashboard/LoginForm";
import { site } from "@/lib/site";

export const metadata = { title: "Admin Login | Gladys Aforo Foundation" };

export default function DashboardLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-950 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/images/logo/logo.png" alt={site.name} width={72} height={88} className="h-16 w-auto" />
          <h1 className="mt-3 font-display text-xl font-semibold text-forest-950">
            Foundation Dashboard
          </h1>
          <p className="mt-1 text-sm text-forest-800/60">Sign in to manage donations & messages</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
