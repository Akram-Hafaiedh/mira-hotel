# Mira Hotel — roadmap

> Portfolio plan (all products): keep in studio notes. This file is Mira Hotel only.

## Premium bar

- [x] Light + dark theme (class-based, hospitality neutrals)
- [x] Responsive shells (marketing header/footer + admin sidebar + mobile drawers)
- [x] Empty states on admin list views
- [x] Realistic demo data (rooms, reservations, guests, units, dining, experiences)
- [x] Live demo on Vercel
- [ ] README screenshots + 60–90s walkthrough (seller pack)
- [x] Clear “not included” (no real payments, PMS, or server auth/DB)

## v1 scope

### Guest site `(marketing)`

- [x] Layout: header + footer + mobile nav
- [x] Nav includes Dining & Experiences; **active page** highlighting
- [x] Footer link groups (Stay / Dine & visit / Staff)
- [x] Shared **PageHero** on content pages
- [x] Home (rooms, dining teaser, experiences, booking CTA)
- [x] Rooms list + room detail (galleries, booking deep-link)
- [x] Dining (hours, notes, sample menu with **food images**)
- [x] Experiences catalog
- [x] Booking UI (dates, guests, multi-step checkout, extras, mock confirm)
- [x] About
- [x] Contact (demo form + desk details)

### Staff desk `/admin`

- [x] Layout: fixed sidebar + sticky topbar + mobile nav
- [x] **Active** item in sidebar / mobile nav
- [x] Overview: real stats, recent reservations, housekeeping chips
- [x] Reservations list (search, status filter, pagination) + detail (guest, notes, demo actions)
- [x] Rooms: units table, filters, CRUD modals
- [x] **Housekeeping board** (dirty / in progress / clean / inspected)
- [x] Room types catalog CRUD (`localStorage`)
- [x] Guests (search, pagination)
- [x] Settings (profile + sign out)

### Auth

- [x] Auth layout (image panel + theme toggle)
- [x] Login / register (demo session)
- [x] RequireAuth gate + header/admin user menu

## Done beyond original v1

- [x] Theme toggle on marketing, admin, and auth
- [x] Client-side table toolkit (`useClientTable` + `TableToolbar`)
- [x] Stay extras during booking
- [x] Reusable Modal, Tabs, PageHero, status badges
- [x] next/image `sizes` tuned for constrained page bands

## Later / seller pack

- [ ] 4–8 product screenshots (home, room, dining, booking, admin overview, housekeeping)
- [ ] 60–90s walkthrough video
- [ ] Commercial `LICENSE` file (if selling)
- [ ] Optional: local images under `public/` instead of Unsplash
- [ ] Optional: gallery page
- [ ] Optional: charts on admin overview
- [ ] Optional: loading skeletons on slow routes

## Cadence note

Ship seller assets next if the goal is marketplace listing. Product surface for v1 is otherwise complete for a boutique hotel template demo.
