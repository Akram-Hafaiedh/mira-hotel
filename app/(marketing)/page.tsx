import Image from "next/image";
import Link from "next/link";
import { RoomCard } from "@/components/marketing/room-card";
import { restaurant } from "@/lib/data/dining";
import { experiences } from "@/lib/data/experiences";
import { featuredRooms, rooms } from "@/lib/data/rooms";
import { unsplashCard, unsplashHero } from "@/lib/images";

export default function HomePage() {
  const featured = featuredRooms();
  const experiencePreview = experiences.slice(0, 3);

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
          A small hotel with garden-facing rooms, a courtyard restaurant open to
          the city, and experiences you can book with or without a night’s stay.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/booking"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Check availability
          </Link>
          <Link
            href="/rooms"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            View rooms
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
                Featured rooms
              </h2>
            </div>
            <Link
              href="/rooms"
              className="text-sm text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              See all {rooms.length} types
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {featured.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Dining teaser */}
      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
            <Image
              src={unsplashHero(restaurant.image)}
              alt={restaurant.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Dining
            </p>
            <h2 className="mt-2 text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
              {restaurant.name}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {restaurant.tagline} Breakfast through dinner — open to hotel
              guests and walk-ins from the street.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dining"
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                Menu & hours
              </Link>
              <Link
                href="/contact?topic=dining"
                className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Reserve a table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences teaser */}
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                Beyond the room
              </p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                Experiences
              </h2>
              <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                Book with the desk whether or not you’re staying the night.
              </p>
            </div>
            <Link
              href="/experiences"
              className="text-sm text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {experiencePreview.map((exp) => (
              <Link
                key={exp.slug}
                href="/experiences"
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
              >
                <div className="relative aspect-16/10 bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src={unsplashCard(exp.image)}
                    alt={exp.imageAlt}
                    fill
                    sizes="33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-zinc-900 group-hover:underline group-hover:underline-offset-4 dark:text-zinc-50">
                    {exp.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">{exp.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
              Plan your dates
            </h2>
            <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
              Choose nights, pick a room, and add breakfast or a transfer at
              checkout.
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