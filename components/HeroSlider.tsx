'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { formatDate, formatNumber } from '@/lib/utils';

interface Slide {
  id: string;
  title: string;
  summary: string;
  slug: string;
  image: string;
  province: { name: string };
  county: { name: string } | null;
  category: { name: string };
  views: number;
  publishedAt: Date | string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-navy-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[70vh] min-h-[420px] w-full sm:h-[75vh] sm:min-h-[480px] lg:h-[85vh] lg:min-h[560px]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              fill
              src={slide.image}
              alt={slide.title}
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 hero-overlay" />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-24">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-md bg-neon px-2.5 py-1 text-xs font-bold text-navy-950">
                  {slides[current].category.name}
                </span>
                <span className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                  {slides[current].province.name}
                  {slides[current].county ? ` · ${slides[current].county.name}` : ''}
                </span>
              </div>
              <h1 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-5xl">
                {slides[current].title}
              </h1>
              <p className="mb-5 text-sm text-gray-300 sm:text-base lg:text-lg line-clamp-2 max-w-2xl">
                {slides[current].summary}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/news/${slides[current].slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-neon px-6 py-3 text-sm font-bold text-navy-950 hover:bg-neon/90 transition-colors neon-glow"
                >
                  مطالعه خبر
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </Link>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    {formatNumber(slides[current].views)}
                  </span>
                  <span>{formatDate(slides[current].publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full glass-card text-white hover:text-neon hover:border-neon/40 transition-colors z-10"
              aria-label="قبلی"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button
              onClick={next}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full glass-card text-white hover:text-neon hover:border-neon/40 transition-colors z-10"
              aria-label="بعدی"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          </>
        )}

        {/* Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? 'w-8 bg-neon' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`اسلاید ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
