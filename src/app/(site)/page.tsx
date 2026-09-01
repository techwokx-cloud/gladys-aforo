import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  Cross,
  Users,
  Soup,
  HandHeart,
  Building2,
  CalendarHeart,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateBanner from "@/components/DonateBanner";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import HeroSlideshow from "@/components/HeroSlideshow";
import { site, stats, memorialPhotos } from "@/lib/site";

const statIcons: Record<string, React.ElementType> = {
  "heart-handshake": HeartHandshake,
  soup: Soup,
  "hand-heart": HandHeart,
  "building-2": Building2,
  "calendar-heart": CalendarHeart,
};

const featureCards = [
  {
    image: "/images/gallery/g6.jpg",
    icon: HeartHandshake,
    title: "Touching Lives,",
    accent: "One Family at a Time",
    tag: "Maternity Ward Support · Accra, Ghana",
    desc: "Foundation representative visiting a mother and baby in hospital",
  },
  {
    image: "/images/gallery/g7.jpg",
    icon: Cross,
    title: "Compassion in Action",
    accent: "",
    tag: "Hospital Outreach · Christ-Centered Care",
    desc: "Foundation team in the NICU with a baby receiving intensive care",
  },
  {
    image: "/images/gallery/g3.jpg",
    icon: Users,
    title: "No Mother Should",
    accent: "Stand Alone",
    tag: "Newborn & Maternal Support · Accra Hospitals",
    desc: "Foundation representative with a family and their newborn at the hospital",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-950">
        <HeroSlideshow photos={memorialPhotos} />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="max-w-2xl animate-fade-up">
            <div className="mb-5 flex items-center gap-3 text-gold-400">
              <span className="h-px w-10 bg-gold-500/60" />
              <Cross className="h-4 w-4" />
              <span className="h-px w-10 bg-gold-500/60" />
            </div>

            <h2 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              In Loving Memory of Gladys Aforo Pedee Newman
            </h2>
            <p className="mt-1.5 font-display text-base italic text-gold-400 sm:text-lg">
              Tenacious Mama, Even in Death
            </p>
            <div className="mt-4 max-w-xl space-y-3 text-sm leading-relaxed text-cream-200/90">
              <p>
                My grandmother never lacked anything to give. When my mother, Sheila, found
                herself blessed with a very pretty baby at an extremely young age, it was my
                grandmother who insisted the pregnancy be carried through and gave her the
                strongest support a mother could offer. I owe my life first to God, and then to
                my beloved grandmother. Were it not for her stance, I would not be here on earth
                today.
              </p>
              <p>
                Oh, Mama you fought so hard for both me and my mother to stand tall and weather
                every storm. No baby should come into this world already suffering simply because
                there was no money to offer relief. I am walking the same path today, determined
                not just to spare children from suffering, but to bring them light, comfort,
                growth, and above all, confidence. I want to offer that same hope to mothers who
                may be struggling, facing a story like mine because no one determines the destiny
                of a child except God, our Creator.
              </p>
              <p>
                My beloved grandmother was the heart of our family. No matter how busy life
                became, or how far apart we drifted, she made sure we never lost sight of what
                mattered most: family. She held us together with laughter and joy, while also
                standing firm as a disciplinarian who taught us the difference between right and
                wrong.
              </p>
              <p className="font-display italic text-gold-400">
                Her legacy lives on in me, and in every mother and child I now stand for.
              </p>
            </div>

            <h1 className="mt-8 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Serving <span className="italic text-gold-400">Mothers &amp; Children</span>
            </h1>
            <p className="mt-2 font-display text-xl font-medium text-gold-400 sm:text-2xl">
              In the Name of Christ
            </p>
            <p className="mt-5 text-lg text-cream-200">
              {site.name} · Accra, Ghana
            </p>
            <p className="mt-4 max-w-xl text-cream-300">
              <span className="font-semibold text-gold-400">{site.verse.ref}</span> —
              &ldquo;{site.verse.text}&rdquo;
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
              >
                Our Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/impact"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See Our Impact
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative z-10 -mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featureCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 120}>
                <div className="overflow-hidden rounded-xl bg-white shadow-xl shadow-black/10">
                  <div className="relative h-52 w-full">
                    <Image src={card.image} alt={card.desc} fill className="object-cover" />
                  </div>
                  <div className="p-6 text-center">
                    <div className="mx-auto -mt-12 mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900 ring-4 ring-white">
                      <Icon className="h-5 w-5 text-gold-400" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-forest-950">
                      {card.title} {card.accent && <span className="italic text-gold-500">{card.accent}</span>}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gold-600">{card.tag}</p>
                    <div className="mx-auto my-3 h-px w-10 bg-gold-500/40" />
                    <p className="text-sm text-forest-800/70">{card.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 rounded-xl bg-forest-900 px-6 py-8 text-center text-white sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => {
            const Icon = statIcons[s.icon];
            return (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <Icon className="h-7 w-7 text-gold-400" />
                <p className="font-display text-2xl font-semibold">
                  <CountUp value={s.value} />
                </p>
                <p className="text-xs text-cream-300">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Story + Mission/Vision */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
          <div>
            <SectionHeading eyebrow="Our Story" title="In Honor of a" accent="Woman of Grace" />
            <p className="mt-5 text-forest-800/80">
              The {site.name} is a Christian, non-denominational nonprofit organization operating
              under the Holy-Charity Ministry, headquartered in Accra, Ghana. We exist to support
              needy mothers and children across Ghana — regardless of background, tribe, or
              circumstance.
            </p>
            <p className="mt-4 text-forest-800/80">
              We were established in honor of Ms. Gladys Aforo — a woman of remarkable character
              who lovingly cared for and raised a generation of well-rounded children,
              grandchildren, and great-grandchildren, and a cherished grandmother to Amira and her
              siblings.
            </p>
            <blockquote className="mt-6 rounded-lg border-l-4 border-gold-500 bg-cream-200 px-5 py-4 font-display italic text-forest-900">
              &ldquo;Her spirit of sacrificial love is the heartbeat of everything we do.&rdquo;
              <footer className="mt-1 text-sm not-italic text-gold-600">— The Founders</footer>
            </blockquote>
            <p className="mt-4 text-forest-800/80">
              Her legacy is not simply remembered — it is lived out through every mother we
              support, every baby we shelter, and every orphan we feed.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-forest-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          </Reveal>

          <Reveal delay={150}>
          <div>
            <SectionHeading eyebrow="Purpose & Direction" title="Our Mission" accent="& Vision" />
            <div className="mt-6 space-y-5">
              <div className="rounded-lg border border-gold-500/30 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-forest-900">
                  <Cross className="h-5 w-5 text-gold-400" />
                </div>
                <h3 className="font-display text-lg font-semibold text-forest-950">Our Mission</h3>
                <p className="mt-1 text-sm text-forest-800/80">
                  To honor the legacy of Ms. Gladys Aforo by providing compassionate,
                  Christ-centered support to needy mothers and children across Ghana — offering
                  medical aid, nourishment, and dignity to those who need it most, from all walks
                  of life and every background.
                </p>
              </div>
              <div className="rounded-lg border border-gold-500/30 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-forest-900">
                  <span className="text-gold-400">✦</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-forest-950">Our Vision</h3>
                <p className="mt-1 text-sm italic text-gold-600">
                  &ldquo;A Ghana where no mother labors alone and no child suffers in silence — one
                  act of grace at a time.&rdquo;
                </p>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      <DonateBanner />
    </>
  );
}
