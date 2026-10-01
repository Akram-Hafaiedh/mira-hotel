"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
    { href: "/admin", label: "Overview", end: true },
    { href: "/admin/reservations", label: "Reservations" },
    { href: "/admin/rooms", label: "Rooms" },
    { href: "/admin/guests", label: "Guests" },
    { href: "/admin/settings", label: "Settings" },
] as const;

function isActive(pathname: string, href: string, end?: boolean) {
    if (end) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
}

export function AdminMobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    return (
        <div className="lg:hidden">
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open navigation"
                className="flex size-9 items-center justify-center rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
                    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
            </button>

            {open ? (
                <div className="fixed inset-0 z-50">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                        aria-label="Close navigation"
                        onClick={() => setOpen(false)}
                    />
                    <div className="absolute inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white shadow-xl dark:bg-zinc-950">
                        <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
                            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                                Mira Desk
                            </span>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close navigation"
                                className="flex size-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
                                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                        </div>
                        <nav className="flex flex-1 flex-col gap-0.5 p-2">
                            {nav.map((item) => {
                                const active = isActive(pathname, item.href, "end" in item ? item.end : false);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "rounded-md px-3 py-2.5 text-sm transition-colors",
                                            active
                                                ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                                                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
                            <Link
                                href="/"
                                className="block rounded-md px-3 py-2 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                            >
                                ← Guest site
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}