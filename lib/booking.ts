/** Pure helpers for the mock booking flow */

export function parseISODate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(value + "T12:00:00");
  return Number.isNaN(d.getTime()) ? null : d;
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Tonight + default stay length for form defaults */
export function defaultStay(nights = 2): { checkIn: string; checkOut: string } {
  const inDate = new Date();
  inDate.setHours(12, 0, 0, 0);
  inDate.setDate(inDate.getDate() + 1);
  const outDate = new Date(inDate);
  outDate.setDate(outDate.getDate() + nights);
  return { checkIn: toISODate(inDate), checkOut: toISODate(outDate) };
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parseISODate(checkIn);
  const b = parseISODate(checkOut);
  if (!a || !b) return 0;
  const ms = b.getTime() - a.getTime();
  const nights = Math.round(ms / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 0;
}

export function formatStayDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
