# کابینتو (Cabineto) — Persian RTL Cabinetry Website

## Tech Stack
- **Framework:** Vite 6 + React 18 + React Router 6
- **Language:** JavaScript (JSX)
- **Styling:** Plain CSS with design tokens (CSS variables in `src/index.css` and `src/components.css`)
- **Font:** Vazirmatn (Google Fonts CDN)
- **Direction:** RTL, `lang="fa"`

## Project Structure
- `src/data/` — All editable content data (products, projects, materials, articles, services, brand config)
- `src/components/` — Shared components (Header, Footer, ConsultationCTA, ScrollToTop, useReveal hook)
- `src/sections/` — Homepage sections (Hero, FeaturedCollections, etc.)
- `src/pages/` — All route pages (12 pages + NotFound)
- `src/index.css` — Design tokens and global styles
- `src/components.css` — Component and page styles

## Routes
- `/` — Homepage with cinematic hero
- `/products` — Product catalog with filters
- `/products/:slug` — Product detail with gallery
- `/portfolio` — Project gallery with filters
- `/portfolio/:slug` — Project detail
- `/materials` — Material library with local save
- `/services` — Services list
- `/about` — About page
- `/journal` — Article magazine
- `/journal/:slug` — Article detail
- `/contact` — Contact form
- `/consultation` — Multi-step consultation form

## Brand Configuration
Change `BRAND_NAME` in `src/data/brand.js` to update the brand name everywhere.

## Development
```bash
docker compose -f docker-compose.base44.yml up -d
```
App runs on port 3000. Vite dev server with live reload.

## Sandbox Notes
- Vite `allowedHosts: true` is set when `BASE44_PREVIEW_MODE === '1'` to allow the preview proxy host
- The `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` env var is also passed but doesn't match the actual Host header (missing port prefix), so the config-level setting is the reliable approach
- File watching uses polling (`usePolling: true`) for bind-mount compatibility
