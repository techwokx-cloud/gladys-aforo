import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="border-b border-forest-900/10 bg-cream-200">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-forest-800/70 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5 hover:text-gold-600">
          <Home className="h-3.5 w-3.5" />
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-forest-950 font-medium">{current}</span>
      </div>
    </div>
  );
}
