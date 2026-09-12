const API_URL = "https://api.anthropic.com/v1/messages";
// Check https://docs.claude.com/en/docs/about-claude/models/overview for current model IDs.
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";

const SYSTEM_PROMPT = `
You are a warm, helpful assistant for the Gladys Aforo Pedei Newman Foundation, a
Christian, non-denominational nonprofit in Accra, Ghana supporting mothers and
children — through maternity ward support, NICU/PICU care, feeding programs,
and emergency assistance, in the name of Christ.

Guidelines:
- Keep replies short (2-4 sentences), warm, and conversational.
- Help visitors with: how to donate, what programs the foundation runs, how
  to request assistance for a mother/child in need, and general questions
  about the foundation's mission and story.
- Don't invent specific facts you weren't given (exact statistics, staff
  names, financial details) — if unsure, say you'll have someone follow up.
- If someone wants to request assistance for a mother or child, point them
  to the "Request Support" page/form, and gently ask for their name and a
  phone number or email so the team can follow up directly.
- If asked something outside what you can help with, say so kindly and
  suggest they use the Contact page.
`.trim();

export async function chatReply(history: { role: "user" | "assistant"; content: string }[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set.");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: history,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Anthropic API error (HTTP ${res.status}): ${body.slice(0, 500)}`);
  }

  const data = await res.json();
  const text = data.content
    ?.filter((block: any) => block.type === "text")
    .map((block: any) => block.text)
    .join("\n");

  if (!text) throw new Error("Anthropic API returned no text content.");
  return text;
}
