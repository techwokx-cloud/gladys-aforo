import { listSupportRequests } from "@/lib/store";
import RequestsTable from "@/components/dashboard/RequestsTable";

export const metadata = { title: "Support Requests | Dashboard" };
export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const requests = await listSupportRequests();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Support Requests</h1>
      <p className="mt-1 text-sm text-forest-800/60">
        Requests submitted by nurses and caregivers on behalf of families in need.
      </p>
      <RequestsTable initialRequests={requests} />
    </div>
  );
}
