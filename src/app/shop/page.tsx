'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, formatPrice } from '@/data/products';
import ProductCard from '@/components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return ['All', ...Array.from(sizes).sort()];
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== 'All') result = result.filter(p => p.category === category);
    if (selectedSize !== 'All') result = result.filter(p => p.sizes.includes(selectedSize));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    return result;
  }, [category, sortBy, searchQuery, selectedSize]);

  const categories = ['All', 'Men', 'Women', 'Tops', 'Accessories'];

  return (
    <div className="pt-[52px] lg:pt-[56px] min-h-screen">
      {/* Page header */}
      <div className="py-10 lg:py-14 text-center border-b border-subtle/30">
        <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-2 font-medium">
          The Collection
        </p>
        <h1 className="font-serif text-3xl lg:text-4xl text-ivory font-light">
          Shop All
        </h1>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-8">
        {/* Filters bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-subtle/30">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 transition-colors ${
                  category === cat
                    ? 'text-gold border-b border-gold'
                    : 'text-muted hover:text-ivory'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent border border-subtle text-ivory text-sm px-3 py-2 placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors w-32 lg:w-40"
            />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-transparent border border-subtle text-muted text-sm px-3 py-2 focus:border-gold focus:outline-none transition-colors cursor-pointer"
            >
              <option value="newest" className="bg-bg-dark">Newest</option>
              <option value="price-low" className="bg-bg-dark">Price: Low to High</option>
              <option value="price-high" className="bg-bg-dark">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Size filter */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[11px] tracking-[0.12em] uppercase text-muted">Size:</span>
          {allSizes.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`text-[11px] tracking-wide px-2 py-1 transition-colors ${
                selectedSize === s
                  ? 'text-gold border-b border-gold'
                  : 'text-muted hover:text-ivory'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-sm">No products match your filters.</p>
            <button
              onClick={() => {
                setCategory('All');
                setSelectedSize('All');
                setSearchQuery('');
              }}
              className="text-[11px] tracking-[0.15em] text-gold uppercase mt-3 hover:text-ivory transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-20 text-center text-muted">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
