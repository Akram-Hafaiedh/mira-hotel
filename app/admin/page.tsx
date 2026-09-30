import Link from "next/link";

const stats = [
  { label: "Arrivals today", value: "6" },
  { label: "Departures", value: "4" },
  { label: "Occupancy", value: "78%" },
  { label: "Open requests", value: "2" },
] as const;

export default function AdminOverviewPage() {
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/reservations"
          className="rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
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
          className="rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
        >
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Rooms
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Inventory and housekeeping status.
          </p>
        </Link>
      </div>
    </div>
  );
}