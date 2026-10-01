import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    formatMenuPrice,
    menuSections,
    restaurant,
} from "@/lib/data/dining";
import { unsplashCard } from "@/lib/images";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
    title: "Dining",
    description:
        "The Courtyard restaurant at Mira Hotel — seasonal menu, hours, and bar.",
};

export default function DiningPage() {
    return (
        <div>
            <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
                <PageHero
                    eyebrow="Restaurant"
                    title={restaurant.name}
                    description={restaurant.tagline}
                />
                <div className="relative mt-10 aspect-21/9 overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
                    <Image
                        src={restaurant.image}
                        alt={restaurant.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1152px) 100vw, 1152px"
                        className="object-cover"
                    />
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
                <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                        <p>{restaurant.description}</p>
                        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                            {restaurant.notes.map((note) => (
                                <li key={note} className="flex gap-2">
                                    <span className="mt-2 size-1 shrink-0 rounded-full bg-zinc-400" />
                                    {note}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <aside className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                            Hours
                        </h2>
                        <dl className="mt-4 space-y-3 text-sm">
                            {restaurant.hours.map((h) => (
                                <div key={h.label} className="flex justify-between gap-4">
                                    <dt className="text-zinc-500">{h.label}</dt>
                                    <dd className="font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                                        {h.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <Link
                            href="/contact"
                            className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                        >
                            Reserve a table
                        </Link>
                    </aside>
                </div>
            </section>

            <section className="border-t border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
                    <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                        Sample menu
                    </h2>
                    <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
                        A short menu that changes with the season. Ask the desk for tonight’s
                        list and wine pairings.
                    </p>

                    <div className="mt-10 space-y-14">
                        {menuSections.map((section) => (
                            <div key={section.id}>
                                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                                    {section.title}
                                </h3>
                                <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {section.items.map((item) => (
                                        <li
                                            key={item.name}
                                            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                                        >
                                            <div className="relative aspect-4/3 bg-zinc-200 dark:bg-zinc-800">
                                                <Image
                                                    src={unsplashCard(item.image)}
                                                    alt={item.imageAlt}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, 33vw"
                                                    className="object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-3">
                                                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                                        {item.name}
                                                    </h4>
                                                    <span className="shrink-0 text-sm tabular-nums text-zinc-900 dark:text-zinc-100">
                                                        {formatMenuPrice(item.price)}
                                                    </span>
                                                </div>
                                                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                                    {item.description}
                                                </p>
                                                {item.dietary?.length ? (
                                                    <p className="mt-2 text-[11px] uppercase tracking-wide text-zinc-500">
                                                        {item.dietary.join(" · ")}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6">
                    <div>
                        <h2 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                            Staying the night?
                        </h2>
                        <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                            Pair dinner with a room upstairs — book a stay or browse the four
                            room types.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/rooms"
                            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                            View rooms
                        </Link>
                        <Link
                            href="/booking"
                            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                        >
                            Book a stay
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}