import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function DonateBanner({
  title = "You Can Make a Difference Today",
  subtitle = "Your gift brings hope, healing, and a future to mothers and children in need.",
  image = "/images/gallery/g10.jpg",
}: {
  title?: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-950">
      <div className="absolute inset-0 opacity-25">
        <Image src={image} alt="" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/95 to-forest-950/70" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 sm:flex-row lg:px-8">
        <div className="text-center sm:text-left">
          <p className="mb-1 text-gold-400 text-lg">✝</p>
          <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">{title}</h3>
          <p className="mt-1 max-w-xl text-cream-300">{subtitle}</p>
        </div>
        <Link
          href="/donate"
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 font-semibold text-forest-950 transition-colors hover:bg-gold-400"
        >
          <Heart className="h-4 w-4 fill-forest-950" />
          Donate Now
        </Link>
      </div>
    </section>
  );
}
