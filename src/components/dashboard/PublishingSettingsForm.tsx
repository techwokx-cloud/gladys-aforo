"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { PublishingSettings, PublishProvider } from "@/lib/store";

const providerLabel: Record<PublishProvider, string> = {
  none: "Not connected (drafts only)",
  buffer: "Buffer",
  postiz: "Postiz",
};

export default function PublishingSettingsForm({ initialSettings }: { initialSettings: PublishingSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/publishing-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Publishing settings saved." });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Failed to save settings." });
      }
    } finally {
      setSaving(false);
    }
  }

  function PlatformBlock({
    label,
    platform,
  }: {
    label: string;
    platform: "facebook" | "instagram";
  }) {
    const providerKey = platform === "facebook" ? "facebookProvider" : "instagramProvider";
    const provider = settings[providerKey];

    return (
      <div className="rounded-lg border border-forest-900/10 bg-white p-5">
        <p className="font-semibold text-forest-950">{label}</p>
        <label className="mt-3 block">
          <span className="mb-1 block text-xs font-medium text-forest-800/70">Publish via</span>
          <select
            value={provider}
            onChange={(e) => setSettings({ ...settings, [providerKey]: e.target.value as PublishProvider })}
            className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          >
            {(["none", "buffer", "postiz"] as PublishProvider[]).map((p) => (
              <option key={p} value={p}>
                {providerLabel[p]}
              </option>
            ))}
          </select>
        </label>

        {provider === "buffer" && (
          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-medium text-forest-800/70">Buffer Channel ID</span>
            <input
              value={platform === "facebook" ? settings.bufferFacebookChannelId : settings.bufferInstagramChannelId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  [platform === "facebook" ? "bufferFacebookChannelId" : "bufferInstagramChannelId"]: e.target.value,
                })
              }
              placeholder="Found in Buffer under this channel's settings"
              className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </label>
        )}

        {provider === "postiz" && (
          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-medium text-forest-800/70">Postiz Integration ID</span>
            <input
              value={
                platform === "facebook" ? settings.postizFacebookIntegrationId : settings.postizInstagramIntegrationId
              }
              onChange={(e) =>
                setSettings({
                  ...settings,
                  [platform === "facebook" ? "postizFacebookIntegrationId" : "postizInstagramIntegrationId"]:
                    e.target.value,
                })
              }
              placeholder="From GET /public/v1/integrations in Postiz"
              className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </label>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="mt-6 max-w-2xl space-y-5">
      <div className="rounded-lg border border-forest-900/10 bg-white p-5">
        <p className="font-semibold text-forest-950">Buffer</p>
        <p className="mt-1 text-xs text-forest-800/60">
          Get a personal API key at{" "}
          <span className="font-mono">publish.buffer.com/settings/api</span>
        </p>
        <label className="mt-3 block">
          <span className="mb-1 block text-xs font-medium text-forest-800/70">Buffer API Key</span>
          <input
            type="password"
            value={settings.bufferApiKey}
            onChange={(e) => setSettings({ ...settings, bufferApiKey: e.target.value })}
            placeholder="••••••••"
            className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="rounded-lg border border-forest-900/10 bg-white p-5">
        <p className="font-semibold text-forest-950">Postiz</p>
        <p className="mt-1 text-xs text-forest-800/60">
          Your self-hosted URL (e.g. https://postiz.yourdomain.com) or https://api.postiz.com for cloud
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-forest-800/70">Postiz Base URL</span>
            <input
              value={settings.postizBaseUrl}
              onChange={(e) => setSettings({ ...settings, postizBaseUrl: e.target.value })}
              placeholder="https://api.postiz.com"
              className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-forest-800/70">Postiz API Key</span>
            <input
              type="password"
              value={settings.postizApiKey}
              onChange={(e) => setSettings({ ...settings, postizApiKey: e.target.value })}
              placeholder="••••••••"
              className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <PlatformBlock label="Facebook" platform="facebook" />
        <PlatformBlock label="Instagram" platform="instagram" />
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="flex items-center justify-center gap-2 rounded-md bg-forest-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-forest-800 disabled:opacity-60"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        Save Publishing Settings
      </button>
    </form>
  );
}
