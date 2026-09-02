import { listMessages } from "@/lib/store";
import { Mail } from "lucide-react";

export const metadata = { title: "Messages | Dashboard" };
export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await listMessages();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Messages</h1>
      <p className="mt-1 text-sm text-forest-800/60">
        Inquiries submitted through the Contact page.
      </p>

      <div className="mt-6 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-forest-950">{m.name}</p>
                <a href={`mailto:${m.email}`} className="flex items-center gap-1 text-xs text-gold-700">
                  <Mail className="h-3 w-3" /> {m.email}
                </a>
              </div>
              <p className="text-xs text-forest-800/50">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
            {m.subject && (
              <p className="mt-2 text-sm font-medium text-forest-900">Subject: {m.subject}</p>
            )}
            <p className="mt-1 text-sm text-forest-800/80">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="rounded-xl border border-forest-900/10 bg-white p-8 text-center text-sm text-forest-800/60 shadow-sm">
            No messages received yet.
          </div>
        )}
      </div>
    </div>
  );
}
