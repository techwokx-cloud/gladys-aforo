import { listSocialPosts } from "@/lib/store";
import SocialComposer from "@/components/dashboard/SocialComposer";

export const metadata = { title: "Social & Outreach | Dashboard" };
export const dynamic = "force-dynamic";

export default function SocialPage() {
  const posts = listSocialPosts();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Social & Outreach Planner</h1>
      <p className="mt-1 max-w-2xl text-sm text-forest-800/60">
        Draft and schedule posts for donation drives, outreach programs, and updates. Posts are
        organized here for your team to copy and publish on Facebook, Instagram, and WhatsApp.
      </p>
      <div className="mt-3 rounded-md border border-gold-500/30 bg-cream-200 px-4 py-3 text-xs text-forest-800/70">
        This planner doesn&apos;t publish to social platforms automatically yet — that requires
        connecting Meta&apos;s Graph API (Facebook/Instagram) and a WhatsApp Business API key. Ask
        for that setup whenever you&apos;re ready to go from planning to one-click publishing.
      </div>
      <SocialComposer initialPosts={posts} />
    </div>
  );
}
