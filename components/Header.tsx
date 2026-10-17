'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getProvinces, getCategories } from '@/lib/data';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'اخبار مهم', href: '/news/important' },
  { label: 'آخرین اخبار', href: '/news/latest' },
  { label: 'پربازدیدترین', href: '/news/popular' },
  { label: 'دسته‌بندی‌ها', href: '/categories' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="glass sticky top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon/10 border border-neon/30">
                  <span className="text-neon text-xl font-bold">ش</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg font-bold text-white leading-tight">اخبار شمال</div>
                  <div className="text-[10px] text-neon/70 leading-tight">گیلان · گلستان · مازندران</div>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm text-gray-300 hover:text-neon transition-colors rounded-md hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side: search + social + menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 hover:text-neon hover:bg-white/5 transition-colors"
                aria-label="جستجو"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>

              <div className="hidden sm:flex items-center gap-1">
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-neon hover:bg-white/5 transition-colors" aria-label="تلگرام">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.47.94-4.14 2.74-.39.27-.75.4-1.07.4-.35 0-1.03-.2-1.53-.36-.62-.2-1.1-.31-1.06-.65.02-.18.26-.36.72-.55 2.82-1.23 4.7-2.05 5.64-2.44 2.69-1.12 3.25-1.32 3.61-1.32.08 0 .26.02.38.12.1.08.13.19.12.27-.01.06.01.24 0 .38z"/></svg>
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-neon hover:bg-white/5 transition-colors" aria-label="اینستاگرام">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.36 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.41-10.4a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-neon hover:bg-white/5 transition-colors" aria-label="ایکس">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>

              <Link
                href="/admin"
                className="hidden sm:flex h-9 items-center gap-1.5 rounded-lg border border-neon/30 bg-neon/10 px-3 text-sm text-neon hover:bg-neon/20 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 1v6m0 10v6m11-11h-6M7 12H1m17.66-7.66-4.24 4.24M9.58 14.42l-4.24 4.24m12.72 0-4.24-4.24M9.58 9.58 5.34 5.34"/></svg>
                پنل مدیریت
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 hover:text-neon hover:bg-white/5 transition-colors"
                aria-label="منو"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {menuOpen ? <path d="M6 18 18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <form action="/search" method="GET" className="flex gap-2">
                <input
                  name="q"
                  type="text"
                  placeholder="جستجوی خبر..."
                  autoFocus
                  className="flex-1 rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50"
                />
                <button type="submit" className="rounded-lg bg-neon px-4 py-2.5 text-sm font-medium text-navy-950 hover:bg-neon/90 transition-colors">
                  جستجو
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-white/5 bg-navy-900/95 backdrop-blur-lg px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm text-gray-300 hover:text-neon transition-colors border-b border-white/5 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-sm text-neon border-b border-white/5"
            >
              پنل مدیریت
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
