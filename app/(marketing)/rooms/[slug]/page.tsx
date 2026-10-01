import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RoomVisual } from "@/components/marketing/room-visual";
import {
    categoryLabel,
    formatPrice,
    roomBySlug,
    rooms,
} from "@/lib/data/rooms";
import { unsplashCard, unsplashHero, unsplashThumb } from "@/lib/images";

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const room = roomBySlug(slug);
    if (!room) return { title: "Room" };
    return {
        title: room.name,
        description: room.description,
    };
}

export default async function RoomDetailPage({ params }: Props) {
    const { slug } = await params;
    const room = roomBySlug(slug);
    if (!room) notFound();

    const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 4);
    const gallery =
        room.gallery.length > 0
            ? room.gallery
            : [{ src: room.image, label: "Room", alt: room.imageAlt }];

    return (
        <div>
            <div className="relative">
                <RoomVisual room={room} variant="hero" showBadge={false} priority />
                <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-4 pb-8 sm:px-6">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/85">
                        {categoryLabel[room.category]} · {room.highlight}
                    </p>
                    <h1 className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-4xl">
                        {room.name}
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">
                        {room.tagline}
                    </p>
                </div>
            </div>

            <section className="border-b border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                    <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        Gallery
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {gallery.map((shot, i) => (
                            <div key={`${shot.src}-${i}`} className="group relative">
                                <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
                                    <Image
                                        src={i === 0 ? unsplashHero(shot.src) : unsplashCard(shot.src)}
                                        alt={shot.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 33vw"
                                        className="object-cover"
                                        priority={i === 0}
                                        loading={i === 0 ? "eager" : "lazy"}
                                    />
                                </div>
                                <p className="mt-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                    {shot.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_0.8fr]">
                <div>
                    <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {room.longDescription}
                    </p>

                    <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
                        Amenities
                    </h2>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {room.amenities.map((a) => (
                            <li
                                key={a}
                                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                            >
                                <span className="size-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                                {a}
                            </li>
                        ))}
                    </ul>

                    {others.length > 0 ? (
                        <div className="mt-14">
                            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                Other rooms
                            </h2>
                            <ul className="mt-4 divide-y divide-zinc-200 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                                {others.map((r) => (
                                    <li key={r.slug}>
                                        <Link
                                            href={`/rooms/${r.slug}`}
                                            className="flex items-center gap-4 py-4 text-sm transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                                        >
                                            <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800">
                                                <Image
                                                    src={unsplashThumb(r.image)}
                                                    alt=""
                                                    fill
                                                    sizes="56px"
                                                    className="object-cover"
                                                    loading="lazy"
                                                />
                                            </span>
                                            <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                                                <span>
                                                    <span className="block font-medium text-zinc-800 dark:text-zinc-200">
                                                        {r.name}
                                                    </span>
                                                    <span className="text-xs text-zinc-500">
                                                        {categoryLabel[r.category]}
                                                    </span>
                                                </span>
                                                <span className="shrink-0 tabular-nums text-zinc-500">
                                                    from {formatPrice(r.priceFrom)}
                                                </span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>

                <aside className="lg:pt-1">
                    <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                            From
                        </p>
                        <p className="mt-1 text-3xl font-medium tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
                            {formatPrice(room.priceFrom)}
                            <span className="text-sm font-normal text-zinc-500"> / night</span>
                        </p>
                        <dl className="mt-6 space-y-3 border-t border-zinc-100 pt-6 text-sm dark:border-zinc-900">
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-500">Category</dt>
                                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {categoryLabel[room.category]}
                                </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-500">Size</dt>
                                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {room.sizeSqm} m²
                                </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-500">Beds</dt>
                                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {room.beds}
                                </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-500">Guests</dt>
                                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                    Up to {room.guests}
                                </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-500">Keys (demo)</dt>
                                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {room.unitsAvailable}
                                </dd>
                            </div>
                        </dl>
                        <Link
                            href={`/booking?room=${room.slug}`}
                            className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                        >
                            Check availability
                        </Link>
                        <Link
                            href="/rooms"
                            className="mt-3 flex h-10 w-full items-center justify-center text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                        >
                            All rooms
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}