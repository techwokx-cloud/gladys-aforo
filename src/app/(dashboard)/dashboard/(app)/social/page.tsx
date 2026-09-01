import { listSocialPosts } from "@/lib/store";
import SocialPageClient from "@/components/dashboard/SocialPageClient";

export const metadata = { title: "Social & Outreach | Dashboard" };
export const dynamic = "force-dynamic";

export default async function SocialPage() {
  const posts = await listSocialPosts();
  return <SocialPageClient posts={posts} />;
}
