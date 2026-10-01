import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    formatMenuPrice,
    menuSections,
    restaurant,
} from "@/lib/data/dining";
import { unsplashHero } from "@/lib/images";

export const metadata: Metadata = {
    title: "Dining",
    description:
        "The Courtyard restaurant at Mira Hotel — seasonal menu, hours, and bar.",
};

export default function DiningPage() {
    return (
        <div>
            <section className="relative min-h-[320px] overflow-hidden bg-zinc-900 sm:min-h-[400px]">
                <Image
                    src={unsplashHero(restaurant.image)}
                    alt={restaurant.imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-4 pb-10 sm:px-6">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                        Dining
                    </p>
                    <h1 className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
                        {restaurant.name}
                    </h1>
                    <p className="mt-2 max-w-lg text-sm text-white/90 sm:text-base">
                        {restaurant.tagline}
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
                <div className="grid gap-12 lg:grid-cols-[1.35fr_0.75fr]">
                    <div>
                        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                            {restaurant.description}
                        </p>
                        <ul className="mt-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                            {restaurant.notes.map((n) => (
                                <li key={n} className="flex gap-2">
                                    <span className="mt-2 size-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                                    {n}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
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
                            href="/contact?topic=dining"
                            className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                        >
                            Reserve a table
                        </Link>
                        <p className="mt-3 text-center text-[11px] text-zinc-500">
                            Open to hotel guests and the public.
                        </p>
                    </aside>
                </div>
            </section>

            <section className="border-t border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        Sample menu
                    </p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                        What’s cooking
                    </h2>
                    <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
                        A short menu that changes with the season. Ask the desk for
                        tonight’s specials and wine pairings.
                    </p>

                    <div className="mt-12 space-y-14">
                        {menuSections.map((section) => (
                            <div key={section.id}>
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
                                    {section.title}
                                </h3>
                                <ul className="mt-6 divide-y divide-zinc-100 border-t border-zinc-100 dark:divide-zinc-900 dark:border-zinc-900">
                                    {section.items.map((item) => (
                                        <li
                                            key={item.name}
                                            className="flex flex-col gap-1 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                                        >
                                            <div className="min-w-0">
                                                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                                                    {item.name}
                                                </p>
                                                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                                    {item.description}
                                                </p>
                                                {item.dietary && item.dietary.length > 0 ? (
                                                    <p className="mt-2 text-[11px] uppercase tracking-wide text-zinc-500">
                                                        {item.dietary.join(" · ")}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <p className="shrink-0 tabular-nums text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                                {formatMenuPrice(item.price)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
                    <div>
                        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                            Stay the night
                        </h2>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            Pair dinner with a room — or explore experiences around Cascadia.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/booking"
                            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                        >
                            Book a stay
                        </Link>
                        <Link
                            href="/experiences"
                            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-white dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                            Experiences
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}