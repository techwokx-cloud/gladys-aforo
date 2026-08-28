import { NextRequest, NextResponse } from "next/server";
import { updateDonationStatus } from "@/lib/store";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ status: "unknown", fallback: true });
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
      cache: "no-store",
    });
    const data = await res.json();
    const status = data?.data?.status === "success" ? "success" : "failed";
    updateDonationStatus(reference, status);
    return NextResponse.json({ status, raw: data?.data ?? null });
  } catch {
    return NextResponse.json({ status: "unknown" }, { status: 200 });
  }
}
