import Link from "next/link";
import { CheckCircle2, XCircle, HelpCircle, Heart } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = { title: "Thank You | Gladys Aforo Foundation" };

async function verify(reference?: string) {
  if (!reference) return "unknown";
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/paystack/verify?reference=${reference}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.status as "success" | "failed" | "unknown";
  } catch {
    return "unknown";
  }
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const params = await searchParams;
  const reference = params.reference ?? params.trxref;
  const status = await verify(reference);

  const content = {
    success: {
      icon: <CheckCircle2 className="h-14 w-14 text-forest-700" />,
      title: "Thank You for Your Gift",
      body: "Your donation has been received. You are directly supporting mothers and children across Accra — thank you for your generosity and for being part of this ministry.",
    },
    failed: {
      icon: <XCircle className="h-14 w-14 text-red-600" />,
      title: "Payment Not Completed",
      body: "It looks like your donation didn't go through. No charge was made. Please try again, or reach out to us if you continue to have trouble.",
    },
    unknown: {
      icon: <HelpCircle className="h-14 w-14 text-gold-700" />,
      title: "Thank You",
      body: "We've received your request. If a payment was made, you'll receive a confirmation email from Paystack shortly. Please contact us if you have any questions about your donation.",
    },
  }[status];

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      {content.icon}
      <h1 className="mt-5 font-display text-3xl font-semibold text-forest-950">{content.title}</h1>
      <p className="mt-3 text-forest-800/80">{content.body}</p>
      {reference && (
        <p className="mt-4 text-xs text-forest-800/50">Reference: {reference}</p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-forest-900 px-6 py-3 text-sm font-semibold text-white hover:bg-forest-800"
        >
          Back to Home
        </Link>
        {status !== "success" && (
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 hover:bg-gold-400"
          >
            <Heart className="h-4 w-4 fill-forest-950" />
            Try Again
          </Link>
        )}
      </div>
      <p className="mt-6 text-xs text-forest-800/50">
        Questions about your donation? Email {site.contact.email}
      </p>
    </section>
  );
}
