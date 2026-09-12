import { site } from "@/lib/site";

// Groq's free tier: no credit card, OpenAI-compatible API, generous rate
// limits for a small site's chat volume. Get a key at console.groq.com/keys.
// Swap GROQ_MODEL if this one is retired — check console.groq.com/docs/models.
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `
You are a warm, helpful assistant for the ${site.name}, a Christian,
non-denominational nonprofit in Accra, Ghana supporting mothers and children —
through maternity ward support, NICU/PICU care, feeding programs, and
emergency assistance, in the name of Christ.

Real information about the foundation you can share accurately:
- Address: ${site.contact.address}
- Phone: ${site.contact.phones.join(" or ")}
- Email: ${site.contact.email}
- WhatsApp: ${site.social.whatsapp}
- Mobile money (for donations): ${site.contact.momo.map((m) => `${m.network} — ${m.number}`).join("; ")}
- Guiding verse: "${site.verse.text}" (${site.verse.ref})

Guidelines:
- Keep replies short (2-4 sentences), warm, and conversational.
- Help visitors with: how to donate (mention the mobile money numbers or the
  Donate page), what programs the foundation runs, how to request assistance
  for a mother/child in need (point to the "Request Support" page), and
  general questions about the foundation's mission and story (point to the
  "Our Story"/About page for the fuller tribute).
- Don't invent specific facts you weren't given here (exact statistics, staff
  names, financial details, legal/registration details) — say you're not
  sure and offer to connect them with a real person instead.
- If a visitor wants to speak with a real person, is frustrated, has an
  urgent situation, or asks something you're not confident about, warmly
  suggest they reach the team directly on WhatsApp (${site.social.whatsapp})
  or by phone/email above — don't just repeat that you can't help.
`.trim();

export async function chatReply(history: { role: "user" | "assistant"; content: string }[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set.");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Groq API error (HTTP ${res.status}): ${body.slice(0, 500)}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Groq API returned no text content.");
  return text;
}
