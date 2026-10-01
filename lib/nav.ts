/** Shared nav config for marketing + admin */

export const marketingNav = [
  { href: "/rooms", label: "Rooms" },
  { href: "/dining", label: "Dining" },
  { href: "/experiences", label: "Experiences" },
  { href: "/booking", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const marketingFooterGroups = [
  {
    title: "Stay",
    links: [
      { href: "/rooms", label: "Rooms" },
      { href: "/booking", label: "Book a stay" },
      { href: "/experiences", label: "Experiences" },
    ],
  },
  {
    title: "Dine & visit",
    links: [
      { href: "/dining", label: "The Courtyard" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Staff",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/admin", label: "Desk" },
    ],
  },
] as const;

export const adminNav = [
  { href: "/admin", label: "Overview", end: true },
  { href: "/admin/reservations", label: "Reservations" },
  { href: "/admin/rooms", label: "Rooms" },
  { href: "/admin/guests", label: "Guests" },
  { href: "/admin/settings", label: "Settings" },
] as const;

export function pathIsActive(
  pathname: string,
  href: string,
  end?: boolean,
): boolean {
  if (end || href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
