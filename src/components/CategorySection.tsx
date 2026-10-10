import Link from 'next/link';
import { categories } from '@/data/products';
import { ArrowIcon } from './Icons';

export default function CategorySection() {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-3 font-medium">
            Shop by Category
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-ivory font-light">
            Elevated Essentials
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {categories.map(cat => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative overflow-hidden h-[160px] lg:h-[190px]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <p className="font-serif text-xl text-ivory font-medium tracking-wide">
                  {cat.name}
                </p>
                <p className="text-[10px] tracking-[0.15em] text-gold uppercase mt-1 flex items-center justify-center gap-1">
                  Shop Now <ArrowIcon className="w-3 h-3" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
