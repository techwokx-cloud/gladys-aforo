import Image from "next/image";
import {
  HeartHandshake,
  Soup,
  HandHeart,
  Building2,
  CalendarHeart,
  Stethoscope,
  Baby,
  ShieldCheck,
  FileCheck,
  Cross,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import DonateBanner from "@/components/DonateBanner";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { stats, impactMetrics, trustBadges } from "@/lib/site";

export const metadata = { title: "Our Impact | Gladys Aforo Foundation" };

const statIcons: Record<string, React.ElementType> = {
  "heart-handshake": HeartHandshake,
  soup: Soup,
  "hand-heart": HandHeart,
  "building-2": Building2,
  "calendar-heart": CalendarHeart,
};

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

export default function ImpactPage() {
  return (
    <>
      <Breadcrumb current="Impact" />

      <section className="relative overflow-hidden bg-forest-950">
        <div className="absolute inset-0 opacity-30">
          <Image src="/images/gallery/g7.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/90 via-forest-950/80 to-forest-950" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Measured in Lives" title="Grace, Made" accent="Visible" light center />
          <p className="mx-auto mt-4 max-w-2xl text-center text-cream-300">
            Every number below represents a mother comforted, a baby cared for, or a family that
            no longer stands alone.
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => {
              const Icon = statIcons[s.icon];
              return (
                <div key={s.label} className="flex flex-col items-center gap-2 text-center text-white">
                  <Icon className="h-7 w-7 text-gold-400" />
                  <p className="font-display text-3xl font-semibold">
                    <CountUp value={s.value} />
                  </p>
                  <p className="text-xs text-cream-300">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Your Gift Makes an Impact" title="What Your Giving" accent="Provides" center />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {impactMetrics.map((m, i) => {
            const Icon = metricIcons[m.icon];
            return (
              <Reveal key={m.label} delay={i * 80}>
                <div className="rounded-lg border border-gold-500/30 bg-cream-200 p-5 text-center">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900">
                    <Icon className="h-5 w-5 text-gold-400" />
                  </div>
                  <p className="font-display text-lg font-semibold text-forest-950">{m.label}</p>
                  <p className="mt-1 text-sm text-forest-800/80">{m.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-forest-950 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Transparency You Can Trust
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
        </div>
      </section>

      <DonateBanner
        title="Make a Difference Today"
        subtitle="Your generosity can change a life, strengthen a family, and bring hope to our community."
      />
    </>
  );
}
