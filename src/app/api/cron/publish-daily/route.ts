import { NextRequest, NextResponse } from "next/server";
import { listSocialPosts, updateSocialPost, getPublishingSettings } from "@/lib/store";
import { publishSocialPost } from "@/lib/social-publish";
import type { SocialPost } from "@/lib/store";

/**
 * Meant to be called once a day by a scheduled job (e.g. a Render Cron Job)
 * hitting this URL with `Authorization: Bearer <CRON_SECRET>`.
 *
 * Picks the oldest not-yet-posted draft for each auto-publishable platform
 * (Facebook, Instagram) and publishes it, so a steady queue of drafts turns
 * into "at least one post a day" without anyone clicking a button.
 */
function isAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // never run unprotected
  const header = req.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

const AUTO_PLATFORMS: SocialPost["platform"][] = ["facebook", "instagram"];

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await listSocialPosts();
  const settings = await getPublishingSettings();
  const results: { platform: string; postId?: string; status: string; error?: string }[] = [];

  for (const platform of AUTO_PLATFORMS) {
    // Oldest unposted draft/scheduled post for this platform, so posts go out
    // in the order they were written (a simple, predictable queue).
    const candidate = posts
      .filter((p) => p.platform === platform && p.status !== "posted")
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())[0];

    if (!candidate) {
      results.push({ platform, status: "skipped_no_draft" });
      continue;
    }

    const result = await publishSocialPost(candidate, settings);
    if (result.ok) {
      await updateSocialPost(candidate.id, { status: "posted" });
      results.push({ platform, postId: candidate.id, status: "posted" });
    } else {
      results.push({ platform, postId: candidate.id, status: "failed", error: result.error });
    }
  }

  return NextResponse.json({ ok: true, results, ranAt: new Date().toISOString() });
}
