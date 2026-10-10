'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products, formatPrice, type Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { HeartIcon, ArrowIcon, PlusIcon, MinusIcon } from '@/components/Icons';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
        <p className="text-muted text-lg mb-4">Product not found.</p>
        <Link href="/shop" className="text-gold text-sm tracking-wide uppercase hover:text-ivory transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallbackRelated = products.filter(p => p.id !== product.id).slice(0, 4);
  const relatedProducts = related.length >= 2 ? related : fallbackRelated;

  const handleAddToBag = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="pt-[52px] lg:pt-[56px]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-muted mb-6">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-ivory">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="relative overflow-hidden aspect-[3/4] bg-bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="lg:py-4">
            <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-2 font-medium">
              {product.category}
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl text-ivory font-light mb-3">
              {product.name}
            </h1>
            <p className="text-xl text-ivory mb-6">{formatPrice(product.price)}</p>
            <p className="text-sm text-muted leading-relaxed mb-8">{product.description}</p>

            {/* Color */}
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.12em] uppercase text-muted mb-3">
                Color: <span className="text-ivory">{selectedColor}</span>
              </p>
              <div className="flex items-center gap-2">
                {product.colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === c.name ? 'border-gold' : 'border-subtle'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.12em] uppercase text-muted mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[44px] px-3 py-2.5 text-sm border transition-all ${
                      selectedSize === s
                        ? 'border-gold text-gold'
                        : 'border-subtle text-muted hover:border-muted hover:text-ivory'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.12em] uppercase text-muted mb-3">Quantity</p>
              <div className="flex items-center border border-subtle w-fit">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2.5 text-muted hover:text-ivory transition-colors"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="px-5 text-sm text-ivory">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2.5 text-muted hover:text-ivory transition-colors"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={handleAddToBag}
                className="flex-1 bg-gold text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase py-3.5 hover:bg-[#D4B87A] transition-colors duration-200"
              >
                {added ? 'Added to Bag ✓' : 'Add to Bag'}
              </button>
              <button
                onClick={() => toggleItem(product.id)}
                className={`p-3.5 border border-subtle transition-colors ${
                  wishlisted ? 'text-gold border-gold' : 'text-muted hover:text-gold hover:border-gold'
                }`}
                aria-label="Toggle wishlist"
              >
                <HeartIcon className="w-5 h-5" filled={wishlisted} />
              </button>
            </div>

            {/* Info */}
            <div className="space-y-2 pt-6 border-t border-subtle/30">
              <p className="text-xs text-muted">✓ Premium fabrics, ethically sourced</p>
              <p className="text-xs text-muted">✓ Free worldwide shipping over ₹5,000</p>
              <p className="text-xs text-muted">✓ 30-day returns</p>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-16 lg:mt-24 pt-10 border-t border-subtle/30">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-serif text-2xl lg:text-3xl text-ivory font-light">
              You May Also Like
            </h2>
            <Link
              href="/shop"
              className="text-[11px] tracking-[0.15em] text-muted hover:text-gold uppercase flex items-center gap-1 transition-colors"
            >
              View All <ArrowIcon className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
