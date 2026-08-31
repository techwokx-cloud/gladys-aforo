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
              <footer className="mt-1 text-sm not-italic text-gold-600">— The Founders</footer>
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

      {/* In Loving Memory */}
      <section className="bg-forest-950 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative order-2 h-96 overflow-hidden rounded-xl shadow-xl lg:order-1 lg:h-[30rem]">
            <Image
              src="/images/memorial/mama-2.jpg"
              alt="Ms. Gladys Aforo"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="In Loving Memory" title="Mama Gladys" accent="Our Angel" />
            <div className="mt-5 space-y-4 text-cream-200">
              <p>
                My beloved Grandma was the heart of our family. No matter how busy life became
                or how far apart we drifted, she made sure we never lost sight of what mattered
                most — family. She kept us together with laughter and joy, yet she was also a
                strict disciplinarian who taught us the difference between right and wrong.
              </p>
              <p>
                Amira, her beloved granddaughter, was tied to her apron strings and never lacked
                for anything. Mama devoted her entire life to raising her, at any cost. To
                everyone, she was &ldquo;Mama&apos;s last born,&rdquo; and she protected her with
                all her might until the very end.
              </p>
              <p>
                At this point, the only thing that will bring me peace is to honor you — even in
                your passing — through the Gladys Aforo Foundation, created to bring hope, joy,
                and life to babies and young children through the love of Jesus Christ, just as
                you did for me and my very young mother, who struggled to come to terms with all
                her hardships and suffering.
              </p>
              <blockquote className="rounded-lg border-l-4 border-gold-500 bg-white/5 px-5 py-4 font-display italic text-cream-100">
                To you, Mama, my very own angel — thank you. I will always love you, even in
                death. Not a day goes by that I don&apos;t think of you. I am so proud of
                everything you achieved and of the transformation you brought to my life.
              </blockquote>
              <p className="font-display text-lg italic text-gold-400">
                Mama, this is your foundation. I promise you — your legacy and your name will
                live on forever.
              </p>
              <p className="font-semibold text-white">
                Mama, you gave up everything, just so I could be comfortable.
              </p>
            </div>
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
              <p className="mt-2 text-sm italic text-gold-600">
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
                <span className="text-gold-500">♥</span>
                <p className="text-sm text-forest-900">
                  Our process is intentionally simple:{" "}
                  <span className="font-semibold italic text-gold-600">we give.</span> We give to
                  every Ghanaian mother and baby, from all walks of life and every background,
                  without discrimination and without condition.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl shadow-xl lg:h-[24rem]">
            <Image
              src="/images/gallery/g9.jpg"
              alt="Foundation representative with a mother and her newborn"
              fill
              className="object-cover"
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
