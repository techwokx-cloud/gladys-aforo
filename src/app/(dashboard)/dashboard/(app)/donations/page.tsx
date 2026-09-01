import { listDonations } from "@/lib/store";
import StatusPill from "@/components/dashboard/StatusPill";

export const metadata = { title: "Donations | Dashboard" };
export const dynamic = "force-dynamic";

export default async function DonationsPage() {
  const donations = await listDonations();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Donations</h1>
      <p className="mt-1 text-sm text-forest-800/60">
        Every donation attempt made through the Donate page, most recent first.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-forest-900/10 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-forest-900/10 bg-cream-200 text-xs uppercase tracking-wide text-forest-800/60">
            <tr>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Interval</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/5">
            {donations.map((d) => (
              <tr key={d.id}>
                <td className="px-4 py-3 font-medium text-forest-950">
                  {d.firstName} {d.lastName}
                </td>
                <td className="px-4 py-3 text-forest-800/70">
                  <div>{d.email}</div>
                  <div className="text-xs text-forest-800/50">{d.phone}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-forest-950">
                  {d.currency} {d.amount}
                </td>
                <td className="px-4 py-3 capitalize text-forest-800/70">{d.interval}</td>
                <td className="px-4 py-3">
                  <StatusPill status={d.status} />
                </td>
                <td className="px-4 py-3 text-xs text-forest-800/50">
                  {new Date(d.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-xs text-forest-800/40">{d.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {donations.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-forest-800/60">
            No donations recorded yet.
          </p>
        )}
      </div>
    </div>
  );
}
