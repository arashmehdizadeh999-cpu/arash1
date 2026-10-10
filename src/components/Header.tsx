'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SearchIcon, UserIcon, BagIcon, MenuIcon, CloseIcon } from './Icons';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'SHOP', href: '/shop' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'ABOUT', href: '/about' },
  { label: 'JOURNAL', href: '/journal' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('vlore-search-toggle', { detail: searchOpen }));
  }, [searchOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-header/95 backdrop-blur-sm border-b border-subtle/50">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-[52px] lg:h-[56px]">
            {/* Left: Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-serif text-xl lg:text-2xl tracking-[0.25em] text-ivory font-medium">
                VLOR<span className="text-gold">É</span>
              </span>
            </Link>

            {/* Center: Nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 relative py-2 ${
                    isActive(link.href) ? 'text-ivory' : 'text-muted hover:text-ivory'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-px bg-gold" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right: Icons */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button
                onClick={() => setSearchOpen(s => !s)}
                className="text-muted hover:text-ivory transition-colors duration-200"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
              <Link
                href="/account"
                className="text-muted hover:text-ivory transition-colors duration-200 hidden sm:block"
                aria-label="Account"
              >
                <UserIcon />
              </Link>
              <button
                onClick={openCart}
                className="text-muted hover:text-ivory transition-colors duration-200 relative"
                aria-label="Shopping bag"
              >
                <BagIcon />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold text-bg-dark text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-muted hover:text-ivory transition-colors duration-200"
                aria-label="Menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-bg-dark border-l border-subtle p-6 slide-in-right">
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif text-lg tracking-[0.2em] text-ivory">
                VLOR<span className="text-gold">É</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-muted hover:text-ivory">
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-[0.12em] uppercase transition-colors ${
                    isActive(link.href) ? 'text-gold' : 'text-muted hover:text-ivory'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/account" className="text-sm tracking-[0.12em] uppercase text-muted hover:text-ivory">
                ACCOUNT
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
