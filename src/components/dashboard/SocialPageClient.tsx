"use client";

import { useState } from "react";
import SocialComposer from "@/components/dashboard/SocialComposer";
import SocialReport from "@/components/dashboard/SocialReport";
import type { SocialPost } from "@/lib/store";

export default function SocialPageClient({ posts }: { posts: SocialPost[] }) {
  const [tab, setTab] = useState<"planner" | "report">("planner");

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Social & Outreach</h1>
      <p className="mt-1 max-w-2xl text-sm text-forest-800/60">
        Draft and schedule posts for donation drives, outreach programs, and updates, then review
        engagement activity month by month.
      </p>
      <div className="mt-3 rounded-md border border-gold-500/30 bg-cream-200 px-4 py-3 text-xs text-forest-800/70">
        This planner doesn&apos;t publish to social platforms automatically yet — that requires
        connecting Meta&apos;s Graph API (Facebook/Instagram) and a WhatsApp Business API key. Ask
        for that setup whenever you&apos;re ready to go from planning to one-click publishing.
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setTab("planner")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "planner" ? "bg-forest-900 text-white" : "border border-forest-900/15 text-forest-800"
          }`}
        >
          Planner
        </button>
        <button
          onClick={() => setTab("report")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "report" ? "bg-forest-900 text-white" : "border border-forest-900/15 text-forest-800"
          }`}
        >
          Monthly Report
        </button>
      </div>

      {tab === "planner" ? <SocialComposer initialPosts={posts} /> : <SocialReport posts={posts} />}
    </div>
  );
}
