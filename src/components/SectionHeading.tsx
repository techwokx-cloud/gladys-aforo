import { Heart } from "lucide-react";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 ${
            center ? "justify-center" : ""
          } ${light ? "text-gold-400" : ""}`}
        >
          <span>{eyebrow}</span>
          <span className="h-px w-8 bg-gold-500/50" />
          <Heart className="h-3 w-3 fill-gold-500 text-gold-500" />
        </div>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl font-semibold ${light ? "text-white" : "text-forest-950"}`}>
        {title} {accent && <span className="italic text-gold-500">{accent}</span>}
      </h2>
    </div>
  );
}
