'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section className="py-14 lg:py-20 border-t border-subtle/30">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-3 font-medium">
          Newsletter
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl text-ivory font-light mb-3">
          Join the VLORÉ List
        </h2>
        <p className="text-sm text-muted mb-6">
          Discover new arrivals, private edits, and stories from the world of VLORÉ.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setStatus('idle');
            }}
            placeholder="Enter your email"
            className="flex-1 bg-transparent border border-subtle text-ivory text-sm px-4 py-3 placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="bg-gold text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase px-7 py-3 hover:bg-[#D4B87A] transition-colors duration-200 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        {status === 'success' && (
          <p className="text-sm text-gold mt-3 fade-in">Thank you for joining the VLORÉ list.</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-400/80 mt-3 fade-in">Please enter a valid email address.</p>
        )}
      </div>
    </section>
  );
}
