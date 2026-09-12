delete process.env.DATABASE_URL;
process.env.DATABASE_SOCKET_PATH = "/var/run/mysqld/mysqld.sock";
process.env.DATABASE_USER = "test_user";
process.env.DATABASE_PASSWORD = "testpass123";
process.env.DATABASE_NAME = "test_gladys";

import { randomUUID } from "crypto";
import * as store from "../src/lib/store";

async function main() {
  console.log("--- Donations ---");
  const donationId = randomUUID();
  const ref = "ref-" + Date.now();
  await store.saveDonation({
    id: donationId,
    reference: ref,
    firstName: "Test",
    lastName: "Donor",
    email: "test@example.com",
    phone: "+233555000000",
    amount: 100,
    currency: "GHS",
    interval: "monthly",
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  const updated = await store.updateDonationStatus(ref, "success");
  console.log("updateDonationStatus ->", updated?.status, updated?.interval);
  const donations = await store.listDonations();
  console.log("listDonations count ->", donations.length);

  console.log("--- Messages ---");
  await store.saveMessage({
    id: randomUUID(),
    name: "Test",
    email: "test@example.com",
    subject: "Hello",
    message: "Test message",
    createdAt: new Date().toISOString(),
  });
  console.log("listMessages ->", (await store.listMessages()).length);

  console.log("--- Support Requests ---");
  const reqId = randomUUID();
  await store.saveSupportRequest({
    id: reqId,
    fullName: "Jane Doe",
    role: "Nurse",
    phone: "+233555000001",
    email: "jane@example.com",
    facility: "Test Hospital",
    district: "Accra",
    familyHeadName: "Jane Doe",
    dependents: "2",
    situation: "Test situation",
    supportType: "Medical",
    estimatedAmount: "200",
    urgency: "high",
    attachmentNames: ["file1.pdf", "file2.jpg"],
    status: "new",
    createdAt: new Date().toISOString(),
  });
  const updatedReq = await store.updateSupportRequestStatus(reqId, "reviewing");
  console.log("updateSupportRequestStatus ->", updatedReq?.status, "attachments:", updatedReq?.attachmentNames);

  console.log("--- Social Posts ---");
  const postId = randomUUID();
  await store.saveSocialPost({
    id: postId,
    title: "Test post",
    content: "Test content",
    platform: "facebook",
    category: "general",
    status: "draft",
    createdAt: new Date().toISOString(),
  });
  await store.updateSocialPost(postId, { status: "posted" });
  const posts = await store.listSocialPosts();
  console.log("listSocialPosts ->", posts.length, posts[0]?.status);
  await store.deleteSocialPost(postId);

  console.log("--- Team (seeded) ---");
  const team = await store.listTeam();
  console.log("listTeam (seeded) ->", team.length, "members");
  const newMember = await store.saveTeamMember({
    id: randomUUID(),
    type: "staff",
    name: "New Person",
    role: "Volunteer",
    order: 99,
    createdAt: new Date().toISOString(),
  });
  await store.updateTeamMember(newMember.id, { role: "Senior Volunteer" });
  await store.deleteTeamMember(newMember.id);
  console.log("team CRUD ok");

  console.log("--- Gallery (seeded) ---");
  const gallery = await store.listGalleryImages();
  console.log("listGalleryImages (seeded) ->", gallery.length, "images");

  console.log("--- Memorial photos (seeded) ---");
  const memorial = await store.listMemorialPhotos();
  console.log("listMemorialPhotos (seeded) ->", memorial.length, "photos");

  console.log("--- SMTP settings ---");
  await store.saveSmtpSettings({
    host: "smtp.test.com",
    port: 465,
    secure: true,
    user: "test@test.com",
    pass: "secret",
    to: "admin@test.com",
  });
  const smtp = await store.getSmtpSettings();
  console.log("getSmtpSettings ->", smtp.host, smtp.secure, typeof smtp.secure);

  console.log("--- Publishing settings ---");
  await store.savePublishingSettings({
    bufferApiKey: "key123",
    bufferFacebookChannelId: "fb1",
    bufferInstagramChannelId: "ig1",
    postizBaseUrl: "https://postiz.test",
    postizApiKey: "pkey",
    postizFacebookIntegrationId: "int1",
    postizInstagramIntegrationId: "int2",
    facebookProvider: "buffer",
    instagramProvider: "none",
  });
  const pub = await store.getPublishingSettings();
  console.log("getPublishingSettings ->", pub.facebookProvider, pub.bufferFacebookChannelId);

  console.log("--- WhatsApp settings ---");
  await store.saveWhatsAppSettings({
    phoneNumberId: "1234567890",
    accessToken: "test-token",
    templateName: "website_chat_notification",
    recipient1: "+233555000001",
    recipient2: "+233555000002",
    recipient3: "",
    recipient4: "",
    recipient5: "",
  });
  const wa = await store.getWhatsAppSettings();
  console.log("getWhatsAppSettings ->", wa.phoneNumberId, wa.recipient1, wa.recipient2);

  console.log("--- Chat widget ---");
  const conv = await store.createConversation();
  await store.addChatMessage(conv.id, "user", "Hello, I need help");
  await store.addChatMessage(conv.id, "assistant", "Hi! How can I help you today?");
  const chatMessages = await store.getConversationMessages(conv.id);
  const msgCount = await store.countMessagesInConversation(conv.id);
  const conversations = await store.listConversations();
  console.log("chat messages ->", chatMessages.length, "count fn ->", msgCount, "conversations ->", conversations.length);

  console.log("\n✅ ALL TESTS PASSED");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ TEST FAILED:", err);
  process.exit(1);
});
