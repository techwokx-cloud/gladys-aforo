"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, RefreshCw, Lock, Loader2, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";

const quickAmounts = [50, 100, 150, 200, 500];

export default function DonateForm() {
  const [mode, setMode] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState("100");
  const [count, setCount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      phone: `+233${form.get("phone")}`,
      amount,
      // "Monthly Donation" always means monthly — no hidden weekly/annually option.
      interval: mode === "one-time" ? "one-time" : "monthly",
      count: mode === "monthly" ? count : null,
    };

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.authorization_url) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      window.location.href = data.authorization_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-xl lg:grid-cols-[22rem_1fr]">
      {/* Left summary panel */}
      <div className="flex flex-col items-center justify-center gap-6 bg-cream-200 px-8 py-10 text-center">
        <Image
          src="/images/logo/logo.png"
          alt={site.name}
          width={110}
          height={134}
          className="h-28 w-auto"
        />
        <div>
          <h3 className="font-display text-xl font-semibold text-forest-950">{site.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-wide text-forest-800/60">
            By {site.name}
          </p>
          <p className="mt-2 text-sm text-forest-800/80">{site.name}</p>
        </div>
        <div className="w-full rounded-lg border border-forest-900/10 bg-white p-4">
          <p className="mb-3 flex items-center justify-center gap-1.5 text-xs text-forest-800/70">
            <Lock className="h-3.5 w-3.5" /> Secured by <span className="font-bold">paystack</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold text-forest-800/60">
            <span className="rounded border border-forest-900/10 px-2 py-1">Mastercard</span>
            <span className="rounded border border-forest-900/10 px-2 py-1">Visa</span>
            <span className="rounded border border-forest-900/10 px-2 py-1">MTN MoMo</span>
            <span className="rounded border border-forest-900/10 px-2 py-1">Apple Pay</span>
            <span className="rounded border border-forest-900/10 px-2 py-1">Telecel Cash</span>
            <span className="rounded border border-forest-900/10 px-2 py-1">AirtelTigo</span>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <h3 className="mb-4 font-display text-lg font-semibold text-forest-950">
          Choose How You Want to Give
        </h3>
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-cream-200 p-1">
          <button
            type="button"
            onClick={() => setMode("one-time")}
            className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors ${
              mode === "one-time" ? "bg-forest-900 text-white" : "text-forest-800/70"
            }`}
          >
            <Heart className="h-4 w-4" /> One-time Donation
          </button>
          <button
            type="button"
            onClick={() => setMode("monthly")}
            className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors ${
              mode === "monthly" ? "bg-forest-900 text-white" : "text-forest-800/70"
            }`}
          >
            <RefreshCw className="h-4 w-4" /> Monthly Donation
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-forest-950">First name</label>
            <input
              required
              name="firstName"
              className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm placeholder:text-forest-800/40 focus:border-gold-500 focus:outline-none"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-forest-950">Last name</label>
            <input
              required
              name="lastName"
              className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm placeholder:text-forest-800/40 focus:border-gold-500 focus:outline-none"
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-semibold text-forest-950">Email address</label>
          <input
            required
            type="email"
            name="email"
            className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm placeholder:text-forest-800/40 focus:border-gold-500 focus:outline-none"
            placeholder="Email address"
          />
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-semibold text-forest-950">Phone number</label>
          <div className="flex overflow-hidden rounded-md border border-forest-900/15 bg-cream-100 focus-within:border-gold-500">
            <span className="flex items-center border-r border-forest-900/15 px-3 text-sm text-forest-800/70">
              +233
            </span>
            <input
              required
              name="phone"
              type="tel"
              className="w-full bg-transparent px-3 py-2.5 text-sm placeholder:text-forest-800/40 focus:outline-none"
              placeholder="Phone number"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-semibold text-forest-950">Amount</label>
          <div className="flex overflow-hidden rounded-md border border-forest-900/15 bg-cream-100 focus-within:border-gold-500">
            <span className="flex items-center border-r border-forest-900/15 px-3 text-sm text-forest-800/70">
              GHS
            </span>
            <input
              required
              type="number"
              min={1}
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent px-3 py-2.5 text-sm focus:outline-none"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {quickAmounts.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => setAmount(String(a))}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  amount === String(a)
                    ? "border-gold-500 bg-gold-500 text-forest-950"
                    : "border-forest-900/15 text-forest-800/70 hover:border-gold-500"
                }`}
              >
                GHS {a}
              </button>
            ))}
          </div>
        </div>

        {mode === "monthly" && (
          <div className="mt-4">
            <label className="mb-1 block text-sm font-semibold text-forest-950">Duration</label>
            <select
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            >
              <option value="">Continue until I cancel</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
            </select>
          </div>
        )}

        <div className="mt-4 rounded-md border border-gold-500/40 bg-cream-200 px-4 py-3 text-sm text-forest-900">
          {mode === "one-time" ? (
            <>
              You&apos;ll give <strong>GHS {amount || 0} once</strong>, today only.
            </>
          ) : (
            <>
              You&apos;ll give <strong>GHS {amount || 0} every month</strong>
              {count ? (
                <>
                  , for <strong>{count} months</strong> ({(Number(amount || 0) * Number(count)).toLocaleString()} GHS total).
                </>
              ) : (
                <>, continuing until you cancel.</>
              )}{" "}
              To change or cancel a recurring donation at any time, contact{" "}
              <a href={`mailto:${site.contact.email}`} className="underline">
                {site.contact.email}
              </a>
              .
            </>
          )}
        </div>

        <p className="mt-4 flex items-center gap-2 text-xs text-forest-800/60">
          <Lock className="h-3.5 w-3.5" />
          You&apos;ll be redirected to a secure payment page to complete your donation.
        </p>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-forest-700 py-3.5 font-semibold text-white transition-colors hover:bg-forest-800 disabled:opacity-70"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
          Donate Securely
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-forest-800/60">
          <ShieldCheck className="h-3.5 w-3.5" /> All payments are secure and encrypted.
        </p>
      </form>
    </div>
  );
}
