import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import DonateBanner from "@/components/DonateBanner";
import { listGalleryImages } from "@/lib/store";

export const metadata = { title: "Gallery | Gladys Aforo Foundation" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const galleryImages = await listGalleryImages();

  return (
    <>
      <Breadcrumb current="Gallery" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Moments of Grace"
          title="Our Work in"
          accent="Pictures"
          center
        />
        <p className="mx-auto mt-4 max-w-2xl text-center text-forest-800/80">
          A glimpse into the hospitals, homes, and communities where our team serves mothers and
          children across Accra — one visit, one gift, one prayer at a time.
        </p>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-forest-900/10 bg-white shadow-sm"
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "1/1" : "4/3" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <DonateBanner />
    </>
  );
}
