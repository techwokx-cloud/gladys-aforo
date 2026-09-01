import { listGalleryImages, listMemorialPhotos } from "@/lib/store";
import GalleryManager from "@/components/dashboard/GalleryManager";

export const metadata = { title: "Gallery | Dashboard" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const gallery = await listGalleryImages();
  const memorial = await listMemorialPhotos();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-950">Photos</h1>
      <p className="mt-1 max-w-2xl text-sm text-forest-800/60">
        Add, view, and remove photos used across the website.
      </p>
      <GalleryManager initialGallery={gallery} initialMemorialPhotos={memorial} />
    </div>
  );
}
