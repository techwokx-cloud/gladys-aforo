import { Cross, ShieldCheck, Users, HandHeart, Landmark } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import DonateBanner from "@/components/DonateBanner";
import { commitments } from "@/lib/site";
import { listTeam } from "@/lib/store";

export const metadata = { title: "Leadership | Gladys Aforo Pedee Newman Foundation" };
export const dynamic = "force-dynamic";

const commitmentIcons: Record<string, React.ElementType> = {
  cross: Cross,
  shield: ShieldCheck,
  users: Users,
  "hand-heart": HandHeart,
  landmark: Landmark,
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default async function LeadershipPage() {
  const team = await listTeam();
  const boardOfDirectors = team.filter((m) => m.type === "board").sort((a, b) => a.order - b.order);
  const executiveStaff = team.filter((m) => m.type === "staff").sort((a, b) => a.order - b.order);

  return (
    <>
      <Breadcrumb current="Leadership" />

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-cream-100 px-4 py-16 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Governance"
            title="Leadership Rooted"
            accent="in Faith."
          />
          <p className="mt-2 font-display text-2xl text-forest-950">
            Guided by <span className="italic text-gold-700">Purpose.</span> Driven by{" "}
            <span className="italic text-gold-700">Love.</span>
          </p>
          <p className="mt-5 text-forest-800/80">
            Our leadership is committed to good stewardship, transparency, and faithful service to
            mothers and children across Ghana. Together, we serve with integrity and compassion.
          </p>
          <blockquote className="mt-6 rounded-lg border-l-4 border-gold-500 bg-cream-200 px-5 py-4 font-display italic text-forest-900">
            &ldquo;Whoever wants to become great among you must be your servant.&rdquo;
            <footer className="mt-1 text-sm not-italic text-gold-700">— Matthew 20:26</footer>
          </blockquote>
        </div>
        <div className="flex items-center justify-center bg-forest-950 px-4 py-16 text-center sm:px-6 lg:px-10">
          <div>
            <Cross className="mx-auto mb-4 h-8 w-8 text-gold-400" />
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Serving Mothers &amp; Children
              <br />
              <span className="italic text-gold-400">In the Name of Christ</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-cream-300">
              We are committed to faith-driven leadership, responsible stewardship, and impactful
              service to every family we touch.
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3 text-gold-500">
              <span className="h-px w-10 bg-gold-500/50" />
              <span>♥</span>
              <span className="h-px w-10 bg-gold-500/50" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="Board of" accent="Directors" center />
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {boardOfDirectors.map((m) => (
            <div key={m.id} className="text-center">
              <div className="relative mx-auto mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-cream-300 font-display text-2xl font-semibold text-forest-800">
                {m.photo ? (
                  <SafeImage src={m.photo} alt={m.name} fill className="object-cover" />
                ) : (
                  initials(m.name)
                )}
              </div>
              <h4 className="font-display text-base font-semibold text-forest-950">{m.name}</h4>
              <p className="mt-1 text-xs text-gold-700">{m.role}</p>
            </div>
          ))}
        </div>

        <SectionHeading title="Executive" accent="Staff" center />
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {executiveStaff.map((m) => (
            <div key={m.id} className="rounded-lg border border-forest-900/10 bg-cream-200 p-6 text-center">
              <div className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-cream-300 font-display text-xl font-semibold text-forest-800">
                {m.photo ? (
                  <SafeImage src={m.photo} alt={m.name} fill className="object-cover" />
                ) : (
                  initials(m.name)
                )}
              </div>
              <h4 className="font-display text-lg font-semibold text-forest-950">{m.name}</h4>
              <p className="mt-1 text-xs font-medium text-gold-700">{m.role}</p>
              <p className="mt-2 text-sm text-forest-800/80">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest-950 py-14">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          Our Commitment to Excellence
        </p>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-5 lg:px-8">
          {commitments.map((c) => {
            const Icon = commitmentIcons[c.icon];
            return (
              <div key={c.title} className="text-center text-cream-200">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <h4 className="font-display text-base font-semibold text-white">{c.title}</h4>
                <p className="mt-1 text-xs text-cream-300">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <DonateBanner
        title="Strong Leadership. Greater Impact."
        subtitle="Together, we can reach more mothers, save more babies, and bring hope to more families."
      />
    </>
  );
}
