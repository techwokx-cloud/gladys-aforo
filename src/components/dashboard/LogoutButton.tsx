"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  if (compact) {
    return (
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 rounded-md border border-forest-900/15 bg-white px-3 py-1.5 text-xs font-medium text-forest-900"
      >
        <LogOut className="h-3.5 w-3.5" /> Sign out
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-cream-300 hover:bg-white/5"
    >
      <LogOut className="h-4 w-4" /> Sign out
    </button>
  );
}
