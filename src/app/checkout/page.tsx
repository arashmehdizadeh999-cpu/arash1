'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: '',
  });
  const [placed, setPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="pt-[52px] lg:pt-[56px] min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl text-ivory font-light mb-3">Order Confirmed</h1>
          <p className="text-sm text-muted mb-6">
            Thank you for your order. This is a demo checkout — no payment has been processed. You will receive a confirmation email shortly.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-gold text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase px-7 py-3 hover:bg-[#D4B87A] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-[52px] lg:pt-[56px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted text-sm mb-4">Your bag is empty.</p>
          <Link href="/shop" className="text-gold text-sm tracking-wide uppercase hover:text-ivory transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = 'w-full bg-transparent border border-subtle text-ivory text-sm px-4 py-3 focus:border-gold focus:outline-none transition-colors';
  const labelClass = 'text-[11px] tracking-[0.12em] uppercase text-muted block mb-2';

  return (
    <div className="pt-[52px] lg:pt-[56px]">
      <div className="py-10 text-center border-b border-subtle/30">
        <h1 className="font-serif text-3xl lg:text-4xl text-ivory font-light">Checkout</h1>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-sm tracking-[0.12em] uppercase text-ivory mb-4">Contact Information</h2>
              <input type="email" required placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
            <div>
              <h2 className="text-sm tracking-[0.12em] uppercase text-ivory mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" required placeholder="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className={inputClass} />
                <input type="text" required placeholder="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
              </div>
              <input type="text" required placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className={`${inputClass} mt-3`} />
              <div className="grid grid-cols-2 gap-3 mt-3">
                <input type="text" required placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className={inputClass} />
                <input type="text" required placeholder="ZIP / Postal Code" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} className={inputClass} />
              </div>
              <input type="text" required placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className={`${inputClass} mt-3`} />
            </div>

            <div>
              <h2 className="text-sm tracking-[0.12em] uppercase text-ivory mb-4">Payment</h2>
              <p className="text-xs text-muted mb-3">
                This is a demo store. No real payment will be processed.
              </p>
              <div className="border border-subtle p-4 text-center">
                <p className="text-sm text-muted">Demo Checkout — No payment required</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase py-3.5 hover:bg-[#D4B87A] transition-colors"
            >
              Place Order
            </button>
          </form>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-bg-secondary p-5">
              <h2 className="text-sm tracking-[0.12em] uppercase text-ivory mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-18 object-cover bg-bg-dark flex-shrink-0" style={{ height: '72px' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-ivory truncate">{item.product.name}</p>
                      <p className="text-xs text-muted">{item.color} · {item.size} · Qty {item.quantity}</p>
                      <p className="text-xs text-ivory mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-subtle/40 pt-3 space-y-2">
                <div className="flex justify-between text-sm text-muted">
                  <span>Subtotal</span>
                  <span className="text-ivory">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted">
                  <span>Shipping</span>
                  <span className="text-ivory">Free</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-subtle/40">
                  <span className="text-sm tracking-wide uppercase text-muted">Total</span>
                  <span className="text-lg font-serif text-ivory">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
