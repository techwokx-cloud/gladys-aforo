import Image from "next/image";
import { HandHeart, HeartPulse, Soup, ShieldPlus, Baby, MapPin } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import DonateBanner from "@/components/DonateBanner";
import Reveal from "@/components/Reveal";
import { programs } from "@/lib/site";

export const metadata = { title: "Our Programs | Gladys Aforo Foundation" };

const programIcons: Record<string, React.ElementType> = {
  "heart-pulse": HeartPulse,
  soup: Soup,
  "shield-plus": ShieldPlus,
  baby: Baby,
};

const tagStyles: Record<string, string> = {
  Ongoing: "bg-forest-900 text-white",
  New: "bg-gold-500 text-forest-950",
};

export default function ProgramsPage() {
  return (
    <>
      <Breadcrumb current="Programs" />

      <section className="relative overflow-hidden bg-cream-100">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="Our Programs" title="Practical Support." accent="Christ-Centered Care." />
            <p className="mt-5 text-forest-800/80">
              We run focused programs that meet urgent needs, restore hope, and uplift mothers and
              children across Accra and beyond.
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-md border border-gold-500/30 bg-cream-200 px-4 py-3">
              <HandHeart className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              <p className="text-sm text-forest-900">
                Every program we run is an act of obedience to the Gospel of compassion.
              </p>
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-xl shadow-xl lg:h-96">
            <Image
              src="/images/gallery/g9.jpg"
              alt="Foundation team caring for a mother and newborn"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 pb-16 sm:px-6 lg:px-8">
        {programs.map((p, i) => {
          const Icon = programIcons[p.icon];
          return (
            <Reveal key={p.slug} delay={i * 100}>
            <div
              className="grid grid-cols-1 overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-sm md:grid-cols-[minmax(0,26rem)_1fr]"
            >
              <div className="relative h-56 md:h-full">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
              </div>
              <div className="relative p-6 sm:p-8">
                <span
                  className={`absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-semibold ${tagStyles[p.tag]}`}
                >
                  {p.tag}
                </span>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-forest-950">{p.title}</h3>
                <p className="mt-1 text-sm font-medium text-gold-600">{p.subtitle}</p>
                <p className="mt-3 max-w-2xl text-sm text-forest-800/80">{p.description}</p>
                <div className="mt-4 flex items-start gap-2 text-sm text-forest-800/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  <span>{p.location}</span>
                </div>
              </div>
            </div>
            </Reveal>
          );
        })}
      </section>

      <DonateBanner
        title="You Can Help Us Do More"
        subtitle="Your support helps us reach more mothers, save more babies, and bring hope to more children."
      />
    </>
  );
}
