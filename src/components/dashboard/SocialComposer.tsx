"use client";

import { useState } from "react";
import { Plus, Trash2, Copy, Check, Loader2, Send } from "lucide-react";
import type { SocialPost } from "@/lib/store";

const templates = [
  {
    label: "Donation Drive",
    content:
      "Every gift changes a life. This month, your donation can provide medical care, meals, and diapers to mothers and babies across Accra. Give today: [link] 🙏💚",
  },
  {
    label: "Outreach Recap",
    content:
      "Today our team visited [hospital/location] to support mothers and newborns with [type of support]. Thank you to everyone who makes this possible. #GladysAforoFoundation",
  },
  {
    label: "Urgent Need",
    content:
      "URGENT: A family in [district] needs help with [need]. Can you help us reach them today? Every cedi counts. [link]",
  },
];

const platformLabel: Record<SocialPost["platform"], string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  general: "General",
};

const categoryLabel: Record<SocialPost["category"], string> = {
  general: "General Update",
  program: "Program",
  event: "Event",
};

const statusLabel: Record<SocialPost["status"], string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  posted: "Posted",
};

export default function SocialComposer({ initialPosts }: { initialPosts: SocialPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState<SocialPost["platform"]>("general");
  const [category, setCategory] = useState<SocialPost["category"]>("general");
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<{ id: string; message: string } | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/social-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, platform, category, status: "draft" }),
      });
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [data.post, ...prev]);
        setTitle("");
        setContent("");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(id: string, status: SocialPost["status"]) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    await fetch("/api/social-posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  async function handleDelete(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    await fetch("/api/social-posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  async function handlePublish(id: string) {
    setPublishingId(id);
    setPublishError(null);
    try {
      const res = await fetch(`/api/social-posts/${id}/publish`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => prev.map((p) => (p.id === id ? data.post : p)));
      } else {
        setPublishError({ id, message: data.error ?? "Failed to publish." });
      }
    } catch {
      setPublishError({ id, message: "Network error while publishing." });
    } finally {
      setPublishingId(null);
    }
  }

  function copyContent(post: SocialPost) {
    navigator.clipboard.writeText(post.content);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-forest-950">New Post</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {templates.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => {
                setTitle(t.label);
                setContent(t.content);
              }}
              className="rounded-full border border-gold-500/40 px-3 py-1 text-xs font-medium text-gold-700 hover:bg-gold-500/10"
            >
              {t.label}
            </button>
          ))}
        </div>
        <form onSubmit={handleSave} className="mt-4 space-y-3">
          <input
            required
            placeholder="Post title / internal label"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as SocialPost["platform"])}
              className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            >
              <option value="general">General</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SocialPost["category"])}
              className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            >
              <option value="general">General Update</option>
              <option value="program">Program</option>
              <option value="event">Event</option>
            </select>
          </div>
          <textarea
            required
            rows={5}
            placeholder="Write the post content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-forest-900 py-2.5 text-sm font-semibold text-white hover:bg-forest-800 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Save Draft
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {posts.length === 0 && (
          <div className="rounded-xl border border-forest-900/10 bg-white p-8 text-center text-sm text-forest-800/60 shadow-sm">
            No drafts yet. Use a template or write your own on the left to get started.
          </div>
        )}
        {posts.map((p) => (
          <div key={p.id} className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-forest-950">{p.title}</p>
                <p className="text-xs text-forest-800/50">
                  {platformLabel[p.platform]} · {categoryLabel[p.category] ?? "General Update"} ·{" "}
                  {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <select
                  value={p.status}
                  onChange={(e) => handleStatusChange(p.id, e.target.value as SocialPost["status"])}
                  className="rounded-md border border-forest-900/15 bg-cream-100 px-2 py-1.5 text-xs focus:border-gold-500 focus:outline-none"
                >
                  <option value="draft">{statusLabel.draft}</option>
                  <option value="scheduled">{statusLabel.scheduled}</option>
                  <option value="posted">{statusLabel.posted}</option>
                </select>
                {(p.platform === "facebook" || p.platform === "instagram") && p.status !== "posted" && (
                  <button
                    onClick={() => handlePublish(p.id)}
                    disabled={publishingId === p.id}
                    className="flex items-center gap-1 rounded-md bg-gold-500 px-2.5 py-1.5 text-xs font-semibold text-forest-950 hover:bg-gold-400 disabled:opacity-60"
                  >
                    {publishingId === p.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                    Publish Now
                  </button>
                )}
                <button
                  onClick={() => copyContent(p)}
                  className="flex items-center gap-1 rounded-md border border-forest-900/15 px-2.5 py-1.5 text-xs text-forest-800/70 hover:border-gold-500"
                >
                  {copiedId === p.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedId === p.id ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="rounded-md border border-forest-900/15 px-2.5 py-1.5 text-xs text-red-600 hover:border-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-forest-800/80">{p.content}</p>
            {publishError?.id === p.id && (
              <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">{publishError.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
