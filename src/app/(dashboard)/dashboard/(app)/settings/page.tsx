import { getSmtpSettings, getWhatsAppSettings } from "@/lib/store";
import SettingsPageClient from "@/components/dashboard/SettingsPageClient";

export const metadata = { title: "Settings | Dashboard" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const smtpSettings = await getSmtpSettings();
  const whatsAppSettings = await getWhatsAppSettings();

  const maskedSmtp = { ...smtpSettings, pass: smtpSettings.pass ? "••••••••" : "" };
  const maskedWhatsApp = { ...whatsAppSettings, accessToken: whatsAppSettings.accessToken ? "••••••••" : "" };

  return <SettingsPageClient smtpSettings={maskedSmtp} whatsAppSettings={maskedWhatsApp} />;
}
