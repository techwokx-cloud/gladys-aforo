import { listTeam } from "@/lib/store";
import TeamManager from "@/components/dashboard/TeamManager";

export const metadata = { title: "Team | Dashboard" };
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const team = await listTeam();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Board & Staff</h1>
      <p className="mt-1 max-w-2xl text-sm text-forest-800/60">
        Manage the names, titles, photos, and bios shown on the public Leadership page.
      </p>
      <TeamManager initialTeam={team} />
    </div>
  );
}
