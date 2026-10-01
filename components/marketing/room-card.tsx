import Link from "next/link";
import type { Room } from "@/lib/data/rooms";
import { categoryLabel, formatPrice } from "@/lib/data/rooms";
import { RoomVisual } from "@/components/marketing/room-visual";

export function RoomCard({ room }: { room: Room }) {
    return (
        <Link
            href={`/rooms/${room.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
        >
            <RoomVisual room={room} />
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                            {categoryLabel[room.category]}
                            {room.unitsAvailable > 1
                                ? ` · ${room.unitsAvailable} units`
                                : " · 1 unit"}
                        </p>
                        <h2 className="mt-1 text-base font-semibold tracking-tight text-zinc-900 group-hover:underline group-hover:underline-offset-4 dark:text-zinc-50">
                            {room.name}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-500">{room.tagline}</p>
                    </div>
                    <p className="shrink-0 text-sm tabular-nums text-zinc-900 dark:text-zinc-100">
                        <span className="text-xs text-zinc-500">from </span>
                        {formatPrice(room.priceFrom)}
                    </p>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {room.description}
                </p>
                <p className="mt-auto pt-1 text-xs text-zinc-500">
                    {room.sizeSqm} m² · {room.beds} · up to {room.guests} guests ·{" "}
                    {room.gallery.length} photos
                </p>
            </div>
        </Link>
    );
}