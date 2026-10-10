import Link from 'next/link';
import { categories, featuredImage, brandStoryImage } from '@/data/products';
import { ArrowIcon } from '@/components/Icons';

export default function CollectionsPage() {
  return (
    <div className="pt-[52px] lg:pt-[56px]">
      {/* Hero banner */}
      <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
        <img src={featuredImage} alt="VLORÉ Collections" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
            <div className="max-w-lg">
              <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-3 font-medium">Collections</p>
              <h1 className="font-serif text-4xl lg:text-5xl text-ivory font-light">
                Curated Edits
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <div className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {categories.map(cat => (
              <Link key={cat.name} href={cat.href} className="group relative overflow-hidden h-[200px] lg:h-[280px]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <p className="font-serif text-2xl text-ivory font-medium">{cat.name}</p>
                  <p className="text-[10px] tracking-[0.15em] text-gold uppercase mt-1 flex items-center justify-center gap-1">
                    Shop Now <ArrowIcon className="w-3 h-3" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured editorial */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 pb-14 lg:pb-20">
        <div className="relative overflow-hidden h-[300px] lg:h-[420px]">
          <img src={brandStoryImage} alt="The Art of Less" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="relative h-full flex items-center">
            <div className="max-w-lg px-2">
              <h2 className="font-serif text-3xl lg:text-5xl text-ivory font-light mb-4">The Art of Less</h2>
              <p className="text-sm lg:text-base text-muted leading-relaxed mb-6">
                Thoughtfully designed pieces. Timeless by nature.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 border border-gold text-gold text-[11px] font-semibold tracking-[0.15em] uppercase px-7 py-3 hover:bg-gold hover:text-bg-dark transition-all duration-200"
              >
                Explore the Collection <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
