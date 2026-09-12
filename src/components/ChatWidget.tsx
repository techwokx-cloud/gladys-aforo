"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING = "Hi! 👋 Have a question, or need to talk to someone about support? Ask me anything.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Draw attention to the widget a few seconds after page load, if the
  // visitor hasn't already opened it.
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function openWidget() {
    setOpen(true);
    setShowBubble(false);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId }),
      });
      const data = await res.json();
      if (res.ok) {
        setConversationId(data.conversationId);
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3">
      {!open && showBubble && (
        <div className="relative max-w-[240px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm text-forest-900 shadow-xl ring-1 ring-black/5 animate-[fade-in_0.3s_ease-out]">
          <button
            onClick={() => setShowBubble(false)}
            aria-label="Dismiss"
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-forest-900 text-white"
          >
            <X className="h-3 w-3" />
          </button>
          {GREETING}
        </div>
      )}

      {open && (
        <div className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          <div className="flex items-center justify-between bg-forest-950 px-4 py-3.5">
            <div>
              <p className="font-display text-sm font-semibold text-white">Gladys Aforo Pedei Newman Foundation</p>
              <p className="text-xs text-gold-400">Usually replies in a few minutes</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/70 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-cream-100 p-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={`inline-block max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-gold-500 text-forest-950"
                      : "rounded-bl-sm bg-white text-forest-900 shadow-sm"
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
            {loading && <p className="text-xs text-forest-800/50">Typing…</p>}
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>

          <div className="flex items-center gap-2 border-t border-forest-900/10 bg-white p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-cream-100 px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-gold-500"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-forest-950 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={openWidget}
          aria-label="Open chat"
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-forest-950 shadow-xl transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-gold-500 opacity-50" />
          <MessageCircle className="relative h-7 w-7" />
        </button>
      )}
    </div>
  );
}
