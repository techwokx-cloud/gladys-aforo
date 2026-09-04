import nodemailer from "nodemailer";
import { getSmtpSettings } from "@/lib/store";

export async function isMailerConfigured() {
  const settings = await getSmtpSettings();
  return Boolean(settings.user && settings.pass);
}

export async function getTransporter() {
  const settings = await getSmtpSettings();
  if (!settings.user || !settings.pass) return null;

  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: {
      user: settings.user,
      pass: settings.pass,
    },
  });
}

export async function sendMail(options: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}) {
  const settings = await getSmtpSettings();
  const transporter = await getTransporter();
  if (!transporter) return { sent: false, reason: "SMTP not configured" };

  const to = settings.to || settings.user;

  await transporter.sendMail({
    from: `"Gladys Aforo Pedee Newman Foundation Website" <${settings.user}>`,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  });

  return { sent: true };
}
