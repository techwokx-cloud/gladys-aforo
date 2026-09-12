import type { WhatsAppSettings } from "@/lib/store";

const GRAPH_API_VERSION = "v21.0";

type SendResult = { to: string; ok: boolean; error?: string };

/**
 * Sends a WhatsApp template message notification to every configured
 * recipient number. Uses a template (not free-form text) because these are
 * business-initiated notifications, not replies within a customer's 24-hour
 * service window — Meta requires an approved template for that.
 *
 * Create the template once in Meta Business Manager (WhatsApp Manager ->
 * Message Templates), e.g. named "website_chat_notification" with a body
 * like: "New message on the website chat from {{1}}: {{2}}"
 */
export async function sendWhatsAppNotification(
  settings: WhatsAppSettings,
  templateParams: string[]
): Promise<SendResult[]> {
  const recipients = [
    settings.recipient1,
    settings.recipient2,
    settings.recipient3,
    settings.recipient4,
    settings.recipient5,
  ].filter((n): n is string => Boolean(n && n.trim()));

  if (!settings.phoneNumberId || !settings.accessToken || recipients.length === 0) {
    return [{ to: "none", ok: false, error: "WhatsApp notifications are not fully configured." }];
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${settings.phoneNumberId}/messages`;

  const results = await Promise.all(
    recipients.map(async (to): Promise<SendResult> => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${settings.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to,
            type: "template",
            template: {
              name: settings.templateName || "website_chat_notification",
              language: { code: "en_US" },
              components: [
                {
                  type: "body",
                  parameters: templateParams.map((text) => ({ type: "text", text })),
                },
              ],
            },
          }),
          signal: AbortSignal.timeout(10000),
        });

        if (!res.ok) {
          const body = await res.text().catch(() => "");
          return { to, ok: false, error: `HTTP ${res.status}: ${body.slice(0, 300)}` };
        }
        return { to, ok: true };
      } catch (err) {
        return { to, ok: false, error: err instanceof Error ? err.message : "Network error" };
      }
    })
  );

  return results;
}
