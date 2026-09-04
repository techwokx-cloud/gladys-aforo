"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-forest-900 text-cream-100 shadow-lg shadow-black/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo/logo.png"
            alt={site.name}
            width={56}
            height={68}
            className="h-12 w-auto sm:h-14"
            priority
          />
          <span className="leading-tight">
            <span className="block font-display text-sm sm:text-base font-semibold text-white">
              Gladys Aforo
              <span className="block sm:inline sm:ml-1">Pedee Newman Foundation</span>
            </span>
            <span className="hidden sm:block text-[11px] tracking-wide text-gold-400">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">
          <Link
            href="/about"
            className={`relative py-1 transition-colors hover:text-gold-400 ${
              pathname === "/about"
                ? "text-gold-400 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gold-500"
                : "text-cream-100"
            }`}
          >
            Our Story
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 transition-colors hover:text-gold-400 ${
                pathname === link.href
                  ? "text-gold-400 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gold-500"
                  : "text-cream-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
          >
            <Heart className="h-4 w-4 fill-forest-950" />
            Donate
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-cream-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-forest-900 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2 text-sm">
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className={`rounded-md px-2 py-2.5 ${
                pathname === "/about" ? "bg-white/5 text-gold-400" : "text-cream-100"
              }`}
            >
              Our Story
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-2 py-2.5 ${
                  pathname === link.href ? "bg-white/5 text-gold-400" : "text-cream-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950"
            >
              <Heart className="h-4 w-4 fill-forest-950" />
              Donate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
