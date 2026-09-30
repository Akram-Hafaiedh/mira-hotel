import type { Metadata } from "next";
import { RoomCard } from "@/components/marketing/room-card";
import { rooms } from "@/lib/data/rooms";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Courtyard, city, atelier, and terrace rooms at Mira Hotel.",
};

export default function RoomsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Stay
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Rooms
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Four room types, each with a clear point of view — garden quiet,
          city glass, work-led twins, or a private terrace. Rates shown are
          starting prices for the demo property.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {rooms.map((room) => (
          <RoomCard key={room.slug} room={room} />
        ))}
      </div>
    </div>
  );
}