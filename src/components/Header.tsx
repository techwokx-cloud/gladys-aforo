"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, ChevronDown } from "lucide-react";
import { navLinks, site } from "@/lib/site";

const ourStoryLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/support", label: "Our Support" },
  { href: "/impact", label: "See Our Impact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const pathname = usePathname();
  const isStoryActive = ourStoryLinks.some((l) => l.href === pathname);

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
            <span className="block font-display text-base sm:text-lg font-semibold text-white">
              Gladys Aforo
              <span className="block sm:inline sm:ml-1">Foundation</span>
            </span>
            <span className="hidden sm:block text-[11px] tracking-wide text-gold-400">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">
          <div
            className="relative"
            onMouseEnter={() => setStoryOpen(true)}
            onMouseLeave={() => setStoryOpen(false)}
          >
            <button
              onClick={() => setStoryOpen((v) => !v)}
              className={`relative flex items-center gap-1 py-1 transition-colors hover:text-gold-400 ${
                isStoryActive
                  ? "text-gold-400 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gold-500"
                  : "text-cream-100"
              }`}
              aria-expanded={storyOpen}
            >
              Our Story
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${storyOpen ? "rotate-180" : ""}`} />
            </button>

            {storyOpen && (
              <div className="absolute left-0 top-full pt-2">
                <div className="w-48 overflow-hidden rounded-md border border-white/10 bg-forest-900 shadow-xl shadow-black/20">
                  {ourStoryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setStoryOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-gold-400 ${
                        pathname === link.href ? "text-gold-400" : "text-cream-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

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
            <span className="px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-gold-400">
              Our Story
            </span>
            {ourStoryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-4 py-2.5 ${
                  pathname === link.href ? "bg-white/5 text-gold-400" : "text-cream-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-1 border-t border-white/10" />
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
