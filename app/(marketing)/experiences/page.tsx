import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    categoryLabel,
    experiences,
    formatExperiencePrice,
} from "@/lib/data/experiences";
import { unsplashCard } from "@/lib/images";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
    title: "Experiences",
    description:
        "Hotel-led and local experiences at Mira Hotel — garden walks, coastal cycle, spa, chef’s table.",
};

export default function ExperiencesPage() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <PageHero
                eyebrow="Beyond the room"
                title="Experiences"
                description="Small, bookable moments hosted by the hotel or local partners. Many are open to the public; a few are complimentary for in-house guests. Request a place through the desk — no room reservation required unless noted."
            />

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {experiences.map((exp) => (
                    <article
                        key={exp.slug}
                        className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                    >
                        <div className="relative aspect-[16/10] bg-zinc-200 dark:bg-zinc-800">
                            <Image
                                src={unsplashCard(exp.image)}
                                alt={exp.imageAlt}
                                fill
                                sizes="(max-width: 640px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                                {categoryLabel[exp.category]} · {exp.duration}
                            </p>
                            <h2 className="mt-1.5 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                                {exp.name}
                            </h2>
                            <p className="mt-1 text-sm text-zinc-500">{exp.tagline}</p>
                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {exp.description}
                            </p>
                            <ul className="mt-4 flex flex-wrap gap-1.5">
                                {exp.highlights.map((h) => (
                                    <li
                                        key={h}
                                        className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                                    >
                                        {h}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto flex items-end justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-900">
                                <div>
                                    <p className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                                        {formatExperiencePrice(exp.priceFrom)}
                                    </p>
                                    <p className="text-[11px] text-zinc-500">{exp.pricingNote}</p>
                                </div>
                                <Link
                                    href={`/contact?topic=experience&ref=${exp.slug}`}
                                    className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                                >
                                    Request
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <section className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-10 dark:border-zinc-800 dark:bg-zinc-950 sm:px-10">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                    Prefer a table instead?
                </h2>
                <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                    The Courtyard serves breakfast through dinner — sample menu and hours
                    on the dining page.
                </p>
                <Link
                    href="/dining"
                    className="mt-5 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                    View dining
                </Link>
            </section>
        </div>
    );
}