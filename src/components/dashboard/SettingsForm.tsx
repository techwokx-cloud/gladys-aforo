"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import type { SmtpSettings } from "@/lib/store";

export default function SettingsForm({ initialSettings }: { initialSettings: SmtpSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "SMTP settings saved." });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Failed to save settings." });
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    setTesting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings/test-email", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Test email sent — check your inbox." });
      } else {
        setMessage({ type: "error", text: data.error ?? "Failed to send test email." });
      }
    } finally {
      setTesting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="mt-6 max-w-lg space-y-4 rounded-xl border border-forest-900/10 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1 block text-xs font-medium text-forest-800/70">SMTP Host</label>
        <input
          value={settings.host}
          onChange={(e) => setSettings({ ...settings, host: e.target.value })}
          placeholder="smtp.gmail.com"
          className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-forest-800/70">Port</label>
          <input
            type="number"
            value={settings.port}
            onChange={(e) => setSettings({ ...settings, port: Number(e.target.value) })}
            className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm text-forest-800">
            <input
              type="checkbox"
              checked={settings.secure}
              onChange={(e) => setSettings({ ...settings, secure: e.target.checked })}
            />
            Use SSL (usually port 465)
          </label>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-forest-800/70">SMTP Username / Email</label>
        <input
          value={settings.user}
          onChange={(e) => setSettings({ ...settings, user: e.target.value })}
          placeholder="you@gmail.com"
          className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-forest-800/70">SMTP Password / App Password</label>
        <input
          type="password"
          value={settings.pass}
          onChange={(e) => setSettings({ ...settings, pass: e.target.value })}
          placeholder="••••••••"
          className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-forest-800/70">
          Send notifications to
        </label>
        <input
          value={settings.to}
          onChange={(e) => setSettings({ ...settings, to: e.target.value })}
          placeholder="team@gladysaforofoundation.org"
          className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
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
          Send Test Email
        </button>
      </div>
    </form>
  );
}
