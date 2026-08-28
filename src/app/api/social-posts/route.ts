import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { listSocialPosts, saveSocialPost, deleteSocialPost } from "@/lib/store";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ posts: listSocialPosts() });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, platform, status, scheduledFor } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }

  const post = saveSocialPost({
    id: randomUUID(),
    title,
    content,
    platform: platform ?? "general",
    status: status ?? "draft",
    scheduledFor,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, post });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  deleteSocialPost(id);
  return NextResponse.json({ ok: true });
}
