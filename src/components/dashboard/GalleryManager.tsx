"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import { Trash2, Loader2 } from "lucide-react";
import type { GalleryImage, MemorialPhoto } from "@/lib/store";
import ImageUploader from "./ImageUploader";

export default function GalleryManager({
  initialGallery,
  initialMemorialPhotos,
}: {
  initialGallery: GalleryImage[];
  initialMemorialPhotos: MemorialPhoto[];
}) {
  const [tab, setTab] = useState<"gallery" | "hero">("gallery");
  const [gallery, setGallery] = useState(initialGallery);
  const [memorial, setMemorial] = useState(initialMemorialPhotos);
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [saving, setSaving] = useState(false);

  const isGallery = tab === "gallery";
  const endpoint = isGallery ? "/api/gallery" : "/api/memorial-photos";
  const items = isGallery ? gallery : memorial;

  async function handleAdd() {
    if (!newUrl) return;
    setSaving(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: newUrl, alt: newAlt }),
      });
      const data = await res.json();
      if (res.ok) {
        if (isGallery) setGallery((prev) => [...prev, data.image]);
        else setMemorial((prev) => [...prev, data.photo]);
        setNewUrl("");
        setNewAlt("");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (isGallery) setGallery((prev) => prev.filter((i) => i.id !== id));
    else setMemorial((prev) => prev.filter((i) => i.id !== id));
    await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <button
          onClick={() => setTab("gallery")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            isGallery ? "bg-forest-900 text-white" : "border border-forest-900/15 text-forest-800"
          }`}
        >
          Site Gallery ({gallery.length})
        </button>
        <button
          onClick={() => setTab("hero")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            !isGallery ? "bg-forest-900 text-white" : "border border-forest-900/15 text-forest-800"
          }`}
        >
          Homepage Hero Photos ({memorial.length})
        </button>
      </div>

      <p className="mt-3 max-w-xl text-xs text-forest-800/60">
        {isGallery
          ? "These photos appear on the public Gallery page."
          : "These photos fade in and out behind the homepage headline. Add as many as you like."}
      </p>

      <div className="mt-4 rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-forest-950">Add a photo</p>
        <div className="flex flex-wrap items-end gap-4">
          <ImageUploader folder={isGallery ? "gallery" : "memorial"} value={newUrl} onChange={setNewUrl} label="Upload" />
          <input
            placeholder="Description (for accessibility)"
            value={newAlt}
            onChange={(e) => setNewAlt(e.target.value)}
            className="min-w-[220px] flex-1 rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            disabled={!newUrl || saving}
            className="flex items-center gap-2 rounded-md bg-forest-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-800 disabled:opacity-50"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Add Photo
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.length === 0 && (
          <p className="text-sm text-forest-800/50">No photos yet — add one above.</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-lg border border-forest-900/10 bg-white shadow-sm">
            <div className="relative aspect-square w-full">
              <SafeImage src={item.src} alt={item.alt} fill className="object-cover" />
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute right-2 top-2 rounded-md bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
