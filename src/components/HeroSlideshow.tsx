"use client";

import SafeImage from "@/components/SafeImage";
import { useEffect, useState } from "react";

type Photo = { src: string; alt: string };

/**
 * Fades between the given photos, one at a time. Pass in more photos
 * (e.g. from an admin panel later) and it will just cycle through all of them.
 */
export default function HeroSlideshow({
  photos,
  intervalMs = 6000,
}: {
  photos: Photo[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [photos.length, intervalMs]);

  return (
    <div className="absolute inset-0">
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <SafeImage
            src={photo.src}
            alt={photo.alt}
            fill
            priority={i === 0}
            className="object-cover object-bottom"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />

      {photos.length > 1 && (
        <div className="absolute bottom-5 right-5 z-10 flex gap-2">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-gold-400" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
