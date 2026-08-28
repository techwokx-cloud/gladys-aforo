"use client";

import { useState } from "react";
import { ChevronDown, Mail, Phone } from "lucide-react";
import type { SupportRequest } from "@/lib/store";

const statusStyles: Record<SupportRequest["status"], string> = {
  new: "bg-gold-500/15 text-gold-600",
  reviewing: "bg-blue-100 text-blue-700",
  approved: "bg-forest-700/10 text-forest-700",
  declined: "bg-red-100 text-red-600",
};

const urgencyStyles: Record<string, string> = {
  "Critical / Emergency": "bg-red-100 text-red-600",
  High: "bg-gold-500/20 text-gold-700",
  Medium: "bg-cream-300 text-forest-800",
  Low: "bg-cream-200 text-forest-800/70",
};

export default function RequestsTable({ initialRequests }: { initialRequests: SupportRequest[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [openId, setOpenId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  async function updateStatus(id: string, status: SupportRequest["status"]) {
    setUpdating(id);
    try {
      const res = await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      }
    } finally {
      setUpdating(null);
    }
  }

  if (requests.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-forest-900/10 bg-white p-8 text-center text-sm text-forest-800/60 shadow-sm">
        No support requests submitted yet.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {requests.map((r) => {
        const open = openId === r.id;
        return (
          <div key={r.id} className="overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-sm">
            <button
              onClick={() => setOpenId(open ? null : r.id)}
              className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <div>
                <p className="font-semibold text-forest-950">{r.familyHeadName}</p>
                <p className="text-xs text-forest-800/60">
                  Requested by {r.fullName} ({r.role}) · {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${urgencyStyles[r.urgency] ?? ""}`}>
                  {r.urgency}
                </span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${statusStyles[r.status]}`}>
                  {r.status}
                </span>
                <ChevronDown className={`h-4 w-4 text-forest-800/50 transition-transform ${open ? "rotate-180" : ""}`} />
              </div>
            </button>

            {open && (
              <div className="border-t border-forest-900/10 bg-cream-100 px-5 py-4">
                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">Requestor</p>
                    <p className="mt-1 flex items-center gap-1.5 text-forest-900">
                      <Phone className="h-3.5 w-3.5" /> {r.phone}
                    </p>
                    <p className="flex items-center gap-1.5 text-forest-900">
                      <Mail className="h-3.5 w-3.5" /> {r.email}
                    </p>
                    <p className="mt-1 text-forest-800/70">
                      {r.facility || "N/A"} · {r.district}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">Request Details</p>
                    <p className="mt-1 text-forest-900">{r.supportType}</p>
                    <p className="text-forest-800/70">
                      Estimated: GHS {r.estimatedAmount} · Dependents: {r.dependents}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">Situation</p>
                  <p className="mt-1 text-sm text-forest-800/80">{r.situation}</p>
                </div>
                {r.additionalInfo && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                      Additional Info
                    </p>
                    <p className="mt-1 text-sm text-forest-800/80">{r.additionalInfo}</p>
                  </div>
                )}
                {r.attachmentNames.length > 0 && (
                  <p className="mt-3 text-xs text-forest-800/60">
                    Attachments emailed to the team: {r.attachmentNames.join(", ")}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {(["new", "reviewing", "approved", "declined"] as const).map((s) => (
                    <button
                      key={s}
                      disabled={updating === r.id}
                      onClick={() => updateStatus(r.id, s)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors disabled:opacity-50 ${
                        r.status === s
                          ? "border-forest-900 bg-forest-900 text-white"
                          : "border-forest-900/15 text-forest-800/70 hover:border-forest-900"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
