import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { getPublishingSettings, savePublishingSettings } from "@/lib/store";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await getPublishingSettings();
  return NextResponse.json({
    settings: {
      ...settings,
      bufferApiKey: settings.bufferApiKey ? "••••••••" : "",
      postizApiKey: settings.postizApiKey ? "••••••••" : "",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const current = await getPublishingSettings();

  const settings = {
    bufferApiKey: body.bufferApiKey && body.bufferApiKey !== "••••••••" ? body.bufferApiKey : current.bufferApiKey,
    bufferFacebookChannelId: body.bufferFacebookChannelId ?? current.bufferFacebookChannelId,
    bufferInstagramChannelId: body.bufferInstagramChannelId ?? current.bufferInstagramChannelId,
    postizBaseUrl: body.postizBaseUrl ?? current.postizBaseUrl,
    postizApiKey: body.postizApiKey && body.postizApiKey !== "••••••••" ? body.postizApiKey : current.postizApiKey,
    postizFacebookIntegrationId: body.postizFacebookIntegrationId ?? current.postizFacebookIntegrationId,
    postizInstagramIntegrationId: body.postizInstagramIntegrationId ?? current.postizInstagramIntegrationId,
    facebookProvider: body.facebookProvider ?? current.facebookProvider,
    instagramProvider: body.instagramProvider ?? current.instagramProvider,
  };

  await savePublishingSettings(settings);
  return NextResponse.json({ ok: true });
}
