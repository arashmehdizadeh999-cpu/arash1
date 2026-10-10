'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="pt-[52px] lg:pt-[56px]">
      <div className="py-10 lg:py-14 text-center border-b border-subtle/30">
        <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-2 font-medium">Get in Touch</p>
        <h1 className="font-serif text-3xl lg:text-4xl text-ivory font-light">Contact</h1>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 lg:py-16">
        <p className="text-sm text-muted text-center mb-10 leading-relaxed">
          Have a question about an order, a product, or anything else? We&apos;d love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[11px] tracking-[0.12em] uppercase text-muted block mb-2">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border border-subtle text-ivory text-sm px-4 py-3 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] tracking-[0.12em] uppercase text-muted block mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border border-subtle text-ivory text-sm px-4 py-3 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] tracking-[0.12em] uppercase text-muted block mb-2">Subject</label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-transparent border border-subtle text-ivory text-sm px-4 py-3 focus:border-gold focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[11px] tracking-[0.12em] uppercase text-muted block mb-2">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border border-subtle text-ivory text-sm px-4 py-3 focus:border-gold focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="bg-gold text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-[#D4B87A] transition-colors duration-200"
          >
            Send Message
          </button>
          {sent && (
            <p className="text-sm text-gold fade-in">Thank you. We&apos;ll be in touch shortly.</p>
          )}
        </form>
      </div>
    </div>
  );
}
