'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import { PlusIcon, MinusIcon, BagIcon } from '@/components/Icons';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <div className="pt-[52px] lg:pt-[56px] min-h-screen">
      <div className="py-10 lg:py-14 text-center border-b border-subtle/30">
        <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-2 font-medium">Your Bag</p>
        <h1 className="font-serif text-3xl lg:text-4xl text-ivory font-light">
          Shopping Bag ({itemCount})
        </h1>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-10">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BagIcon className="w-12 h-12 text-subtle mb-5" />
            <p className="text-muted text-sm mb-4">Your shopping bag is empty.</p>
            <Link
              href="/shop"
              className="bg-gold text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase px-7 py-3 hover:bg-[#D4B87A] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-5">
              {items.map((item, i) => (
                <div key={i} className="flex gap-4 pb-5 border-b border-subtle/30">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-32 object-cover bg-bg-secondary flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-ivory">{item.product.name}</p>
                        <p className="text-xs text-muted mt-1">{item.color} · Size {item.size}</p>
                        <p className="text-sm text-ivory mt-2">{formatPrice(item.product.price)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="text-xs text-muted hover:text-red-400/80 transition-colors self-start"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center border border-subtle w-fit mt-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="p-1.5 text-muted hover:text-ivory transition-colors"
                      >
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm text-ivory">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="p-1.5 text-muted hover:text-ivory transition-colors"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-bg-secondary p-6">
                <h2 className="text-sm tracking-[0.12em] uppercase text-ivory mb-4">Order Summary</h2>
                <div className="flex justify-between text-sm text-muted mb-2">
                  <span>Subtotal</span>
                  <span className="text-ivory">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted mb-2">
                  <span>Shipping</span>
                  <span className="text-ivory">Free</span>
                </div>
                <div className="border-t border-subtle/40 mt-4 pt-4 flex justify-between">
                  <span className="text-sm tracking-wide uppercase text-muted">Total</span>
                  <span className="text-lg font-serif text-ivory">{formatPrice(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="block text-center bg-gold text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase py-3.5 mt-5 hover:bg-[#D4B87A] transition-colors"
                >
                  Checkout
                </Link>
                <Link
                  href="/shop"
                  className="block text-center text-[11px] tracking-[0.15em] text-muted hover:text-gold uppercase mt-3 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
