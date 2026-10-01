import type { Metadata } from "next";
import { RoomCard } from "@/components/marketing/room-card";
import { PageHero } from "@/components/marketing/page-hero";
import { rooms } from "@/lib/data/rooms";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Courtyard, city, atelier, and terrace rooms at Mira Hotel.",
};

export default function RoomsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      <PageHero
        eyebrow="Stay"
        title="Rooms"
        description="Four room types, each with a clear point of view — garden quiet, city glass, work-led twins, or a private terrace. Rates shown are starting prices for the demo property."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {rooms.map((room) => (
          <RoomCard key={room.slug} room={room} />
        ))}
      </div>
    </div>
  );
}