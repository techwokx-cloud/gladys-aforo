"use client";

import { useMemo } from "react";
import { Download } from "lucide-react";
import type { SocialPost } from "@/lib/store";

function monthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string) {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export default function SocialReport({ posts }: { posts: SocialPost[] }) {
  const months = useMemo(() => {
    const grouped = new Map<string, SocialPost[]>();
    for (const post of posts) {
      const key = monthKey(post.createdAt);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(post);
    }
    return Array.from(grouped.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([key, monthPosts]) => {
        const byPlatform: Record<string, number> = {};
        const byCategory: Record<string, number> = {};
        const byStatus: Record<string, number> = {};
        for (const p of monthPosts) {
          byPlatform[p.platform] = (byPlatform[p.platform] ?? 0) + 1;
          byCategory[p.category] = (byCategory[p.category] ?? 0) + 1;
          byStatus[p.status] = (byStatus[p.status] ?? 0) + 1;
        }
        return { key, label: monthLabel(key), total: monthPosts.length, byPlatform, byCategory, byStatus };
      });
  }, [posts]);

  function downloadCsv() {
    const rows = [
      ["Month", "Total Posts", "Draft", "Scheduled", "Posted", "Facebook", "Instagram", "WhatsApp", "General", "Programs", "Events"],
      ...months.map((m) => [
        m.label,
        m.total,
        m.byStatus.draft ?? 0,
        m.byStatus.scheduled ?? 0,
        m.byStatus.posted ?? 0,
        m.byPlatform.facebook ?? 0,
        m.byPlatform.instagram ?? 0,
        m.byPlatform.whatsapp ?? 0,
        m.byCategory.general ?? 0,
        m.byCategory.program ?? 0,
        m.byCategory.event ?? 0,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "social-media-monthly-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (months.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-forest-900/10 bg-white p-8 text-center text-sm text-forest-800/60 shadow-sm">
        No posts yet — your monthly report will appear here once you start drafting posts.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-end">
        <button
          onClick={downloadCsv}
          className="flex items-center gap-1.5 rounded-md border border-forest-900/15 bg-white px-3 py-1.5 text-xs font-semibold text-forest-800 hover:border-gold-500"
        >
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>
      <div className="mt-3 space-y-4">
        {months.map((m) => (
          <div key={m.key} className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-forest-950">{m.label}</h3>
              <span className="text-xs text-forest-800/60">{m.total} post{m.total === 1 ? "" : "s"}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-forest-800/50">By Status</p>
                <p className="mt-1 text-xs text-forest-800/80">
                  Draft {m.byStatus.draft ?? 0} · Scheduled {m.byStatus.scheduled ?? 0} · Posted {m.byStatus.posted ?? 0}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-forest-800/50">By Platform</p>
                <p className="mt-1 text-xs text-forest-800/80">
                  Facebook {m.byPlatform.facebook ?? 0} · Instagram {m.byPlatform.instagram ?? 0} · WhatsApp{" "}
                  {m.byPlatform.whatsapp ?? 0} · General {m.byPlatform.general ?? 0}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-forest-800/50">By Category</p>
                <p className="mt-1 text-xs text-forest-800/80">
                  Programs {m.byCategory.program ?? 0} · Events {m.byCategory.event ?? 0} · General{" "}
                  {m.byCategory.general ?? 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
