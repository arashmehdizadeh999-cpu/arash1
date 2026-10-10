import Link from 'next/link';
import { featuredImage } from '@/data/products';
import { ArrowIcon } from './Icons';

export default function FeaturedCollection() {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden h-[320px] lg:h-[440px]">
          <img
            src={featuredImage}
            alt="The Art of Less — VLORÉ collection"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="relative h-full flex items-center">
            <div className="max-w-lg px-2">
              <h2 className="font-serif text-3xl lg:text-5xl text-ivory font-light leading-tight mb-4">
                The Art of Less
              </h2>
              <p className="text-sm lg:text-base text-muted leading-relaxed mb-6">
                Thoughtfully designed pieces. Timeless by nature.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 border border-gold text-gold text-[11px] font-semibold tracking-[0.15em] uppercase px-7 py-3 hover:bg-gold hover:text-bg-dark transition-all duration-200"
              >
                Explore the Collection
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
