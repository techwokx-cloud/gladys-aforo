import { randomUUID } from "crypto";
import { getPool, ensureSchema } from "@/lib/db";
import { boardOfDirectors, executiveStaff, galleryImages, memorialPhotos } from "@/lib/site";

async function db() {
  await ensureSchema();
  return getPool();
}

export type Donation = {
  id: string;
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  amount: number; // in GHS
  currency: string;
  interval: "one-time" | "daily" | "weekly" | "monthly" | "annually";
  status: "pending" | "success" | "failed";
  createdAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
};

export type SupportRequest = {
  id: string;
  fullName: string;
  role: string;
  phone: string;
  email: string;
  facility: string;
  district: string;
  familyHeadName: string;
  dependents: string;
  situation: string;
  supportType: string;
  estimatedAmount: string;
  urgency: string;
  additionalInfo?: string;
  attachmentNames: string[];
  status: "new" | "reviewing" | "approved" | "declined";
  createdAt: string;
};

export type SocialPost = {
  id: string;
  title: string;
  content: string;
  platform: "facebook" | "instagram" | "whatsapp" | "general";
  category: "general" | "program" | "event";
  status: "draft" | "scheduled" | "posted";
  scheduledFor?: string;
  createdAt: string;
};

export type TeamMember = {
  id: string;
  type: "board" | "staff";
  name: string;
  role: string;
  description?: string;
  photo?: string;
  order: number;
  createdAt: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  order: number;
  createdAt: string;
};

export type MemorialPhoto = {
  id: string;
  src: string;
  alt: string;
  order: number;
  createdAt: string;
};

export type SmtpSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
};

export type PublishProvider = "none" | "buffer" | "postiz";

export type PublishingSettings = {
  bufferApiKey: string;
  bufferFacebookChannelId: string;
  bufferInstagramChannelId: string;
  postizBaseUrl: string;
  postizApiKey: string;
  postizFacebookIntegrationId: string;
  postizInstagramIntegrationId: string;
  facebookProvider: PublishProvider;
  instagramProvider: PublishProvider;
};

// ---------------------------------------------------------------------------
// Donations
// ---------------------------------------------------------------------------

function rowToDonation(r: any): Donation {
  return {
    id: r.id,
    reference: r.reference,
    firstName: r.first_name,
    lastName: r.last_name,
    email: r.email,
    phone: r.phone,
    amount: Number(r.amount),
    currency: r.currency,
    interval: r.interval,
    status: r.status,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
  };
}

export async function listDonations(): Promise<Donation[]> {
  const pool = await db();
  const { rows } = await pool.query("SELECT * FROM donations ORDER BY created_at DESC");
  return rows.map(rowToDonation);
}

export async function saveDonation(donation: Donation): Promise<Donation> {
  const pool = await db();
  await pool.query(
    `INSERT INTO donations (id, reference, first_name, last_name, email, phone, amount, currency, interval, status, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     ON CONFLICT (reference) DO UPDATE SET
       first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name, email = EXCLUDED.email,
       phone = EXCLUDED.phone, amount = EXCLUDED.amount, currency = EXCLUDED.currency,
       interval = EXCLUDED.interval, status = EXCLUDED.status`,
    [
      donation.id,
      donation.reference,
      donation.firstName,
      donation.lastName,
      donation.email,
      donation.phone,
      donation.amount,
      donation.currency,
      donation.interval,
      donation.status,
      donation.createdAt,
    ]
  );
  return donation;
}

export async function updateDonationStatus(reference: string, status: Donation["status"]) {
  const pool = await db();
  const { rows } = await pool.query(
    "UPDATE donations SET status = $2 WHERE reference = $1 RETURNING *",
    [reference, status]
  );
  return rows[0] ? rowToDonation(rows[0]) : null;
}

// ---------------------------------------------------------------------------
// Contact messages
// ---------------------------------------------------------------------------

function rowToMessage(r: any): ContactMessage {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    subject: r.subject ?? undefined,
    message: r.message,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
  };
}

export async function listMessages(): Promise<ContactMessage[]> {
  const pool = await db();
  const { rows } = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
  return rows.map(rowToMessage);
}

export async function saveMessage(msg: ContactMessage): Promise<ContactMessage> {
  const pool = await db();
  await pool.query(
    `INSERT INTO messages (id, name, email, subject, message, created_at) VALUES ($1,$2,$3,$4,$5,$6)`,
    [msg.id, msg.name, msg.email, msg.subject ?? null, msg.message, msg.createdAt]
  );
  return msg;
}

// ---------------------------------------------------------------------------
// Support requests
// ---------------------------------------------------------------------------

function rowToSupportRequest(r: any): SupportRequest {
  return {
    id: r.id,
    fullName: r.full_name,
    role: r.role,
    phone: r.phone,
    email: r.email,
    facility: r.facility,
    district: r.district,
    familyHeadName: r.family_head_name,
    dependents: r.dependents,
    situation: r.situation,
    supportType: r.support_type,
    estimatedAmount: r.estimated_amount,
    urgency: r.urgency,
    additionalInfo: r.additional_info ?? undefined,
    attachmentNames: r.attachment_names ?? [],
    status: r.status,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
  };
}

export async function listSupportRequests(): Promise<SupportRequest[]> {
  const pool = await db();
  const { rows } = await pool.query("SELECT * FROM support_requests ORDER BY created_at DESC");
  return rows.map(rowToSupportRequest);
}

export async function saveSupportRequest(req: SupportRequest): Promise<SupportRequest> {
  const pool = await db();
  await pool.query(
    `INSERT INTO support_requests
      (id, full_name, role, phone, email, facility, district, family_head_name, dependents, situation,
       support_type, estimated_amount, urgency, additional_info, attachment_names, status, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
    [
      req.id,
      req.fullName,
      req.role,
      req.phone,
      req.email,
      req.facility,
      req.district,
      req.familyHeadName,
      req.dependents,
      req.situation,
      req.supportType,
      req.estimatedAmount,
      req.urgency,
      req.additionalInfo ?? null,
      JSON.stringify(req.attachmentNames ?? []),
      req.status,
      req.createdAt,
    ]
  );
  return req;
}

export async function updateSupportRequestStatus(id: string, status: SupportRequest["status"]) {
  const pool = await db();
  const { rows } = await pool.query(
    "UPDATE support_requests SET status = $2 WHERE id = $1 RETURNING *",
    [id, status]
  );
  return rows[0] ? rowToSupportRequest(rows[0]) : null;
}

// ---------------------------------------------------------------------------
// Social posts
// ---------------------------------------------------------------------------

function rowToSocialPost(r: any): SocialPost {
  return {
    id: r.id,
    title: r.title,
    content: r.content,
    platform: r.platform,
    category: r.category ?? "general",
    status: r.status,
    scheduledFor: r.scheduled_for ?? undefined,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
  };
}

export async function listSocialPosts(): Promise<SocialPost[]> {
  const pool = await db();
  const { rows } = await pool.query("SELECT * FROM social_posts ORDER BY created_at DESC");
  return rows.map(rowToSocialPost);
}

export async function saveSocialPost(post: SocialPost): Promise<SocialPost> {
  const pool = await db();
  await pool.query(
    `INSERT INTO social_posts (id, title, content, platform, category, status, scheduled_for, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [post.id, post.title, post.content, post.platform, post.category, post.status, post.scheduledFor ?? null, post.createdAt]
  );
  return post;
}

export async function updateSocialPost(id: string, updates: Partial<SocialPost>) {
  const pool = await db();
  const current = await pool.query("SELECT * FROM social_posts WHERE id = $1", [id]);
  if (current.rows.length === 0) return null;
  const merged = { ...rowToSocialPost(current.rows[0]), ...updates };
  await pool.query(
    `UPDATE social_posts SET title=$2, content=$3, platform=$4, category=$5, status=$6, scheduled_for=$7 WHERE id=$1`,
    [id, merged.title, merged.content, merged.platform, merged.category, merged.status, merged.scheduledFor ?? null]
  );
  return merged;
}

export async function deleteSocialPost(id: string) {
  const pool = await db();
  await pool.query("DELETE FROM social_posts WHERE id = $1", [id]);
}

// ---------------------------------------------------------------------------
// Team (Board of Directors + Executive Staff)
// ---------------------------------------------------------------------------

function rowToTeamMember(r: any): TeamMember {
  return {
    id: r.id,
    type: r.type,
    name: r.name,
    role: r.role,
    description: r.description ?? undefined,
    photo: r.photo ?? undefined,
    order: r.sort_order,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
  };
}

async function seedTeamIfEmpty(pool: Awaited<ReturnType<typeof db>>) {
  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM team_members");
  if (rows[0].count > 0) return;

  const now = new Date().toISOString();
  const seedRows = [
    ...boardOfDirectors.map((m, i) => ({ type: "board", name: m.name, role: m.role, description: null as string | null, order: i })),
    ...executiveStaff.map((m, i) => ({
      type: "staff",
      name: m.name,
      role: m.role,
      description: m.description as string | null,
      order: i,
    })),
  ];
  for (const m of seedRows) {
    await pool.query(
      `INSERT INTO team_members (id, type, name, role, description, photo, sort_order, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [randomUUID(), m.type, m.name, m.role, m.description, null, m.order, now]
    );
  }
}

export async function listTeam(): Promise<TeamMember[]> {
  const pool = await db();
  await seedTeamIfEmpty(pool);
  const { rows } = await pool.query("SELECT * FROM team_members ORDER BY type, sort_order");
  return rows.map(rowToTeamMember);
}

export async function saveTeamMember(member: TeamMember): Promise<TeamMember> {
  const pool = await db();
  await pool.query(
    `INSERT INTO team_members (id, type, name, role, description, photo, sort_order, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [member.id, member.type, member.name, member.role, member.description ?? null, member.photo ?? null, member.order, member.createdAt]
  );
  return member;
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>) {
  const pool = await db();
  const current = await pool.query("SELECT * FROM team_members WHERE id = $1", [id]);
  if (current.rows.length === 0) return null;
  const merged = { ...rowToTeamMember(current.rows[0]), ...updates };
  await pool.query(
    `UPDATE team_members SET name=$2, role=$3, description=$4, photo=$5, sort_order=$6 WHERE id=$1`,
    [id, merged.name, merged.role, merged.description ?? null, merged.photo ?? null, merged.order]
  );
  return merged;
}

export async function deleteTeamMember(id: string) {
  const pool = await db();
  await pool.query("DELETE FROM team_members WHERE id = $1", [id]);
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

function rowToGalleryImage(r: any): GalleryImage {
  return {
    id: r.id,
    src: r.src,
    alt: r.alt,
    order: r.sort_order,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
  };
}

async function seedGalleryIfEmpty(pool: Awaited<ReturnType<typeof db>>) {
  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM gallery_images");
  if (rows[0].count > 0) return;
  const now = new Date().toISOString();
  for (let i = 0; i < galleryImages.length; i++) {
    const img = galleryImages[i];
    await pool.query(
      `INSERT INTO gallery_images (id, src, alt, sort_order, created_at) VALUES ($1,$2,$3,$4,$5)`,
      [randomUUID(), img.src, img.alt, i, now]
    );
  }
}

export async function listGalleryImages(): Promise<GalleryImage[]> {
  const pool = await db();
  await seedGalleryIfEmpty(pool);
  const { rows } = await pool.query("SELECT * FROM gallery_images ORDER BY sort_order");
  return rows.map(rowToGalleryImage);
}

export async function saveGalleryImage(image: GalleryImage): Promise<GalleryImage> {
  const pool = await db();
  await pool.query(
    `INSERT INTO gallery_images (id, src, alt, sort_order, created_at) VALUES ($1,$2,$3,$4,$5)`,
    [image.id, image.src, image.alt, image.order, image.createdAt]
  );
  return image;
}

export async function deleteGalleryImage(id: string) {
  const pool = await db();
  await pool.query("DELETE FROM gallery_images WHERE id = $1", [id]);
}

// ---------------------------------------------------------------------------
// Memorial / hero slideshow photos
// ---------------------------------------------------------------------------

function rowToMemorialPhoto(r: any): MemorialPhoto {
  return {
    id: r.id,
    src: r.src,
    alt: r.alt,
    order: r.sort_order,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
  };
}

async function seedMemorialPhotosIfEmpty(pool: Awaited<ReturnType<typeof db>>) {
  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM memorial_photos");
  if (rows[0].count > 0) return;
  const now = new Date().toISOString();
  for (let i = 0; i < memorialPhotos.length; i++) {
    const img = memorialPhotos[i];
    await pool.query(
      `INSERT INTO memorial_photos (id, src, alt, sort_order, created_at) VALUES ($1,$2,$3,$4,$5)`,
      [randomUUID(), img.src, img.alt, i, now]
    );
  }
}

export async function listMemorialPhotos(): Promise<MemorialPhoto[]> {
  const pool = await db();
  await seedMemorialPhotosIfEmpty(pool);
  const { rows } = await pool.query("SELECT * FROM memorial_photos ORDER BY sort_order");
  return rows.map(rowToMemorialPhoto);
}

export async function saveMemorialPhoto(photo: MemorialPhoto): Promise<MemorialPhoto> {
  const pool = await db();
  await pool.query(
    `INSERT INTO memorial_photos (id, src, alt, sort_order, created_at) VALUES ($1,$2,$3,$4,$5)`,
    [photo.id, photo.src, photo.alt, photo.order, photo.createdAt]
  );
  return photo;
}

export async function deleteMemorialPhoto(id: string) {
  const pool = await db();
  await pool.query("DELETE FROM memorial_photos WHERE id = $1", [id]);
}

// ---------------------------------------------------------------------------
// SMTP settings
// ---------------------------------------------------------------------------

const defaultSmtpSettings: SmtpSettings = {
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: (process.env.SMTP_PORT ?? "465") === "465",
  user: process.env.SMTP_USER ?? "",
  pass: process.env.SMTP_PASS ?? "",
  to: process.env.SMTP_TO ?? process.env.SMTP_USER ?? "",
};

export async function getSmtpSettings(): Promise<SmtpSettings> {
  const pool = await db();
  const { rows } = await pool.query("SELECT * FROM smtp_settings WHERE id = 1");
  if (rows.length === 0) return defaultSmtpSettings;
  const r = rows[0];
  return {
    host: r.host ?? defaultSmtpSettings.host,
    port: r.port ?? defaultSmtpSettings.port,
    secure: r.secure ?? defaultSmtpSettings.secure,
    user: r.smtp_user ?? defaultSmtpSettings.user,
    pass: r.smtp_pass ?? defaultSmtpSettings.pass,
    to: r.to_email ?? defaultSmtpSettings.to,
  };
}

export async function saveSmtpSettings(settings: SmtpSettings) {
  const pool = await db();
  await pool.query(
    `INSERT INTO smtp_settings (id, host, port, secure, smtp_user, smtp_pass, to_email)
     VALUES (1, $1,$2,$3,$4,$5,$6)
     ON CONFLICT (id) DO UPDATE SET
       host=EXCLUDED.host, port=EXCLUDED.port, secure=EXCLUDED.secure,
       smtp_user=EXCLUDED.smtp_user, smtp_pass=EXCLUDED.smtp_pass, to_email=EXCLUDED.to_email`,
    [settings.host, settings.port, settings.secure, settings.user, settings.pass, settings.to]
  );
  return settings;
}

// ---------------------------------------------------------------------------
// Social publishing settings (Buffer / Postiz)
// ---------------------------------------------------------------------------

const defaultPublishingSettings: PublishingSettings = {
  bufferApiKey: "",
  bufferFacebookChannelId: "",
  bufferInstagramChannelId: "",
  postizBaseUrl: "",
  postizApiKey: "",
  postizFacebookIntegrationId: "",
  postizInstagramIntegrationId: "",
  facebookProvider: "none",
  instagramProvider: "none",
};

export async function getPublishingSettings(): Promise<PublishingSettings> {
  const pool = await db();
  const { rows } = await pool.query("SELECT * FROM publishing_settings WHERE id = 1");
  if (rows.length === 0) return defaultPublishingSettings;
  const r = rows[0];
  return {
    bufferApiKey: r.buffer_api_key ?? "",
    bufferFacebookChannelId: r.buffer_facebook_channel_id ?? "",
    bufferInstagramChannelId: r.buffer_instagram_channel_id ?? "",
    postizBaseUrl: r.postiz_base_url ?? "",
    postizApiKey: r.postiz_api_key ?? "",
    postizFacebookIntegrationId: r.postiz_facebook_integration_id ?? "",
    postizInstagramIntegrationId: r.postiz_instagram_integration_id ?? "",
    facebookProvider: r.facebook_provider ?? "none",
    instagramProvider: r.instagram_provider ?? "none",
  };
}

export async function savePublishingSettings(settings: PublishingSettings) {
  const pool = await db();
  await pool.query(
    `INSERT INTO publishing_settings (
       id, buffer_api_key, buffer_facebook_channel_id, buffer_instagram_channel_id,
       postiz_base_url, postiz_api_key, postiz_facebook_integration_id, postiz_instagram_integration_id,
       facebook_provider, instagram_provider
     ) VALUES (1, $1,$2,$3,$4,$5,$6,$7,$8,$9)
     ON CONFLICT (id) DO UPDATE SET
       buffer_api_key=EXCLUDED.buffer_api_key,
       buffer_facebook_channel_id=EXCLUDED.buffer_facebook_channel_id,
       buffer_instagram_channel_id=EXCLUDED.buffer_instagram_channel_id,
       postiz_base_url=EXCLUDED.postiz_base_url,
       postiz_api_key=EXCLUDED.postiz_api_key,
       postiz_facebook_integration_id=EXCLUDED.postiz_facebook_integration_id,
       postiz_instagram_integration_id=EXCLUDED.postiz_instagram_integration_id,
       facebook_provider=EXCLUDED.facebook_provider,
       instagram_provider=EXCLUDED.instagram_provider`,
    [
      settings.bufferApiKey,
      settings.bufferFacebookChannelId,
      settings.bufferInstagramChannelId,
      settings.postizBaseUrl,
      settings.postizApiKey,
      settings.postizFacebookIntegrationId,
      settings.postizInstagramIntegrationId,
      settings.facebookProvider,
      settings.instagramProvider,
    ]
  );
  return settings;
}
