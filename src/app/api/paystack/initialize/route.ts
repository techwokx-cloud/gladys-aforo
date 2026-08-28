import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveDonation } from "@/lib/store";
import { site } from "@/lib/site";

const PAYSTACK_BASE = "https://api.paystack.co";

type PlanInterval = "daily" | "weekly" | "monthly" | "annually";

async function findOrCreatePlan(secretKey: string, amountKobo: number, interval: PlanInterval) {
  const name = `GAF Recurring Gift - GHS ${amountKobo / 100} (${interval})`;

  const list = await fetch(`${PAYSTACK_BASE}/plan?perPage=100`, {
    headers: { Authorization: `Bearer ${secretKey}` },
    cache: "no-store",
  }).then((r) => r.json());

  const existing = list?.data?.find(
    (p: { name: string; amount: number; interval: string }) =>
      p.amount === amountKobo && p.interval === interval && p.name === name
  );
  if (existing) return existing.plan_code as string;

  const created = await fetch(`${PAYSTACK_BASE}/plan`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, amount: amountKobo, interval, currency: "GHS" }),
  }).then((r) => r.json());

  return created?.data?.plan_code as string | undefined;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, phone, amount, interval, count } = body ?? {};

  if (!firstName || !lastName || !email || !amount || Number(amount) <= 0) {
    return NextResponse.json(
      { error: "First name, last name, email, and a valid amount are required." },
      { status: 400 }
    );
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const amountKobo = Math.round(Number(amount) * 100);
  const reference = `GAF-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const normalizedInterval = interval && interval !== "one-time" ? interval : "one-time";

  saveDonation({
    id: randomUUID(),
    reference,
    firstName,
    lastName,
    email,
    phone: phone ?? "",
    amount: Number(amount),
    currency: "GHS",
    interval: normalizedInterval,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  // No secret key configured yet — fall back to the foundation's hosted Paystack page.
  if (!secretKey) {
    return NextResponse.json({
      authorization_url: site.paystack.shopLink,
      reference,
      fallback: true,
    });
  }

  const origin = req.nextUrl.origin;
  const payload: Record<string, unknown> = {
    email,
    amount: amountKobo,
    currency: "GHS",
    reference,
    callback_url: `${origin}/donate/thank-you?reference=${reference}`,
    metadata: {
      first_name: firstName,
      last_name: lastName,
      phone,
      interval: normalizedInterval,
      count: count ?? null,
      custom_fields: [
        { display_name: "Donor Name", variable_name: "donor_name", value: `${firstName} ${lastName}` },
        { display_name: "Phone", variable_name: "phone", value: phone ?? "N/A" },
        { display_name: "Interval", variable_name: "interval", value: normalizedInterval },
      ],
    },
  };

  if (normalizedInterval !== "one-time") {
    const planCode = await findOrCreatePlan(secretKey, amountKobo, normalizedInterval as PlanInterval);
    if (planCode) payload.plan = planCode;
  }

  try {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok || !data?.status) {
      return NextResponse.json(
        { error: data?.message ?? "Unable to initialize payment." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference,
      fallback: false,
    });
  } catch {
    return NextResponse.json(
      { authorization_url: site.paystack.shopLink, reference, fallback: true },
      { status: 200 }
    );
  }
}
