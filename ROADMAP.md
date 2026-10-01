# Mira Hotel — roadmap

> Portfolio plan (all products): keep in studio notes. This file is Mira Hotel only.

## Premium bar

- [x] Light + dark theme (class-based, hospitality neutrals)
- [x] Responsive shells (marketing header/footer + admin sidebar)
- [x] Empty states on admin list views
- [x] Realistic demo data (rooms, 24 reservations, 14 guests, 16 units)
- [x] Live demo on Vercel
- [ ] README screenshots + 60–90s walkthrough (seller pack)
- [x] Clear “not included” (no real payments, PMS, or auth/DB)

## v1 scope

### Guest site `(marketing)`

- [x] Layout: header + footer + mobile nav
- [x] Home
- [x] Rooms list + room detail (with category filter & galleries)
- [x] Dining page (restaurant teaser, menus, hours, table reservation link)
- [x] Experiences catalog (curated activities & amenity highlights)
- [x] Booking UI (dates, guests, multi-step checkout, stay extras, mock payment & confirmation)
- [x] About
- [x] Contact

### Staff desk `/admin`

- [x] Layout: fixed sidebar + sticky topbar + mobile nav
- [x] Overview with stat cards + recent reservations
- [x] Reservations list + detail (search, status filter, pagination)
- [x] Rooms / housekeeping status (search, filters, pagination)
- [x] Interactive Room Units & Room Catalog management (CRUD modals with localStorage persistence)
- [x] Guests (search, pagination)
- [x] Settings (profile, property, theme, notifications UI)

### Auth

- [x] Auth layout (image panel + theme toggle)
- [x] Login / register (demo session)
- [x] RequireAuth gate + user menu

## Done beyond original v1

- [x] Theme toggle on marketing, admin, and auth
- [x] Client-side table toolkit (`useClientTable` + `TableToolbar`)
- [x] Dining and Experiences marketing pages & datasets
- [x] Stay extras & add-ons breakdown during booking
- [x] Reusable `Modal` and `Tabs` components with `localStorage` persistence in admin

## Later / sell pack

- [ ] Gallery page
- [ ] Charts on admin overview
- [ ] Active nav highlighting in admin sidebar
- [ ] Loading skeletons on slow routes
- [ ] 4–8 product screenshots
- [ ] 60–90s walkthrough video
- [ ] Commercial license file (if selling)
