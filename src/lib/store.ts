import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson<T>(file: string, fallback: T): T {
  ensureDir();
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) return fallback;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(file: string, data: T) {
  ensureDir();
  const filePath = path.join(DATA_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
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
  status: "draft" | "scheduled" | "posted";
  scheduledFor?: string;
  createdAt: string;
};

export function listDonations(): Donation[] {
  return readJson<Donation[]>("donations.json", []);
}

export function saveDonation(donation: Donation) {
  const donations = listDonations();
  const idx = donations.findIndex((d) => d.reference === donation.reference);
  if (idx >= 0) donations[idx] = donation;
  else donations.unshift(donation);
  writeJson("donations.json", donations);
  return donation;
}

export function updateDonationStatus(reference: string, status: Donation["status"]) {
  const donations = listDonations();
  const idx = donations.findIndex((d) => d.reference === reference);
  if (idx >= 0) {
    donations[idx].status = status;
    writeJson("donations.json", donations);
    return donations[idx];
  }
  return null;
}

export function listMessages(): ContactMessage[] {
  return readJson<ContactMessage[]>("messages.json", []);
}

export function saveMessage(msg: ContactMessage) {
  const messages = listMessages();
  messages.unshift(msg);
  writeJson("messages.json", messages);
  return msg;
}

export function listSupportRequests(): SupportRequest[] {
  return readJson<SupportRequest[]>("support-requests.json", []);
}

export function saveSupportRequest(req: SupportRequest) {
  const requests = listSupportRequests();
  requests.unshift(req);
  writeJson("support-requests.json", requests);
  return req;
}

export function updateSupportRequestStatus(id: string, status: SupportRequest["status"]) {
  const requests = listSupportRequests();
  const idx = requests.findIndex((r) => r.id === id);
  if (idx >= 0) {
    requests[idx].status = status;
    writeJson("support-requests.json", requests);
    return requests[idx];
  }
  return null;
}

export function listSocialPosts(): SocialPost[] {
  return readJson<SocialPost[]>("social-posts.json", []);
}

export function saveSocialPost(post: SocialPost) {
  const posts = listSocialPosts();
  posts.unshift(post);
  writeJson("social-posts.json", posts);
  return post;
}

export function deleteSocialPost(id: string) {
  const posts = listSocialPosts().filter((p) => p.id !== id);
  writeJson("social-posts.json", posts);
}
