'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products, formatPrice } from '@/data/products';
import { SearchIcon, CloseIcon } from './Icons';

export default function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = (e: Event) => {
      setIsOpen((e as CustomEvent).detail);
    };
    window.addEventListener('vlore-search-toggle', handler);
    return () => window.removeEventListener('vlore-search-toggle', handler);
  }, []);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!isOpen) return null;

  const results = query
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-[80] bg-bg-dark/95 backdrop-blur-md fade-in">
      <div className="mx-auto max-w-3xl px-4 pt-20 pb-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm tracking-[0.12em] uppercase text-muted">Search</span>
          <button onClick={() => setIsOpen(false)} className="text-muted hover:text-ivory transition-colors">
            <CloseIcon />
          </button>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            placeholder="Search products..."
            className="w-full bg-transparent border-b border-subtle text-ivory text-lg pl-8 pr-4 py-3 placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
          />
        </div>

        {/* Results */}
        {query && (
          <div className="mt-8">
            {results.length === 0 ? (
              <p className="text-muted text-sm text-center py-8">
                No products found. Try a different search.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {results.map(p => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={() => setIsOpen(false)}
                    className="group"
                  >
                    <div className="relative overflow-hidden aspect-[3/4] bg-bg-secondary">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-sm text-ivory mt-2 group-hover:text-gold transition-colors">{p.name}</p>
                    <p className="text-sm text-muted">{formatPrice(p.price)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
