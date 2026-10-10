'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { HeartIcon } from './Icons';
import { formatPrice, type Product } from '@/data/products';

export default function ProductCard({ product }: { product: Product }) {
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4] bg-bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleItem(product.id);
            }}
            className={`absolute top-3 right-3 p-1.5 rounded-full bg-black/30 backdrop-blur-sm transition-colors ${
              wishlisted ? 'text-gold' : 'text-ivory/70 hover:text-gold'
            }`}
            aria-label="Toggle wishlist"
          >
            <HeartIcon className="w-4 h-4" filled={wishlisted} />
          </button>
        </div>
      </Link>
      <div className="mt-3">
        <Link href={`/product/${product.id}`}>
          <p className="text-sm text-ivory tracking-wide hover:text-gold transition-colors">
            {product.name}
          </p>
        </Link>
        <p className="text-sm text-muted mt-0.5">{formatPrice(product.price)}</p>
        <div className="flex items-center gap-1.5 mt-2">
          {product.colors.map(c => (
            <span
              key={c.name}
              className="w-3 h-3 rounded-full border border-subtle"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
