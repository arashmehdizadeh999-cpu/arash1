'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type WishlistContextType = {
  items: string[];
  toggleItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('vlore-wishlist');
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('vlore-wishlist', JSON.stringify(items));
    }
  }, [items, mounted]);

  const toggleItem = useCallback((id: string) => {
    setItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const isWishlisted = useCallback(
    (id: string) => items.includes(id),
    [items]
  );

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
