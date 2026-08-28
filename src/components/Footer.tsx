import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { site, navLinks } from "@/lib/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.1c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.03.24-3.45-.72-2.9-1.15-4.76-4.12-4.9-4.31-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.12.57.17.29.75 1.24 1.62 2.01 1.11 1 2.05 1.31 2.33 1.46.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.64.77 1.92.91.29.14.48.21.55.33.07.12.07.67-.17 1.35Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.47C16.24 4.4 15.4 4.32 14.4 4.32c-2.08 0-3.5 1.27-3.5 3.6v2.51H8.34v2.96h2.56V21h2.6Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-cream-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-3">
          <div className="flex gap-4">
            <Image
              src="/images/logo/logo.png"
              alt={site.name}
              width={64}
              height={78}
              className="h-16 w-auto shrink-0"
            />
            <div>
              <p className="font-display text-lg font-semibold text-white">{site.name}</p>
              <p className="text-sm text-gold-400">{site.tagline}</p>
              <p className="mt-1 text-xs text-cream-300">Est. in Honor of Ms. Gladys Aforo</p>
            </div>
          </div>

          <div className="md:border-x md:border-white/10 md:px-8 flex items-center">
            <blockquote className="font-display italic text-cream-200">
              &ldquo;{site.verse.text}&rdquo;
              <footer className="mt-2 not-italic text-sm text-gold-400">— {site.verse.ref}</footer>
            </blockquote>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-gold-400 mb-2">Navigate</p>
            <nav className="flex flex-wrap gap-x-2 gap-y-1 text-cream-300">
              {navLinks.map((l, i) => (
                <span key={l.href}>
                  <Link href={l.href} className="hover:text-gold-400">
                    {l.label}
                  </Link>
                  {i < navLinks.length - 1 && <span className="mx-2 text-white/20">|</span>}
                </span>
              ))}
            </nav>
            <p className="font-semibold text-gold-400 mt-4 mb-1">Contact</p>
            <p className="text-cream-300">{site.contact.address}</p>
            <p className="text-cream-300">{site.contact.phones.join(" · ")}</p>
            <p className="text-cream-300">{site.contact.email}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <p className="text-xs text-cream-300 text-center sm:text-left">
            © {new Date().getFullYear()} {site.name} · All Rights Reserved · Christian Non-Denominational
            Nonprofit Organization
          </p>
          <div className="flex items-center gap-3">
            <a
              href={site.social.facebook}
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-forest-950 transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-forest-950 transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={site.social.whatsapp}
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-forest-950 transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-forest-950 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
