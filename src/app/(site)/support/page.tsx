import Image from "next/image";
import { HandHeart, HeartPulse, Baby, Soup, ShieldPlus } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import DonateBanner from "@/components/DonateBanner";
import SupportRequestForm from "@/components/SupportRequestForm";
import { supportRequestInfo, site } from "@/lib/site";

export const metadata = { title: "Request Support | Gladys Aforo Foundation" };

const supportIcons: Record<string, React.ElementType> = {
  "heart-pulse": HeartPulse,
  baby: Baby,
  soup: Soup,
  "shield-plus": ShieldPlus,
  "hand-heart": HandHeart,
};

function SidebarHeading({ title }: { title: string }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-forest-950">{title}</h3>
      <div className="mt-2 flex items-center gap-2 text-gold-500">
        <span className="h-px w-6 bg-gold-500/50" />
        <span className="text-xs">♥</span>
        <span className="h-px w-6 bg-gold-500/50" />
      </div>
    </div>
  );
}

export default function SupportPage() {
  return (
    <>
      <Breadcrumb current="Request Support" />

      <section className="relative overflow-hidden bg-forest-900">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <HandHeart className="h-5 w-5 text-gold-400" />
            </div>
            <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Are you a nurse or caregiver who has identified a family in need?
            </h1>
            <p className="mt-4 max-w-md text-cream-300">
              Submit a request for funds or support and our team will review it promptly.
            </p>
            <a
              href="#request-form"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-forest-950 transition-colors hover:bg-gold-400"
            >
              Submit a Request
            </a>
          </div>
          <div className="relative h-64 lg:h-auto">
            <Image
              src="/images/gallery/g6.jpg"
              alt="Foundation team caring for a mother and child"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-forest-900/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900 to-transparent lg:w-24" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[20rem_1fr] lg:px-8">
        <aside className="space-y-8">
          <div>
            <SidebarHeading title="Who Can Submit a Request?" />
            <p className="mt-3 text-sm text-forest-800/80">{supportRequestInfo.whoCanSubmit}</p>
          </div>

          <div className="border-t border-forest-900/10 pt-6">
            <SidebarHeading title="What We Support" />
            <ul className="mt-4 space-y-3">
              {supportRequestInfo.whatWeSupport.map((item) => {
                const Icon = supportIcons[item.icon];
                return (
                  <li key={item.title} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-300">
                      <Icon className="h-4 w-4 text-forest-800" />
                    </span>
                    <span className="text-sm text-forest-900">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-forest-900/10 pt-6">
            <SidebarHeading title="Our Commitment" />
            <p className="mt-3 text-sm text-forest-800/80">{supportRequestInfo.commitment}</p>
          </div>

          <blockquote className="rounded-lg border-l-4 border-gold-500 bg-cream-200 px-5 py-4 font-display italic text-forest-900">
            &ldquo;{site.verse.text}&rdquo;
            <footer className="mt-1 text-sm not-italic text-gold-600">— {site.verse.ref}</footer>
          </blockquote>
        </aside>

        <div id="request-form" className="scroll-mt-24 rounded-xl border border-forest-900/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="font-display text-2xl font-semibold text-forest-950">Request for Support</h2>
            <div className="mx-auto mt-2 h-px w-10 bg-gold-500/50" />
          </div>
          <SupportRequestForm />
        </div>
      </section>

      <DonateBanner
        title="Together, we can bring hope and restore dignity."
        subtitle="Thank you for being the hands and feet of Christ."
      />
    </>
  );
}
