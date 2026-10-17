'use client';

import Link from 'next/link';

interface BreakingItem {
  id: string;
  title: string;
  slug: string;
  province: { name: string };
}

export default function BreakingNews({ items }: { items: BreakingItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="border-y border-red-500/20 bg-red-950/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-3 py-2.5">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-red-400">فوری</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="ticker-animation flex gap-8">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="text-sm text-gray-200 hover:text-neon transition-colors whitespace-nowrap"
                >
                  {item.title}
                  <span className="text-red-400/50 mr-2">— {item.province.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
