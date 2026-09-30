import Link from "next/link";
import { RoomCard } from "@/components/marketing/room-card";
import { rooms } from "@/lib/data/rooms";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 lg:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Boutique hotel · Cascadia
        </p>
        <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Quiet rooms. Clear light. A stay that feels considered.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Four room types, a simple booking flow, and a staff desk under{" "}
          <Link
            href="/admin"
            className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            /admin
          </Link>
          . Demo content only — ready to restyle and extend.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/rooms"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            View all rooms
          </Link>
          <Link
            href="/booking"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Check availability
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                Stay
              </p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                Rooms
              </h2>
            </div>
            <Link
              href="/rooms"
              className="text-sm text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              See all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {rooms.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
              Plan your dates
            </h2>
            <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
              Choose nights and guests, pick a room, and review a mock
              confirmation — no real charges.
            </p>
          </div>
          <Link
            href="/booking"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Start booking
          </Link>
        </div>
      </section>
    </div>
  );
}