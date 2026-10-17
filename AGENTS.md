# اخبار شمال — Regional News Platform

## Overview
A Persian (Farsi) RTL news website covering three northern Iranian provinces: Gilan, Golestan, Mazandaran.
Built with Next.js 14 (App Router), PostgreSQL, Prisma, and Tailwind CSS.

## Tech Stack
- **Frontend + API**: Next.js 14 App Router (TypeScript)
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5
- **Auth**: JWT (jose) + bcryptjs, httpOnly cookies
- **Styling**: Tailwind CSS with custom dark navy + neon green theme
- **Font**: Vazirmatn (Google Fonts, Persian)

## Dev Environment
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
- Web entry: http://localhost:3000
- PostgreSQL runs in compose; schema is pushed + seeded automatically on startup.
- The compose command runs: `npm install → prisma generate → prisma db push → seed → next dev`

## Admin Panel
- Login at `/admin` with `admin@shomal.news` / `123456` (sample data)
- Hierarchical roles: SUPER_ADMIN → PROVINCIAL_ADMIN → COUNTY_SUPERVISOR
- County supervisors can only manage their own county's news (draft/pending only)
- Provincial admins manage their province's news + county supervisors
- Super admin has full access

## Key Directories
- `app/` — Next.js App Router pages and API routes
- `components/` — React components (Header, Footer, HeroSlider, NewsCard, admin components)
- `lib/` — Prisma client, auth, data access, utilities
- `prisma/` — Schema and seed script

## Theme
- Background: very dark navy (#050813 → #0d1530)
- Accent: neon green (#00f5a0)
- Glassmorphism header, large full-width hero slider, horizontal news sliders
