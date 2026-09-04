import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, HeartHandshake, MessageSquare, ExternalLink, ClipboardList, Users, Images, Settings } from "lucide-react";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { site } from "@/lib/site";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-200">
      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col justify-between border-r border-forest-900/10 bg-forest-950 px-4 py-6 lg:flex">
          <div>
            <div className="mb-8 flex items-center gap-2 px-2">
              <Image src="/images/logo/logo.png" alt={site.name} width={40} height={48} className="h-9 w-auto" />
              <span className="font-display text-sm font-semibold text-white leading-tight">
                Foundation
                <br />
                Dashboard
              </span>
            </div>
            <nav className="space-y-1 text-sm">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-cream-200 hover:bg-white/5"
              >
                <LayoutDashboard className="h-4 w-4" /> Overview
              </Link>
              <Link
                href="/dashboard/donations"
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-cream-200 hover:bg-white/5"
              >
                <HeartHandshake className="h-4 w-4" /> Donations
              </Link>
              <Link
                href="/dashboard/messages"
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-cream-200 hover:bg-white/5"
              >
                <MessageSquare className="h-4 w-4" /> Messages
              </Link>
              <Link
                href="/dashboard/requests"
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-cream-200 hover:bg-white/5"
              >
                <ClipboardList className="h-4 w-4" /> Support Requests
              </Link>
              <Link
                href="/dashboard/team"
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-cream-200 hover:bg-white/5"
              >
                <Users className="h-4 w-4" /> Board & Staff
              </Link>
              <Link
                href="/dashboard/gallery"
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-cream-200 hover:bg-white/5"
              >
                <Images className="h-4 w-4" /> Photos
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-cream-200 hover:bg-white/5"
              >
                <Settings className="h-4 w-4" /> Settings
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-cream-300 hover:bg-white/5"
              >
                <ExternalLink className="h-4 w-4" /> View Site
              </Link>
            </nav>
          </div>
          <LogoutButton />
        </aside>

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2">
              <Image src="/images/logo/logo.png" alt={site.name} width={32} height={40} className="h-8 w-auto" />
              <span className="font-display text-sm font-semibold text-forest-950">Dashboard</span>
            </div>
            <LogoutButton compact />
          </div>
          <nav className="mb-6 flex gap-2 overflow-x-auto text-xs font-medium lg:hidden">
            <Link href="/dashboard" className="rounded-full border border-forest-900/15 bg-white px-3 py-1.5">
              Overview
            </Link>
            <Link
              href="/dashboard/donations"
              className="rounded-full border border-forest-900/15 bg-white px-3 py-1.5"
            >
              Donations
            </Link>
            <Link
              href="/dashboard/messages"
              className="rounded-full border border-forest-900/15 bg-white px-3 py-1.5"
            >
              Messages
            </Link>
            <Link
              href="/dashboard/requests"
              className="rounded-full border border-forest-900/15 bg-white px-3 py-1.5"
            >
              Requests
            </Link>
            <Link
              href="/dashboard/team"
              className="rounded-full border border-forest-900/15 bg-white px-3 py-1.5"
            >
              Team
            </Link>
            <Link
              href="/dashboard/gallery"
              className="rounded-full border border-forest-900/15 bg-white px-3 py-1.5"
            >
              Photos
            </Link>
            <Link
              href="/dashboard/settings"
              className="rounded-full border border-forest-900/15 bg-white px-3 py-1.5"
            >
              Settings
            </Link>
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
}
