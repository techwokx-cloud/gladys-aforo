"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

/**
 * Drop-in replacement for next/image's <Image> that shows a clean
 * placeholder icon instead of the browser's broken-image glyph when the
 * file is missing (e.g. an upload that didn't survive a redeploy).
 */
export default function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-cream-300 text-forest-800/30">
        <ImageOff className="h-1/3 w-1/3" strokeWidth={1.5} />
      </div>
    );
  }

  // eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and passed through
  return <Image {...props} onError={() => setFailed(true)} />;
}
