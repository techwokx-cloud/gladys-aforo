"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Pencil, Loader2, X } from "lucide-react";
import type { TeamMember } from "@/lib/store";
import ImageUploader from "./ImageUploader";

type Draft = {
  id?: string;
  type: TeamMember["type"];
  name: string;
  role: string;
  description: string;
  photo: string;
};

const emptyDraft = (type: TeamMember["type"]): Draft => ({
  type,
  name: "",
  role: "",
  description: "",
  photo: "",
});

export default function TeamManager({ initialTeam }: { initialTeam: TeamMember[] }) {
  const [team, setTeam] = useState(initialTeam);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const board = team.filter((m) => m.type === "board").sort((a, b) => a.order - b.order);
  const staff = team.filter((m) => m.type === "staff").sort((a, b) => a.order - b.order);

  function startAdd(type: TeamMember["type"]) {
    setDraft(emptyDraft(type));
  }

  function startEdit(member: TeamMember) {
    setDraft({
      id: member.id,
      type: member.type,
      name: member.name,
      role: member.role,
      description: member.description ?? "",
      photo: member.photo ?? "",
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!draft || !draft.name || !draft.role) return;
    setSaving(true);
    try {
      if (draft.id) {
        const res = await fetch("/api/team", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: draft.id,
            name: draft.name,
            role: draft.role,
            description: draft.description,
            photo: draft.photo,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setTeam((prev) => prev.map((m) => (m.id === draft.id ? data.member : m)));
          setDraft(null);
        }
      } else {
        const res = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        });
        const data = await res.json();
        if (res.ok) {
          setTeam((prev) => [...prev, data.member]);
          setDraft(null);
        }
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setTeam((prev) => prev.filter((m) => m.id !== id));
    await fetch("/api/team", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  function renderGroup(title: string, members: TeamMember[], type: TeamMember["type"]) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-forest-950">{title}</h2>
          <button
            onClick={() => startAdd(type)}
            className="flex items-center gap-1.5 rounded-md bg-forest-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-forest-800"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {members.length === 0 && (
            <p className="text-sm text-forest-800/50">No members yet.</p>
          )}
          {members.map((m) => (
            <div key={m.id} className="flex items-start gap-3 rounded-xl border border-forest-900/10 bg-white p-4 shadow-sm">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-cream-300">
                {m.photo ? (
                  <Image src={m.photo} alt={m.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-sm font-semibold text-forest-800">
                    {m.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-forest-950">{m.name}</p>
                <p className="text-xs text-gold-600">{m.role}</p>
                {m.description && <p className="mt-1 text-xs text-forest-800/70">{m.description}</p>}
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button
                  onClick={() => startEdit(m)}
                  className="rounded-md border border-forest-900/15 p-1.5 text-forest-800/70 hover:border-gold-500"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="rounded-md border border-forest-900/15 p-1.5 text-red-600 hover:border-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-10">
      {renderGroup("Board of Directors", board, "board")}
      {renderGroup("Executive Staff", staff, "staff")}

      {draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-forest-950">
                {draft.id ? "Edit Member" : "Add Member"}
              </h3>
              <button onClick={() => setDraft(null)} className="text-forest-800/50 hover:text-forest-900">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <ImageUploader
                folder="team"
                value={draft.photo}
                onChange={(url) => setDraft({ ...draft, photo: url })}
              />
              <input
                required
                placeholder="Full name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
              />
              <input
                required
                placeholder="Title / role"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
              />
              {draft.type === "staff" && (
                <textarea
                  placeholder="Short bio / description"
                  rows={3}
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                />
              )}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  className="flex-1 rounded-md border border-forest-900/15 py-2.5 text-sm font-semibold text-forest-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-forest-900 py-2.5 text-sm font-semibold text-white hover:bg-forest-800 disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
