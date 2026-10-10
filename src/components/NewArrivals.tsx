import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { ArrowIcon } from './Icons';

export default function NewArrivals() {
  return (
    <section className="py-14 lg:py-20 border-t border-subtle/30">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 lg:mb-10">
          <div>
            <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-2 font-medium">
              New Arrivals
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl text-ivory font-light">
              The Latest Edit
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[11px] tracking-[0.15em] text-muted hover:text-gold uppercase flex items-center gap-1 transition-colors"
          >
            View All <ArrowIcon className="w-3 h-3" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
