import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { listGalleryImages, saveGalleryImage, deleteGalleryImage } from "@/lib/store";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ images: await listGalleryImages() });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { src, alt } = await req.json();
  if (!src) return NextResponse.json({ error: "src is required" }, { status: 400 });

  const existing = await listGalleryImages();
  const image = await saveGalleryImage({
    id: randomUUID(),
    src,
    alt: alt || "Gladys Aforo Foundation outreach photo",
    order: existing.length,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, image });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  await deleteGalleryImage(id);
  return NextResponse.json({ ok: true });
}
