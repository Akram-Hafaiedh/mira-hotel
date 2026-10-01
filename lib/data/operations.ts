/** Demo data for Mira Desk — reservations, guests, room inventory */

export type ReservationStatus =
  | "confirmed"
  | "checked-in"
  | "checked-out"
  | "cancelled"
  | "pending";

export type HousekeepingStatus = "clean" | "dirty" | "in-progress" | "inspected";

export type RoomInventoryStatus = "available" | "occupied" | "out-of-service";

export type Guest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  stays: number;
  lastStay: string;
  notes?: string;
};

export type Reservation = {
  id: string;
  code: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  roomSlug: string;
  roomName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  status: ReservationStatus;
  total: number;
  notes?: string;
  createdAt: string;
};

export type RoomUnit = {
  id: string;
  number: string;
  roomSlug: string;
  roomName: string;
  floor: number;
  inventory: RoomInventoryStatus;
  housekeeping: HousekeepingStatus;
  currentGuest?: string;
  nextArrival?: string;
};

export const guests: Guest[] = [
  { id: "g1", name: "Elena Vasquez", email: "elena.v@example.com", phone: "+1 415 555 0142", stays: 3, lastStay: "2026-09-12", notes: "Prefers high floor, quiet room." },
  { id: "g2", name: "Marcus Holm", email: "m.holm@example.com", phone: "+1 206 555 0198", stays: 1, lastStay: "2026-09-28" },
  { id: "g3", name: "Priya Nair", email: "priya.nair@example.com", phone: "+1 503 555 0177", stays: 5, lastStay: "2026-08-22", notes: "Returning guest — complimentary late checkout when available." },
  { id: "g4", name: "James Okonkwo", email: "j.okonkwo@example.com", phone: "+1 646 555 0111", stays: 2, lastStay: "2026-09-05" },
  { id: "g5", name: "Sophie Laurent", email: "s.laurent@example.com", phone: "+33 6 12 34 56 78", stays: 1, lastStay: "2026-09-30" },
  { id: "g6", name: "Daniel Kim", email: "daniel.kim@example.com", phone: "+1 212 555 0166", stays: 4, lastStay: "2026-07-18" },
  { id: "g7", name: "Amelia Brooks", email: "a.brooks@example.com", phone: "+1 617 555 0133", stays: 2, lastStay: "2026-09-15" },
  { id: "g8", name: "Hiro Tanaka", email: "h.tanaka@example.com", phone: "+81 90 1234 5678", stays: 1, lastStay: "2026-09-20" },
  { id: "g9", name: "Olivia Chen", email: "olivia.chen@example.com", phone: "+1 628 555 0190", stays: 6, lastStay: "2026-09-01", notes: "Corporate account — invoice to finance@acme.demo." },
  { id: "g10", name: "Lucas Meyer", email: "l.meyer@example.com", phone: "+49 170 555 0123", stays: 2, lastStay: "2026-08-30" },
  { id: "g11", name: "Fatima Al-Rashid", email: "f.alrashid@example.com", phone: "+971 50 555 0188", stays: 3, lastStay: "2026-09-18" },
  { id: "g12", name: "Noah Patel", email: "noah.patel@example.com", phone: "+1 312 555 0144", stays: 1, lastStay: "2026-09-25" },
  { id: "g13", name: "Isabelle Dubois", email: "i.dubois@example.com", phone: "+33 7 55 01 22 33", stays: 2, lastStay: "2026-09-08" },
  { id: "g14", name: "Ryan O'Connor", email: "r.oconnor@example.com", phone: "+353 87 555 0167", stays: 1, lastStay: "2026-09-22" },
];

const roomTypes = [
  { slug: "courtyard-queen", name: "Courtyard Queen", numbers: ["208", "214", "220"], price: 240 },
  { slug: "city-king", name: "City King", numbers: ["412", "418", "424"], price: 320 },
  { slug: "atelier-twin", name: "Atelier Twin", numbers: ["301", "315", "322"], price: 260 },
  { slug: "terrace-suite", name: "Terrace Suite", numbers: ["501", "505"], price: 480 },
] as const;

function nightsBetween(a: string, b: string) {
  const d1 = new Date(a + "T12:00:00").getTime();
  const d2 = new Date(b + "T12:00:00").getTime();
  return Math.max(1, Math.round((d2 - d1) / 86400000));
}

export const reservations: Reservation[] = [
  { id: "r1", code: "MIRA-A4F2K1", guestId: "g1", guestName: "Elena Vasquez", guestEmail: "elena.v@example.com", roomSlug: "city-king", roomName: "City King", roomNumber: "412", checkIn: "2026-09-30", checkOut: "2026-10-03", nights: 3, guests: 2, status: "checked-in", total: 1075, notes: "Early check-in requested.", createdAt: "2026-09-10" },
  { id: "r2", code: "MIRA-B91C3E", guestId: "g2", guestName: "Marcus Holm", guestEmail: "m.holm@example.com", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", roomNumber: "208", checkIn: "2026-09-30", checkOut: "2026-10-01", nights: 1, guests: 1, status: "confirmed", total: 269, createdAt: "2026-09-25" },
  { id: "r3", code: "MIRA-C7D0A2", guestId: "g5", guestName: "Sophie Laurent", guestEmail: "s.laurent@example.com", roomSlug: "terrace-suite", roomName: "Terrace Suite", roomNumber: "501", checkIn: "2026-09-29", checkOut: "2026-10-02", nights: 3, guests: 2, status: "checked-in", total: 1613, notes: "Anniversary stay.", createdAt: "2026-08-15" },
  { id: "r4", code: "MIRA-D2E8F4", guestId: "g3", guestName: "Priya Nair", guestEmail: "priya.nair@example.com", roomSlug: "atelier-twin", roomName: "Atelier Twin", roomNumber: "315", checkIn: "2026-10-01", checkOut: "2026-10-04", nights: 3, guests: 2, status: "confirmed", total: 874, createdAt: "2026-09-18" },
  { id: "r5", code: "MIRA-E5B6C9", guestId: "g4", guestName: "James Okonkwo", guestEmail: "j.okonkwo@example.com", roomSlug: "city-king", roomName: "City King", roomNumber: "418", checkIn: "2026-09-28", checkOut: "2026-09-30", nights: 2, guests: 1, status: "checked-out", total: 717, createdAt: "2026-09-01" },
  { id: "r6", code: "MIRA-F1A0D7", guestId: "g6", guestName: "Daniel Kim", guestEmail: "daniel.kim@example.com", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", roomNumber: "214", checkIn: "2026-10-05", checkOut: "2026-10-08", nights: 3, guests: 2, status: "pending", total: 806, createdAt: "2026-09-29" },
  { id: "r7", code: "MIRA-G8H3J2", guestId: "g2", guestName: "Marcus Holm", guestEmail: "m.holm@example.com", roomSlug: "atelier-twin", roomName: "Atelier Twin", roomNumber: "301", checkIn: "2026-09-20", checkOut: "2026-09-22", nights: 2, guests: 2, status: "cancelled", total: 583, notes: "Cancelled by guest — work trip postponed.", createdAt: "2026-09-12" },
  { id: "r8", code: "MIRA-H4K9M1", guestId: "g7", guestName: "Amelia Brooks", guestEmail: "a.brooks@example.com", roomSlug: "city-king", roomName: "City King", roomNumber: "424", checkIn: "2026-10-02", checkOut: "2026-10-05", nights: 3, guests: 2, status: "confirmed", total: 1075, createdAt: "2026-09-20" },
  { id: "r9", code: "MIRA-J2N5P8", guestId: "g8", guestName: "Hiro Tanaka", guestEmail: "h.tanaka@example.com", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", roomNumber: "220", checkIn: "2026-09-26", checkOut: "2026-09-28", nights: 2, guests: 1, status: "checked-out", total: 538, createdAt: "2026-09-14" },
  { id: "r10", code: "MIRA-K6Q1R3", guestId: "g9", guestName: "Olivia Chen", guestEmail: "olivia.chen@example.com", roomSlug: "terrace-suite", roomName: "Terrace Suite", roomNumber: "505", checkIn: "2026-10-03", checkOut: "2026-10-07", nights: 4, guests: 2, status: "confirmed", total: 2150, notes: "Corporate booking.", createdAt: "2026-09-05" },
  { id: "r11", code: "MIRA-L8S4T0", guestId: "g10", guestName: "Lucas Meyer", guestEmail: "l.meyer@example.com", roomSlug: "atelier-twin", roomName: "Atelier Twin", roomNumber: "322", checkIn: "2026-09-24", checkOut: "2026-09-26", nights: 2, guests: 2, status: "checked-out", total: 583, createdAt: "2026-09-08" },
  { id: "r12", code: "MIRA-M3U7V2", guestId: "g11", guestName: "Fatima Al-Rashid", guestEmail: "f.alrashid@example.com", roomSlug: "city-king", roomName: "City King", roomNumber: "412", checkIn: "2026-10-08", checkOut: "2026-10-11", nights: 3, guests: 2, status: "pending", total: 1075, createdAt: "2026-09-28" },
  { id: "r13", code: "MIRA-N9W0X5", guestId: "g12", guestName: "Noah Patel", guestEmail: "noah.patel@example.com", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", roomNumber: "208", checkIn: "2026-10-01", checkOut: "2026-10-02", nights: 1, guests: 1, status: "confirmed", total: 269, createdAt: "2026-09-22" },
  { id: "r14", code: "MIRA-P1Y6Z4", guestId: "g13", guestName: "Isabelle Dubois", guestEmail: "i.dubois@example.com", roomSlug: "terrace-suite", roomName: "Terrace Suite", roomNumber: "501", checkIn: "2026-09-15", checkOut: "2026-09-18", nights: 3, guests: 2, status: "checked-out", total: 1613, createdAt: "2026-08-28" },
  { id: "r15", code: "MIRA-Q5A2B7", guestId: "g14", guestName: "Ryan O'Connor", guestEmail: "r.oconnor@example.com", roomSlug: "atelier-twin", roomName: "Atelier Twin", roomNumber: "301", checkIn: "2026-10-04", checkOut: "2026-10-06", nights: 2, guests: 1, status: "confirmed", total: 583, createdAt: "2026-09-26" },
  { id: "r16", code: "MIRA-R0C8D3", guestId: "g1", guestName: "Elena Vasquez", guestEmail: "elena.v@example.com", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", roomNumber: "214", checkIn: "2026-08-10", checkOut: "2026-08-13", nights: 3, guests: 2, status: "checked-out", total: 806, createdAt: "2026-07-20" },
  { id: "r17", code: "MIRA-S4E1F9", guestId: "g3", guestName: "Priya Nair", guestEmail: "priya.nair@example.com", roomSlug: "city-king", roomName: "City King", roomNumber: "418", checkIn: "2026-10-12", checkOut: "2026-10-15", nights: 3, guests: 2, status: "pending", total: 1075, createdAt: "2026-09-30" },
  { id: "r18", code: "MIRA-T7G2H6", guestId: "g9", guestName: "Olivia Chen", guestEmail: "olivia.chen@example.com", roomSlug: "city-king", roomName: "City King", roomNumber: "424", checkIn: "2026-09-10", checkOut: "2026-09-12", nights: 2, guests: 1, status: "cancelled", total: 717, notes: "Flight cancelled.", createdAt: "2026-08-30" },
  { id: "r19", code: "MIRA-U2J8K0", guestId: "g7", guestName: "Amelia Brooks", guestEmail: "a.brooks@example.com", roomSlug: "atelier-twin", roomName: "Atelier Twin", roomNumber: "315", checkIn: "2026-09-05", checkOut: "2026-09-07", nights: 2, guests: 2, status: "checked-out", total: 583, createdAt: "2026-08-20" },
  { id: "r20", code: "MIRA-V6L3M5", guestId: "g11", guestName: "Fatima Al-Rashid", guestEmail: "f.alrashid@example.com", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", roomNumber: "220", checkIn: "2026-10-06", checkOut: "2026-10-09", nights: 3, guests: 2, status: "confirmed", total: 806, createdAt: "2026-09-21" },
  { id: "r21", code: "MIRA-W9N4P1", guestId: "g6", guestName: "Daniel Kim", guestEmail: "daniel.kim@example.com", roomSlug: "terrace-suite", roomName: "Terrace Suite", roomNumber: "501", checkIn: "2026-10-10", checkOut: "2026-10-13", nights: 3, guests: 3, status: "pending", total: 1613, createdAt: "2026-09-27" },
  { id: "r22", code: "MIRA-X1Q7R8", guestId: "g12", guestName: "Noah Patel", guestEmail: "noah.patel@example.com", roomSlug: "city-king", roomName: "City King", roomNumber: "412", checkIn: "2026-09-18", checkOut: "2026-09-19", nights: 1, guests: 1, status: "checked-out", total: 358, createdAt: "2026-09-10" },
  { id: "r23", code: "MIRA-Y3S0T2", guestId: "g13", guestName: "Isabelle Dubois", guestEmail: "i.dubois@example.com", roomSlug: "atelier-twin", roomName: "Atelier Twin", roomNumber: "322", checkIn: "2026-10-07", checkOut: "2026-10-10", nights: 3, guests: 2, status: "confirmed", total: 874, createdAt: "2026-09-24" },
  { id: "r24", code: "MIRA-Z5U9V4", guestId: "g14", guestName: "Ryan O'Connor", guestEmail: "r.oconnor@example.com", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", roomNumber: "208", checkIn: "2026-09-12", checkOut: "2026-09-14", nights: 2, guests: 1, status: "cancelled", total: 538, createdAt: "2026-09-01" },
];

export const roomUnits: RoomUnit[] = [
  { id: "u1", number: "208", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", floor: 2, inventory: "available", housekeeping: "clean", nextArrival: "2026-09-30" },
  { id: "u2", number: "214", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", floor: 2, inventory: "available", housekeeping: "dirty" },
  { id: "u3", number: "220", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", floor: 2, inventory: "available", housekeeping: "inspected", nextArrival: "2026-10-06" },
  { id: "u4", number: "301", roomSlug: "atelier-twin", roomName: "Atelier Twin", floor: 3, inventory: "available", housekeeping: "inspected" },
  { id: "u5", number: "315", roomSlug: "atelier-twin", roomName: "Atelier Twin", floor: 3, inventory: "available", housekeeping: "clean", nextArrival: "2026-10-01" },
  { id: "u6", number: "322", roomSlug: "atelier-twin", roomName: "Atelier Twin", floor: 3, inventory: "available", housekeeping: "dirty" },
  { id: "u7", number: "412", roomSlug: "city-king", roomName: "City King", floor: 4, inventory: "occupied", housekeeping: "clean", currentGuest: "Elena Vasquez" },
  { id: "u8", number: "418", roomSlug: "city-king", roomName: "City King", floor: 4, inventory: "available", housekeeping: "in-progress" },
  { id: "u9", number: "424", roomSlug: "city-king", roomName: "City King", floor: 4, inventory: "available", housekeeping: "clean", nextArrival: "2026-10-02" },
  { id: "u10", number: "501", roomSlug: "terrace-suite", roomName: "Terrace Suite", floor: 5, inventory: "occupied", housekeeping: "clean", currentGuest: "Sophie Laurent" },
  { id: "u11", number: "505", roomSlug: "terrace-suite", roomName: "Terrace Suite", floor: 5, inventory: "out-of-service", housekeeping: "dirty" },
  { id: "u12", number: "110", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", floor: 1, inventory: "available", housekeeping: "clean" },
  { id: "u13", number: "118", roomSlug: "courtyard-queen", roomName: "Courtyard Queen", floor: 1, inventory: "available", housekeeping: "in-progress" },
  { id: "u14", number: "330", roomSlug: "atelier-twin", roomName: "Atelier Twin", floor: 3, inventory: "out-of-service", housekeeping: "dirty" },
  { id: "u15", number: "430", roomSlug: "city-king", roomName: "City King", floor: 4, inventory: "available", housekeeping: "inspected" },
  { id: "u16", number: "510", roomSlug: "terrace-suite", roomName: "Terrace Suite", floor: 5, inventory: "available", housekeeping: "clean", nextArrival: "2026-10-03" },
];

export function reservationById(id: string): Reservation | undefined {
  return reservations.find((r) => r.id === id);
}

export function guestById(id: string): Guest | undefined {
  return guests.find((g) => g.id === id);
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatShortDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const statusLabel: Record<ReservationStatus, string> = {
  confirmed: "Confirmed",
  "checked-in": "Checked in",
  "checked-out": "Checked out",
  cancelled: "Cancelled",
  pending: "Pending",
};

export const housekeepingLabel: Record<HousekeepingStatus, string> = {
  clean: "Clean",
  dirty: "Dirty",
  "in-progress": "In progress",
  inspected: "Inspected",
};

export const inventoryLabel: Record<RoomInventoryStatus, string> = {
  available: "Available",
  occupied: "Occupied",
  "out-of-service": "Out of service",
};
