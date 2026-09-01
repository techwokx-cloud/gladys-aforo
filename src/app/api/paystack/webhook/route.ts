import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updateDonationStatus } from "@/lib/store";

export async function POST(req: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const rawBody = await req.text();

  if (secretKey) {
    const signature = req.headers.get("x-paystack-signature");
    const hash = crypto.createHmac("sha512", secretKey).update(rawBody).digest("hex");
    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let event: { event?: string; data?: { reference?: string; status?: string } } = {};
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const reference = event.data?.reference;
  if (reference) {
    if (event.event === "charge.success") {
      await updateDonationStatus(reference, "success");
    } else if (event.event === "charge.failed") {
      await updateDonationStatus(reference, "failed");
    }
  }

  return NextResponse.json({ received: true });
}
