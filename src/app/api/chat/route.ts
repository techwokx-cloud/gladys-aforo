import { NextRequest, NextResponse } from "next/server";
import { chatReply } from "@/lib/ai-chat";
import { createConversation, addChatMessage, getConversationMessages, countMessagesInConversation, getWhatsAppSettings } from "@/lib/store";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

// Basic per-IP rate limit. Resets on restart and isn't shared across
// multiple server instances — fine for blunting casual abuse on a small
// site, not a real defense against a determined attacker.
const recentMessages = new Map<string, number>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

function isRateLimited(ip: string): boolean {
  const count = recentMessages.get(ip) ?? 0;
  if (count >= MAX_PER_WINDOW) return true;
  recentMessages.set(ip, count + 1);
  setTimeout(() => recentMessages.delete(ip), WINDOW_MS);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please wait a moment." }, { status: 429 });
  }

  const { message, conversationId } = await req.json();
  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const isNewConversation = !conversationId;
  const conversation = isNewConversation ? await createConversation() : { id: conversationId };

  await addChatMessage(conversation.id, "user", message);
  const history = await getConversationMessages(conversation.id);

  let reply: string;
  try {
    reply = await chatReply(history.map((m) => ({ role: m.role, content: m.content })));
  } catch (err) {
    const msg = err instanceof Error ? err.message : "AI error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  await addChatMessage(conversation.id, "assistant", reply);

  // Notify admins by WhatsApp when a new visitor starts chatting — not on
  // every follow-up message, so this doesn't spam for a normal back-and-forth.
  if (isNewConversation) {
    getWhatsAppSettings()
      .then((settings) => sendWhatsAppNotification(settings, [message.slice(0, 200)]))
      .catch((err) => console.error("WhatsApp notification failed:", err));
  }

  const messageCount = await countMessagesInConversation(conversation.id);

  return NextResponse.json({
    ok: true,
    conversationId: conversation.id,
    reply,
    messageCount,
  });
}
