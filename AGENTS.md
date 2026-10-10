# VLORÉ — Luxury Fashion E-Commerce

## Overview
Next.js 14 (App Router) + TypeScript + Tailwind CSS luxury fashion e-commerce site.
No backend/database — products are in a static data file (`src/data/products.ts`), cart and wishlist persist via localStorage.

## Setup
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
App runs on port 3000. Node 22 slim image, source bind-mounted, `next dev` with live reload.

## Architecture
- `src/app/` — App Router pages (home, shop, product/[id], collections, about, journal, contact, cart, checkout)
- `src/components/` — Header, Footer, Hero, BenefitsStrip, CategorySection, ProductCard, NewArrivals, FeaturedCollection, BrandStory, Newsletter, CartDrawer, SearchOverlay, Icons
- `src/context/` — CartContext (localStorage), WishlistContext (localStorage)
- `src/data/products.ts` — Product catalog, categories, image URLs, price formatter

## Key Details
- Fonts: Cormorant Garamond (serif) + Inter (sans) via `next/font/google`
- Images: Unsplash CDN URLs (no local image assets)
- No external secrets required
- Checkout is a demo flow (no real payment processor)
- `BASE44_PREVIEW_MODE` gates `allowedDevOrigins` in `next.config.mjs` for the preview proxy

## Verify
- `curl http://localhost:3000/` → 200
- All routes: `/`, `/shop`, `/product/[id]`, `/collections`, `/about`, `/journal`, `/contact`, `/cart`, `/checkout`
