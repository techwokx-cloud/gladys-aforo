import type { SocialPost, PublishingSettings } from "@/lib/store";

type PublishResult = { ok: true; externalId?: string } | { ok: false; error: string };

/**
 * Publishes immediately via Buffer's GraphQL API.
 * https://developers.buffer.com
 */
async function publishToBuffer(apiKey: string, channelId: string, text: string): Promise<PublishResult> {
  const query = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess { post { id } }
        ... on MutationError { message }
      }
    }
  `;
  const variables = {
    input: {
      text,
      channelId,
      schedulingType: "automatic",
      mode: "addToQueue",
    },
  };

  let res: Response;
  try {
    res = await fetch("https://api.buffer.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(15000),
    });
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error contacting Buffer." };
  }

  const data = await res.json().catch(() => null);
  if (!res.ok || !data) {
    return { ok: false, error: `Buffer returned an unexpected response (HTTP ${res.status}).` };
  }
  if (data.errors?.length) {
    return { ok: false, error: data.errors[0]?.message ?? "Buffer API error." };
  }
  const payload = data.data?.createPost;
  if (payload?.message) {
    return { ok: false, error: payload.message };
  }
  if (payload?.post?.id) {
    return { ok: true, externalId: payload.post.id };
  }
  return { ok: false, error: "Buffer did not confirm the post was created." };
}

/**
 * Publishes immediately via a self-hosted or cloud Postiz instance's Public API.
 * https://docs.postiz.com/public-api
 */
async function publishToPostiz(
  baseUrl: string,
  apiKey: string,
  integrationId: string,
  platform: "facebook" | "instagram",
  text: string
): Promise<PublishResult> {
  const url = `${baseUrl.replace(/\/$/, "")}/public/v1/posts`;
  const body = {
    type: "now",
    date: new Date().toISOString(),
    shortLink: false,
    tags: [],
    posts: [
      {
        integration: { id: integrationId },
        value: [{ content: text, image: [] }],
        settings:
          platform === "instagram"
            ? { __type: "instagram", post_type: "post" }
            : { __type: "facebook" },
      },
    ],
  };

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error contacting Postiz." };
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.message || data?.error || `Postiz returned HTTP ${res.status}.`;
    return { ok: false, error: typeof message === "string" ? message : JSON.stringify(message) };
  }
  return { ok: true, externalId: data?.id ?? data?.posts?.[0]?.id };
}

/**
 * Publishes a saved social post using whichever provider is configured for its platform.
 */
export async function publishSocialPost(
  post: SocialPost,
  settings: PublishingSettings
): Promise<PublishResult> {
  if (post.platform !== "facebook" && post.platform !== "instagram") {
    return {
      ok: false,
      error: "Only Facebook and Instagram posts can be auto-published right now. WhatsApp and general posts stay as drafts.",
    };
  }

  const provider = post.platform === "facebook" ? settings.facebookProvider : settings.instagramProvider;
  const text = post.content;

  if (provider === "buffer") {
    const channelId =
      post.platform === "facebook" ? settings.bufferFacebookChannelId : settings.bufferInstagramChannelId;
    if (!settings.bufferApiKey || !channelId) {
      return { ok: false, error: `Buffer isn't fully configured for ${post.platform} yet. Check Settings.` };
    }
    return publishToBuffer(settings.bufferApiKey, channelId, text);
  }

  if (provider === "postiz") {
    const integrationId =
      post.platform === "facebook" ? settings.postizFacebookIntegrationId : settings.postizInstagramIntegrationId;
    if (!settings.postizBaseUrl || !settings.postizApiKey || !integrationId) {
      return { ok: false, error: `Postiz isn't fully configured for ${post.platform} yet. Check Settings.` };
    }
    return publishToPostiz(settings.postizBaseUrl, settings.postizApiKey, integrationId, post.platform, text);
  }

  return { ok: false, error: `No publishing provider is set for ${post.platform} yet. Set one in Settings.` };
}
