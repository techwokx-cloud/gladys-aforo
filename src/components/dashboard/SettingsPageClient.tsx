"use client";

import { useState } from "react";
import SettingsForm from "@/components/dashboard/SettingsForm";
import WhatsAppSettingsForm from "@/components/dashboard/WhatsAppSettingsForm";
import type { SmtpSettings, WhatsAppSettings } from "@/lib/store";

export default function SettingsPageClient({
  smtpSettings,
  whatsAppSettings,
}: {
  smtpSettings: SmtpSettings;
  whatsAppSettings: WhatsAppSettings;
}) {
  const [tab, setTab] = useState<"email" | "whatsapp">("email");

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Settings</h1>
      <p className="mt-1 max-w-2xl text-sm text-forest-800/60">
        Configure email notifications and WhatsApp chat alerts.
      </p>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setTab("email")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "email" ? "bg-forest-900 text-white" : "border border-forest-900/15 text-forest-800"
          }`}
        >
          Email (SMTP)
        </button>
        <button
          onClick={() => setTab("whatsapp")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "whatsapp" ? "bg-forest-900 text-white" : "border border-forest-900/15 text-forest-800"
          }`}
        >
          WhatsApp Notifications
        </button>
      </div>

      {tab === "email" ? (
        <SettingsForm initialSettings={smtpSettings} />
      ) : (
        <WhatsAppSettingsForm initialSettings={whatsAppSettings} />
      )}
    </div>
  );
}
