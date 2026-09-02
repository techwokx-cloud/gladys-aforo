import { getSmtpSettings, getPublishingSettings } from "@/lib/store";
import SettingsPageClient from "@/components/dashboard/SettingsPageClient";

export const metadata = { title: "Settings | Dashboard" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const smtpSettings = await getSmtpSettings();
  const publishingSettings = await getPublishingSettings();

  const maskedSmtp = { ...smtpSettings, pass: smtpSettings.pass ? "••••••••" : "" };
  const maskedPublishing = {
    ...publishingSettings,
    bufferApiKey: publishingSettings.bufferApiKey ? "••••••••" : "",
    postizApiKey: publishingSettings.postizApiKey ? "••••••••" : "",
  };

  return <SettingsPageClient smtpSettings={maskedSmtp} publishingSettings={maskedPublishing} />;
}
