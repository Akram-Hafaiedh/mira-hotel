import Link from "next/link";
import { ReservationBadge } from "@/components/admin/status-badge";
import {
  formatMoney,
  formatShortDate,
  reservations,
  roomUnits,
} from "@/lib/data/operations";

const today = "2026-09-30";

export default function AdminOverviewPage() {
  const arrivals = reservations.filter(
    (r) => r.checkIn === today && (r.status === "confirmed" || r.status === "pending"),
  );
  const inHouse = reservations.filter((r) => r.status === "checked-in");
  const departures = reservations.filter(
    (r) => r.checkOut === today && r.status === "checked-in",
  );
  const occupied = roomUnits.filter((u) => u.inventory === "occupied").length;
  const occupancy =
    roomUnits.length > 0
      ? Math.round((occupied / roomUnits.length) * 100)
      : 0;
  const openRequests = roomUnits.filter(
    (u) => u.housekeeping === "dirty" || u.housekeeping === "in-progress",
  ).length;

  const recent = [...reservations]
    .filter((r) => r.status !== "cancelled")
    .sort((a, b) => (a.checkIn < b.checkIn ? 1 : -1))
    .slice(0, 5);

  const stats = [
    { label: "Arrivals today", value: String(arrivals.length) },
    { label: "Departures", value: String(departures.length) },
    { label: "Occupancy", value: `${occupancy}%` },
    { label: "Open requests", value: String(openRequests) },
  ] as const;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
          Overview
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Mira Desk — boutique property operations (demo data).
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {s.label}
            </p>
            <p className="mt-2 text-2xl font-medium tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {roomUnits
          .filter((u) => u.housekeeping === "dirty" || u.housekeeping === "in-progress")
          .slice(0, 6)
          .map((u) => (
            <Link
              key={u.id}
              href="/admin/rooms"
              className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              #{u.number} · {u.housekeeping}
            </Link>
          ))}
        <Link
          href="/admin/rooms"
          className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          Housekeeping board →
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-900">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Recent reservations
            </h2>
            <Link
              href="/admin/reservations"
              className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              View all
            </Link>
          </div>
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {recent.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/admin/reservations/${r.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {r.guestName}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {r.roomName} · {formatShortDate(r.checkIn)} →{" "}
                      {formatShortDate(r.checkOut)}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <ReservationBadge status={r.status} />
                    <span className="text-xs tabular-nums text-zinc-500">
                      {formatMoney(r.total)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <Link
            href="/admin/reservations"
            className="block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Reservations
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Arrivals, stays, and booking status.
            </p>
          </Link>
          <Link
            href="/admin/rooms"
            className="block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Rooms
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Inventory and housekeeping status.
            </p>
          </Link>
          <Link
            href="/admin/guests"
            className="block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Guests
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Profiles and stay history.
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}