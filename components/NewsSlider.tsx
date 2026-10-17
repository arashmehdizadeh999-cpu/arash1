'use client';

import { useRef } from 'react';
import NewsCard from './NewsCard';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: string;
  views: number;
  publishedAt: Date | string | null;
  createdAt?: Date;
  province: { name: string };
  county: { name: string } | null;
  category: { name: string };
}

interface NewsSliderProps {
  title: string;
  description?: string;
  news: NewsItem[];
}

export default function NewsSlider({ title, description, news }: NewsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    // In RTL, "right" arrow should scroll to show next items (scrollLeft decreases)
    scrollRef.current.scrollBy({ left: dir === 'right' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="neon-line h-12 w-1 rounded-full shrink-0"></span>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
            {description && <p className="mt-1 text-xs text-gray-400 sm:text-sm">{description}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('right')}
            className="flex h-9 w-9 items-center justify-center rounded-lg glass-card text-gray-300 hover:text-neon hover:border-neon/40 transition-colors"
            aria-label="قبلی"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <button
            onClick={() => scroll('left')}
            className="flex h-9 w-9 items-center justify-center rounded-lg glass-card text-gray-300 hover:text-neon hover:border-neon/40 transition-colors"
            aria-label="بعدی"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {news.map((item) => (
          <div key={item.id} className="w-[280px] shrink-0 sm:w-[320px]">
            <NewsCard news={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
