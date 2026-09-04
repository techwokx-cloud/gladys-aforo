import { getSmtpSettings } from "@/lib/store";
import SettingsForm from "@/components/dashboard/SettingsForm";

export const metadata = { title: "Settings | Dashboard" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSmtpSettings();
  const masked = { ...settings, pass: settings.pass ? "••••••••" : "" };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Settings</h1>
      <p className="mt-1 max-w-2xl text-sm text-forest-800/60">
        Configure the email account used to send contact form notifications, donation receipts,
        and support request alerts.
      </p>
      <SettingsForm initialSettings={masked} />
    </div>
  );
}
