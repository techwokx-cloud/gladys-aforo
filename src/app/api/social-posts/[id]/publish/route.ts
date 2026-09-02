import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { listSocialPosts, updateSocialPost, getPublishingSettings } from "@/lib/store";
import { publishSocialPost } from "@/lib/social-publish";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const posts = await listSocialPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  const settings = await getPublishingSettings();
  const result = await publishSocialPost(post, settings);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const updated = await updateSocialPost(id, { status: "posted" });
  return NextResponse.json({ ok: true, post: updated });
}
