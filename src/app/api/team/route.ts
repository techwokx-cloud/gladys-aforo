import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { listTeam, saveTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/store";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ team: await listTeam() });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { type, name, role, description, photo, order } = await req.json();
  if (!type || !name || !role) {
    return NextResponse.json({ error: "Type, name, and role are required." }, { status: 400 });
  }

  const existing = await listTeam();
  const member = await saveTeamMember({
    id: randomUUID(),
    type,
    name,
    role,
    description,
    photo,
    order: order ?? existing.length,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, member });
}

export async function PUT(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const member = await updateTeamMember(id, updates);
  if (!member) return NextResponse.json({ error: "Member not found." }, { status: 404 });

  return NextResponse.json({ ok: true, member });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  await deleteTeamMember(id);
  return NextResponse.json({ ok: true });
}
