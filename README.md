# Mira Hotel

Boutique hotel template built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**. Guest-facing marketing site plus a staff desk (`/admin`) with demo operations data.

> Demo content only. No real bookings, payments, or property-management backend.

**Live demo:** [mira-hotel.vercel.app](https://mira-hotel.vercel.app)

---

## What's included

### Guest site

| Page | Path |
|------|------|
| Home | `/` |
| Rooms list + detail | `/rooms`, `/rooms/[slug]` |
| Booking (multi-step checkout) | `/booking` |
| Dining (restaurant, hours, menu with photos) | `/dining` |
| Experiences (activities) | `/experiences` |
| About | `/about` |
| Contact | `/contact` |

Marketing chrome:

- Header with **Rooms · Dining · Experiences · Book · About · Contact**, active route highlighting, theme toggle, profile menu
- Footer with Stay / Dine & visit / Staff link groups
- Shared **PageHero** intro on content pages (consistent type and spacing)
- Mobile nav drawer

### Staff desk

| Area | Path |
|------|------|
| Overview (stats, recent stays, housekeeping chips) | `/admin` |
| Reservations (search, filter, pagination, detail) | `/admin/reservations`, `/admin/reservations/[id]` |
| Rooms — units table, **housekeeping board**, room-type CRUD | `/admin/rooms` |
| Guests | `/admin/guests` |
| Settings (profile, sign out) | `/admin/settings` |

Admin chrome: fixed sidebar with **active state**, sticky topbar, mobile drawer, theme toggle.

### Auth (demo only)

| Screen | Path |
|--------|------|
| Sign in | `/login` |
| Register | `/register` |

Demo accounts: `desk@mirahotel.demo` or `manager@mirahotel.demo` — any password (4+ characters). Session is stored in `localStorage` only.

### Features

- Light and dark themes (class-based toggle, browser persistence)
- Responsive marketing header/footer and admin sidebar
- Dining showcase with sample menu **food photography**
- Experiences catalog with curated demo data
- Multi-step booking (dates, room, extras, mock payment & confirmation code)
- Admin tables: search, status filters, pagination, empty states
- Housekeeping **board** (dirty → in progress → clean → inspected)
- Room unit & catalog CRUD modals (`localStorage` persistence)
- Reusable UI: Modal, Tabs, EmptyState, TableToolbar, PageHero, status badges
- Typed demo data in `lib/data/` — easy to replace

### Not included (by design)

- Real authentication or server sessions
- Payments, channel manager, or PMS integrations
- Database or API routes
- Email delivery

You can connect your own auth and backend without rewriting the layouts.

---

## Tech stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (class-based dark mode)
- Demo auth via `localStorage` (`lib/auth.tsx`)
- Images: Unsplash demo URLs (`images.unsplash.com` allowed in `next.config.ts`)

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).  
Staff desk: [http://localhost:3000/admin](http://localhost:3000/admin) (sign in first).

```bash
npm run build
npm start
```

---

## Project structure

```
app/
  (marketing)/          Guest site (header + footer)
  (auth)/               Login / register shell
  admin/                Staff desk (gated)
components/
  marketing/            Room cards, booking form, PageHero, nav
  admin/                Tables, housekeeping board, sidebar nav
  auth/                 Login form, user menu, RequireAuth
  shared/               Theme toggle, modal, tabs, empty state
lib/
  data/                 rooms, dining, experiences, operations, extras
  auth.tsx              Demo session
  nav.ts                Marketing + admin link config
  booking.ts            Date helpers
  images.ts             Unsplash size helpers
```

Dynamic routes (keep these names in your app):

- `app/(marketing)/rooms/[slug]/page.tsx`
- `app/admin/reservations/[id]/page.tsx`

---

## Customizing

1. **Rooms / menu / experiences** — edit `lib/data/*.ts`
2. **Copy & branding** — marketing pages under `app/(marketing)/`
3. **Photos** — swap Unsplash URLs for files in `public/` (faster offline demos)
4. **Nav links** — `lib/nav.ts`

---

## License

Intended for commercial template use. Add your own `LICENSE` before listing on a marketplace. Third-party packages keep their own licenses. Unsplash photos are subject to the [Unsplash License](https://unsplash.com/license).

---

## Roadmap

See [`ROADMAP.md`](./ROADMAP.md) for completed work and the seller-pack checklist (screenshots, walkthrough).
