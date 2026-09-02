import Link from "next/link";
import { HandCoins, Users, MessageSquare, TrendingUp, ArrowRight, ClipboardList } from "lucide-react";
import { listDonations, listMessages, listSupportRequests } from "@/lib/store";
import StatusPill from "@/components/dashboard/StatusPill";

export const metadata = { title: "Dashboard | Gladys Aforo Foundation" };
export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  const donations = await listDonations();
  const messages = await listMessages();
  const requests = await listSupportRequests();

  const successful = donations.filter((d) => d.status === "success");
  const totalRaised = successful.reduce((sum, d) => sum + d.amount, 0);
  const successRate = donations.length ? Math.round((successful.length / donations.length) * 100) : 0;
  const newRequests = requests.filter((r) => r.status === "new").length;

  const cards = [
    {
      label: "Total Raised",
      value: `GHS ${totalRaised.toLocaleString()}`,
      icon: HandCoins,
    },
    { label: "Total Donors", value: donations.length, icon: Users },
    { label: "Success Rate", value: `${successRate}%`, icon: TrendingUp },
    { label: "New Messages", value: messages.length, icon: MessageSquare },
    { label: "Open Support Requests", value: newRequests, icon: ClipboardList },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Overview</h1>
      <p className="mt-1 text-sm text-forest-800/60">
        A snapshot of donations and inquiries coming through the website.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-forest-900">
                <Icon className="h-5 w-5 text-gold-400" />
              </div>
              <p className="font-display text-2xl font-semibold text-forest-950">{c.value}</p>
              <p className="text-xs text-forest-800/60">{c.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-forest-950">Recent Donations</h2>
            <Link href="/dashboard/donations" className="flex items-center gap-1 text-xs font-medium text-gold-700">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {donations.length === 0 ? (
            <p className="text-sm text-forest-800/60">
              No donations yet. New gifts made through the Donate page will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-forest-900/5 text-sm">
              {donations.slice(0, 6).map((d) => (
                <li key={d.id} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="font-medium text-forest-950">
                      {d.firstName} {d.lastName}
                    </p>
                    <p className="text-xs text-forest-800/50">{new Date(d.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-forest-950">GHS {d.amount}</p>
                    <StatusPill status={d.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-forest-950">Recent Messages</h2>
            <Link href="/dashboard/messages" className="flex items-center gap-1 text-xs font-medium text-gold-700">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {messages.length === 0 ? (
            <p className="text-sm text-forest-800/60">
              No messages yet. Submissions from the Contact page will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-forest-900/5 text-sm">
              {messages.slice(0, 6).map((m) => (
                <li key={m.id} className="py-2.5">
                  <p className="font-medium text-forest-950">{m.name}</p>
                  <p className="text-xs text-forest-800/50">{m.email}</p>
                  <p className="mt-1 line-clamp-1 text-forest-800/70">{m.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

