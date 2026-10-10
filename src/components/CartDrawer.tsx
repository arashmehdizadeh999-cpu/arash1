'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CloseIcon, PlusIcon, MinusIcon, BagIcon } from './Icons';
import { formatPrice } from '@/data/products';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/60" onClick={closeCart} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-bg-dark border-l border-subtle flex flex-col slide-in-right">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-subtle/50">
              <div className="flex items-center gap-2">
                <BagIcon className="w-5 h-5 text-ivory" />
                <span className="text-sm tracking-[0.12em] uppercase text-ivory">
                  Shopping Bag ({itemCount})
                </span>
              </div>
              <button onClick={closeCart} className="text-muted hover:text-ivory transition-colors">
                <CloseIcon />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <BagIcon className="w-10 h-10 text-subtle mb-4" />
                  <p className="text-muted text-sm mb-2">Your shopping bag is empty.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="text-[11px] tracking-[0.15em] text-gold uppercase hover:text-ivory transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover bg-bg-secondary flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ivory truncate">{item.product.name}</p>
                        <p className="text-xs text-muted mt-0.5">
                          {item.color} · Size {item.size}
                        </p>
                        <p className="text-sm text-ivory mt-1">{formatPrice(item.product.price)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-subtle">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                              }
                              className="p-1 text-muted hover:text-ivory transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm text-ivory">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                              }
                              className="p-1 text-muted hover:text-ivory transition-colors"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                            className="text-xs text-muted hover:text-red-400/80 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-subtle/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted tracking-wide uppercase">Subtotal</span>
                  <span className="text-lg text-ivory font-serif">{formatPrice(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block text-center bg-gold text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase py-3.5 hover:bg-[#D4B87A] transition-colors duration-200"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-[11px] tracking-[0.15em] text-muted hover:text-gold uppercase mt-3 transition-colors"
                >
                  View Bag
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
