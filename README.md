# Mira Hotel

Boutique hotel template built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Includes a guest-facing site and a simple staff desk (`/admin`).

> Demo content only. No real bookings, payments, or property-management backend.

## Layouts

| Area | Path | Shell |
|------|------|--------|
| Guest site | `/`, `/rooms`, `/booking`, … | Header + footer (`app/(marketing)`) |
| Staff desk | `/admin`, `/admin/reservations`, … | Sidebar + topbar (`app/admin`) |

`(marketing)` is a route group — it does not appear in the URL. `admin` is a real URL segment.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Staff desk: [http://localhost:3000/admin](http://localhost:3000/admin).

## Project structure

```
app/
  layout.tsx              Root (fonts, metadata)
  (marketing)/            Guest site
    layout.tsx
    page.tsx              Home
    rooms/ booking/ about/ contact/
  admin/                  Staff desk
    layout.tsx
    page.tsx              Overview
    reservations/ rooms/ guests/ settings/
components/               Shared UI (to grow)
lib/                      Demo data, helpers (to grow)
ROADMAP.md                Planned work for this product
```

## Not included (by design)

- Real authentication
- Payment or channel-manager integrations
- Database / API

See `ROADMAP.md` for the v1 checklist.
