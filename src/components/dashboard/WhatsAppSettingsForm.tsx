"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import type { WhatsAppSettings } from "@/lib/store";

export default function WhatsAppSettingsForm({ initialSettings }: { initialSettings: WhatsAppSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/whatsapp-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "WhatsApp settings saved." });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Failed to save." });
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    setTesting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/whatsapp-settings/test", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        const failures = (data.results ?? []).filter((r: any) => !r.ok);
        if (failures.length === 0) {
          setMessage({ type: "success", text: "Test message sent to all configured numbers." });
        } else {
          setMessage({
            type: "error",
            text: `Some numbers failed: ${failures.map((f: any) => `${f.to} (${f.error})`).join("; ")}`,
          });
        }
      } else {
        setMessage({ type: "error", text: data.error ?? "Failed to send test." });
      }
    } finally {
      setTesting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="mt-6 max-w-xl space-y-4 rounded-xl border border-forest-900/10 bg-white p-6 shadow-sm">
      <p className="text-xs text-forest-800/60">
        Sends a WhatsApp notification to your team whenever a new visitor starts a conversation in
        the website chat widget. Requires a Meta WhatsApp Business Cloud API phone number and an
        approved message template — see{" "}
        <a href="https://developers.facebook.com/docs/whatsapp/cloud-api" target="_blank" className="underline">
          developers.facebook.com/docs/whatsapp
        </a>
        .
      </p>

      <div>
        <label className="mb-1 block text-xs font-medium text-forest-800/70">Phone Number ID</label>
        <input
          value={settings.phoneNumberId}
          onChange={(e) => setSettings({ ...settings, phoneNumberId: e.target.value })}
          placeholder="From Meta's WhatsApp Manager"
          className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-forest-800/70">Access Token</label>
        <input
          type="password"
          value={settings.accessToken}
          onChange={(e) => setSettings({ ...settings, accessToken: e.target.value })}
          placeholder="Permanent System User token"
          className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-forest-800/70">Template Name</label>
        <input
          value={settings.templateName}
          onChange={(e) => setSettings({ ...settings, templateName: e.target.value })}
          placeholder="website_chat_notification"
          className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-forest-800/70">
          Recipient numbers (up to 5, with country code, e.g. +233555296706)
        </p>
        <div className="space-y-2">
          {([1, 2, 3, 4, 5] as const).map((n) => {
            const key = `recipient${n}` as keyof WhatsAppSettings;
            return (
              <input
                key={n}
                value={settings[key]}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                placeholder={`Recipient ${n}`}
                className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
              />
            );
          })}
        </div>
      </div>

      {message && (
        <div
          className={`flex items-start gap-2 rounded-md px-3 py-2.5 text-sm ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-forest-900 py-2.5 text-sm font-semibold text-white hover:bg-forest-800 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Settings
        </button>
        <button
          type="button"
          onClick={handleTest}
          disabled={testing}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gold-500/50 py-2.5 text-sm font-semibold text-gold-700 hover:bg-gold-500/10 disabled:opacity-60"
        >
          {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send Test Notification
        </button>
      </div>
    </form>
  );
}
