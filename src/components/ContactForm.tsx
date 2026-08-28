"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-6 flex flex-col items-center gap-2 rounded-lg border border-gold-500/30 bg-cream-200 px-6 py-10 text-center">
        <CheckCircle2 className="h-8 w-8 text-forest-700" />
        <p className="font-display text-lg font-semibold text-forest-950">Message sent</p>
        <p className="text-sm text-forest-800/80">
          Thank you for reaching out — our team will respond to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-forest-900/10 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-forest-950">Name</label>
          <input
            required
            name="name"
            type="text"
            placeholder="Your name"
            className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm placeholder:text-forest-800/40 focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-forest-950">Email address</label>
          <input
            required
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm placeholder:text-forest-800/40 focus:border-gold-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-forest-950">Subject</label>
        <input
          name="subject"
          type="text"
          placeholder="How can we help?"
          className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm placeholder:text-forest-800/40 focus:border-gold-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-forest-950">Message</label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Write your message..."
          className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm placeholder:text-forest-800/40 focus:border-gold-500 focus:outline-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800 disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Send Message
      </button>
    </form>
  );
}
