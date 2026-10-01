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
| Dining (restaurant & menus) | `/dining` |
| Experiences (activities) | `/experiences` |
| About | `/about` |
| Contact | `/contact` |

### Staff desk

| Area | Path |
|------|------|
| Overview | `/admin` |
| Reservations (search, filter, pagination) | `/admin/reservations`, `/admin/reservations/[id]` |
| Rooms / housekeeping (units & catalog CRUD modals) | `/admin/rooms` |
| Guests | `/admin/guests` |
| Settings | `/admin/settings` |

### Auth (demo only)

| Screen | Path |
|--------|------|
| Sign in | `/login` |
| Register | `/register` |

Demo accounts: `desk@mirahotel.demo` or `manager@mirahotel.demo` — any password (4+ characters).

### Features

- Light and dark themes (class-based toggle, persists in the browser)
- Responsive marketing header/footer and admin sidebar with mobile navigation drawers
- Dedicated Dining and Experiences showcases with curated demo data
- Multi-step booking checkout flow (stay dates, extras/add-ons, payment method, mock confirmation reference)
- Admin tables with search, status filters, and pagination
- Interactive admin modals to add/edit room units and room catalog types (persists in `localStorage`)
- Reusable UI primitives: Modal dialogs, Tabs, Empty states, and Table toolbars
- Typed demo data in `lib/data/` — easy to replace
- Accessible-ish patterns (labels, focus rings, dialog focus trap)

### Not included (by design)

- Real authentication or session server
- Payments, channel manager, or PMS integrations
- Database or API routes
- Email delivery

You can connect your own auth and backend without rewriting the layouts.

---

## Tech stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (`@custom-variant dark` for class-based theme)
- Demo auth via `localStorage` (`lib/auth.tsx`)

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Staff desk: [http://localhost:3000/admin](http://localhost:3000/admin) (sign in first).

```bash
npm run build   # production build
npm run start   # run production build
npm run lint    # lint
```

---

## Project structure

```
app/
  layout.tsx                 Root (fonts, ThemeProvider, AuthProvider)
  globals.css                Theme tokens + dark variant
  (auth)/                    Login / register shell
  (marketing)/               Guest site (home, rooms, booking, dining, experiences, about, contact)
  admin/                     Staff desk (overview, reservations, rooms, guests, settings)
components/
  auth/                      Login, register, user menu, require-auth
  marketing/                 Booking form, room cards, mobile nav
  admin/                     Status badges, table toolbar, mobile nav
  shared/                    Theme toggle, empty state, modal, tabs
lib/
  auth.tsx                   Demo session
  theme.tsx                  Light / dark theme
  data/rooms.ts              Room catalog & filters
  data/dining.ts             Restaurant info & menus
  data/experiences.ts        Hotel experiences & activities
  data/extras.ts             Stay add-ons & cost calculation
  data/operations.ts         Reservations, guests, units
  use-client-table.ts        Search / filter / pagination helper
  booking.ts                 Stay date helpers
```

---

## Customizing

**Content** — edit data files in `lib/data/` (`rooms.ts`, `dining.ts`, `experiences.ts`, `extras.ts`, and `operations.ts`).

**Brand** — search for “Mira Hotel” / “Mira Desk”; logo is text-based in layouts.

**Colors** — CSS variables in `app/globals.css`; most UI uses zinc scale + `dark:` pairs.

**Theme** — toggle stores preference under `mira-hotel-theme` in `localStorage`.

---

## Deploying

Deploy to [Vercel](https://vercel.com/) with the default Next.js settings, or run `npm run build && npm run start` anywhere Node is supported.

Allow `images.unsplash.com` in `next.config.ts` if you keep the demo photos (already configured).

---

## License

Intended for commercial template use. Add your own `LICENSE` terms before listing on a marketplace. Third-party packages keep their own licenses.

---

## Roadmap

See `ROADMAP.md` for completed v1 items and the seller-pack checklist (screenshots, walkthrough).
