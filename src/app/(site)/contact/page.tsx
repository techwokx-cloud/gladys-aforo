import Image from "next/image";
import { MapPin, Phone, HandHeart, Mail } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata = { title: "Contact Us | Gladys Aforo Foundation" };

export default function ContactPage() {
  return (
    <>
      <Breadcrumb current="Contact" />

      <section className="relative overflow-hidden bg-forest-950">
        <div className="absolute inset-0 opacity-25">
          <Image src="/images/gallery/g6.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/90 to-forest-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">Contact Us</h1>
          <div className="mt-3 flex items-center gap-3 text-gold-500">
            <span className="h-px w-10 bg-gold-500/60" />
            <span>♥</span>
            <span className="h-px w-10 bg-gold-500/60" />
          </div>
          <p className="mt-4 max-w-xl text-cream-300">
            We are here to serve, support, and walk with you. Reach out to us for partnership,
            support, or inquiries.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-forest-900/10 bg-cream-100 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest-900">
              <MapPin className="h-5 w-5 text-gold-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-forest-950">Get In Touch</h3>
            <div className="mx-auto my-2 h-px w-10 bg-gold-500/40" />
            <p className="text-sm text-forest-800/80">
              We would love to hear from you. Whether you are a mother in need, a donor, a
              partner, or a supporter, our team is ready to respond.
            </p>
            <div className="relative mt-5 h-32 overflow-hidden rounded-md">
              <Image src="/images/gallery/g4.jpg" alt="Foundation team" fill className="object-cover" />
            </div>
          </div>

          <div className="rounded-lg border border-forest-900/10 bg-cream-100 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest-900">
              <Phone className="h-5 w-5 text-gold-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-forest-950">Contact Information</h3>
            <div className="mx-auto my-2 h-px w-10 bg-gold-500/40" />
            <ul className="space-y-3 text-left text-sm text-forest-800/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {site.contact.address}
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {site.contact.phones.join(" · ")}
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {site.contact.email}
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-forest-900/10 bg-cream-100 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest-900">
              <HandHeart className="h-5 w-5 text-gold-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-forest-950">Support Our Work</h3>
            <div className="mx-auto my-2 h-px w-10 bg-gold-500/40" />
            <p className="text-sm text-forest-800/80">
              Nurses can request funds or supplies. Donors can give directly by mobile money.
            </p>
            <div className="mt-5 space-y-3">
              {site.contact.momo.map((m) => (
                <div
                  key={m.network}
                  className="flex items-center justify-between rounded-md border border-forest-900/10 bg-white px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-forest-900">{m.network}</span>
                  <span className="text-sm font-semibold text-gold-600">{m.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <h3 className="text-center font-display text-2xl font-semibold text-forest-950">
            Send Us a <span className="italic text-gold-500">Message</span>
          </h3>
          <p className="mt-2 text-center text-sm text-forest-800/70">
            Fill out the form and our team will get back to you as soon as possible.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
