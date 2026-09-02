import Image from "next/image";
import { Stethoscope, Soup, Baby, Building2, HandHeart, ShieldCheck, FileCheck, Cross } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import DonateForm from "@/components/DonateForm";
import { impactMetrics, trustBadges, site } from "@/lib/site";

export const metadata = { title: "Donate | Gladys Aforo Foundation" };

const metricIcons: Record<string, React.ElementType> = {
  stethoscope: Stethoscope,
  soup: Soup,
  baby: Baby,
  "building-2": Building2,
  "hand-heart": HandHeart,
};

const badgeIcons: Record<string, React.ElementType> = {
  "shield-check": ShieldCheck,
  "hand-heart": HandHeart,
  "file-check": FileCheck,
  cross: Cross,
};

export default function DonatePage() {
  return (
    <>
      <Breadcrumb current="Donate" />

      <section className="relative overflow-hidden bg-forest-950">
        <div className="absolute inset-0">
          <Image src="/images/gallery/g6.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/90 to-forest-950/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Give Hope" title="Your Gift Changes" accent="Lives Forever." light />
          <p className="mt-4 max-w-xl text-cream-300">
            Your donation helps provide critical medical care, nutritious meals, diapers, and
            support to mothers and children in need across Accra, Ghana. Every act of generosity
            is an act of Christ&apos;s love in action.
          </p>
          <blockquote className="mt-6 max-w-lg rounded-lg border-l-4 border-gold-500 bg-white/5 px-5 py-4 font-display italic text-cream-100 backdrop-blur-sm">
            &ldquo;{site.verse.text}&rdquo;
            <footer className="mt-1 text-sm not-italic text-gold-400">— {site.verse.ref}</footer>
          </blockquote>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <DonateForm />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Your Gift Makes an Impact" title="What Your Giving" accent="Provides" center />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {impactMetrics.map((m) => {
            const Icon = metricIcons[m.icon];
            return (
              <div key={m.label} className="rounded-lg border border-gold-500/30 bg-cream-200 p-5 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <p className="font-display text-lg font-semibold text-forest-950">{m.label}</p>
                <p className="mt-1 text-sm text-forest-800/80">{m.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="relative mt-8 flex items-center gap-4 overflow-hidden rounded-lg bg-cream-200 px-6 py-5">
          <span className="text-xl text-gold-700">♥</span>
          <p className="text-sm text-forest-900">
            Every donation — big or small — brings hope, healing, and a future to mothers and
            children in need across Ghana.
          </p>
        </div>
      </section>

      <section className="bg-forest-950 py-14">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          Transparency You Can Trust
        </p>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {trustBadges.map((b) => {
            const Icon = badgeIcons[b.icon];
            return (
              <div key={b.title} className="text-center text-cream-200">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <h4 className="font-display text-base font-semibold text-white">{b.title}</h4>
                <p className="mt-1 text-xs text-cream-300">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
