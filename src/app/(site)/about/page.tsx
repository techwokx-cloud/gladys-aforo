import Image from "next/image";
import { Cross, HandHeart, Users, Handshake } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import DonateBanner from "@/components/DonateBanner";
import { coreValues } from "@/lib/site";

export const metadata = { title: "About Us | Gladys Aforo Foundation" };

const valueIcons: Record<string, React.ElementType> = {
  "hand-heart": HandHeart,
  cross: Cross,
  users: Users,
  handshake: Handshake,
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb current="About" />

      {/* In Loving Memory */}
      <section className="bg-forest-950 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative order-2 h-96 overflow-hidden rounded-xl shadow-xl lg:order-1 lg:h-[30rem]">
            <Image
              src="/images/memorial/mama-2.jpg"
              alt="Ms. Gladys Aforo"
              fill
              className="object-cover object-bottom"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="In Loving Memory" title="Gladys Aforo Pedee Newman" accent="Tenacious Mama" />
            <div className="mt-5 space-y-4 text-cream-200">
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
              <blockquote className="rounded-lg border-l-4 border-gold-500 bg-white/5 px-5 py-4 font-display italic text-cream-100">
                Her legacy lives on in me, and in every mother and child I now stand for.
              </blockquote>
              <p className="text-sm text-cream-300">— Amiratu Yamusah-Sarkodee, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative overflow-hidden bg-cream-100">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="About Us" title="In Honor of a" accent="Woman of Grace" />
            <p className="mt-5 text-forest-800/80">
              The Gladys Aforo Foundation is a Christian, non-denominational nonprofit
              organization operating under the Holy-Charity Ministry, headquartered in Accra,
              Ghana. We exist to support needy mothers and children across Ghana — regardless of
              background, tribe, or circumstance.
            </p>
            <p className="mt-4 text-forest-800/80">
              We were established in honor of Ms. Gladys Aforo — a woman of remarkable character
              who lovingly cared for and raised a generation of well-rounded children,
              grandchildren, and great-grandchildren, and a cherished grandmother to Amira and her
              siblings.
            </p>
            <blockquote className="mt-6 rounded-lg border-l-4 border-gold-500 bg-cream-200 px-5 py-4 font-display italic text-forest-900">
              &ldquo;Her spirit of sacrificial love is the heartbeat of everything we do.&rdquo;
              <footer className="mt-1 text-sm not-italic text-gold-700">— The Founders</footer>
            </blockquote>
            <p className="mt-4 text-forest-800/80">
              Her legacy is not simply remembered — it is lived out through every mother we
              support, every baby we shelter, and every orphan we feed.
            </p>
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl shadow-xl lg:h-[26rem]">
            <Image
              src="/images/gallery/g6.jpg"
              alt="A mother holds her newborn at the maternity ward"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-cream-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Purpose & Direction" title="Our Mission" accent="& Vision" center />
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-gold-500/30 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900">
                <Cross className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-forest-950">Our Mission</h3>
              <p className="mt-2 text-sm text-forest-800/80">
                To honor the legacy of Ms. Gladys Aforo by providing compassionate,
                Christ-centered support to needy mothers and children across Ghana — offering
                medical aid, nourishment, and dignity to those who need it most, from all walks of
                life and every background.
              </p>
            </div>
            <div className="rounded-lg border border-gold-500/30 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900">
                <span className="text-gold-400">✦</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-forest-950">Our Vision</h3>
              <p className="mt-2 text-sm italic text-gold-700">
                &ldquo;A Ghana where no mother labors alone and no child suffers in silence — one
                act of grace at a time.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Christian Mission */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our Foundation" title="What Makes Us" accent="Different" />
            <div className="mt-6 rounded-lg border border-gold-500/30 bg-cream-200 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900">
                <HandHeart className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-forest-950">
                Our Christian Mission
              </h3>
              <p className="mt-2 text-sm text-forest-800/80">
                We believe Jesus Christ has called us to support and feed hungry babies and to
                stand beside needy mothers. Our work is not merely humanitarian — it is an act of
                obedience to the Gospel of compassion.
              </p>
              <p className="mt-2 text-sm text-forest-800/80">
                Every donation given, every meal served, and every medical bill paid is an
                expression of the love Christ commanded us to live.
              </p>
              <div className="mt-4 flex items-start gap-3 rounded-md bg-white px-4 py-3">
                <span className="text-gold-700">♥</span>
                <p className="text-sm text-forest-900">
                  Our process is intentionally simple:{" "}
                  <span className="font-semibold italic text-gold-700">we give.</span> We give to
                  every Ghanaian mother and baby, from all walks of life and every background,
                  without discrimination and without condition.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl shadow-xl lg:h-[24rem]">
            <Image
              src="/images/memorial/mama-1.jpg"
              alt="Ms. Gladys Aforo"
              fill
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-forest-950 py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {coreValues.map((v) => {
            const Icon = valueIcons[v.icon];
            return (
              <div key={v.title} className="text-center text-cream-200">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <h4 className="font-display text-lg font-semibold text-white">{v.title}</h4>
                <p className="mt-1 text-sm text-cream-300">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <DonateBanner
        title="Together, We Change Lives"
        subtitle="Your support brings hope, healing, and a future to mothers and children in need across Ghana."
      />
    </>
  );
}
