import Image from "next/image";
import type { Room } from "@/lib/data/rooms";
import { unsplashCard, unsplashHero } from "@/lib/images";
import { cn } from "@/lib/utils";

type Props = {
    room: Room;
    className?: string;
    variant?: "card" | "hero";
    showBadge?: boolean;
    src?: string;
    /** Above-the-fold: preload + eager (fixes LCP warning) */
    priority?: boolean;
};

export function RoomVisual({
    room,
    className,
    variant = "card",
    showBadge = true,
    src,
    priority = false,
}: Props) {
    const hero = variant === "hero";
    const raw = src ?? room.image;
    const imageSrc = hero ? unsplashHero(raw) : unsplashCard(raw);

    return (
        <div
            className={cn(
                "relative overflow-hidden bg-zinc-200 dark:bg-zinc-800",
                hero ? "min-h-75 sm:min-h-105" : "aspect-16/10",
                className,
            )}
        >
            <Image
                src={imageSrc}
                alt={room.imageAlt}
                fill
                sizes={
                    hero
                        ? "100vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                // LCP: priority enables preload; loading/fetchPriority must be set for the audit
                {...(priority
                    ? {
                        priority: true,
                        loading: "eager" as const,
                        fetchPriority: "high" as const,
                    }
                    : {
                        loading: "lazy" as const,
                        fetchPriority: "auto" as const,
                    })}
            />
            {hero ? (
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent" />
            ) : (
                <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent opacity-80" />
            )}

            {showBadge ? (
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-zinc-800 shadow-sm backdrop-blur-sm dark:bg-zinc-950/85 dark:text-zinc-100">
                    {room.highlight}
                </span>
            ) : null}
        </div>
    );
}