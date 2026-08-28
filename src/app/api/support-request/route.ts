import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveSupportRequest } from "@/lib/store";
import { sendMail } from "@/lib/mailer";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const fullName = String(form.get("fullName") ?? "");
  const role = String(form.get("role") ?? "");
  const phone = String(form.get("phone") ?? "");
  const email = String(form.get("email") ?? "");
  const facility = String(form.get("facility") ?? "");
  const district = String(form.get("district") ?? "");
  const familyHeadName = String(form.get("familyHeadName") ?? "");
  const dependents = String(form.get("dependents") ?? "");
  const situation = String(form.get("situation") ?? "");
  const supportType = String(form.get("supportType") ?? "");
  const estimatedAmount = String(form.get("estimatedAmount") ?? "");
  const urgency = String(form.get("urgency") ?? "");
  const additionalInfo = String(form.get("additionalInfo") ?? "");

  if (!fullName || !role || !phone || !email || !familyHeadName || !situation || !supportType || !urgency) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const files = form.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Please attach at most ${MAX_FILES} files.` }, { status: 400 });
  }
  for (const f of files) {
    if (f.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `"${f.name}" is larger than 5MB.` }, { status: 400 });
    }
  }

  const attachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()),
      contentType: f.type || "application/octet-stream",
    }))
  );

  const saved = saveSupportRequest({
    id: randomUUID(),
    fullName,
    role,
    phone,
    email,
    facility,
    district,
    familyHeadName,
    dependents,
    situation,
    supportType,
    estimatedAmount,
    urgency,
    additionalInfo,
    attachmentNames: files.map((f) => f.name),
    status: "new",
    createdAt: new Date().toISOString(),
  });

  try {
    await sendMail({
      subject: `New support request: ${familyHeadName} (${urgency})`,
      replyTo: email,
      html: `
        <h2>New Request for Support</h2>
        <h3>Requestor</h3>
        <p><strong>Name:</strong> ${fullName} (${role})</p>
        <p><strong>Phone:</strong> ${phone} &middot; <strong>Email:</strong> ${email}</p>
        <p><strong>Facility / Organization:</strong> ${facility || "N/A"}</p>
        <p><strong>District:</strong> ${district || "N/A"}</p>
        <h3>Family in Need</h3>
        <p><strong>Name of Family Head / Patient:</strong> ${familyHeadName}</p>
        <p><strong>Number of Dependents:</strong> ${dependents || "N/A"}</p>
        <p><strong>Situation:</strong></p>
        <p>${situation.replace(/\n/g, "<br/>")}</p>
        <h3>Request Details</h3>
        <p><strong>Type of Support:</strong> ${supportType}</p>
        <p><strong>Estimated Amount:</strong> GHS ${estimatedAmount || "N/A"}</p>
        <p><strong>Urgency:</strong> ${urgency}</p>
        ${additionalInfo ? `<p><strong>Additional Info:</strong><br/>${additionalInfo.replace(/\n/g, "<br/>")}</p>` : ""}
        ${files.length ? `<p><strong>Attachments:</strong> ${files.map((f) => f.name).join(", ")}</p>` : ""}
      `,
      attachments,
    });
  } catch (err) {
    console.error("Failed to send support request email", err);
  }

  return NextResponse.json({ ok: true, request: saved });
}
