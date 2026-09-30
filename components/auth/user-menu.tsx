"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";

export function UserMenu({ variant = "marketing" }: { variant?: "marketing" | "admin" }) {
    const { user, ready, signOut } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    if (!ready) {
        return <div className="size-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />;
    }

    if (!user) {
        return (
            <Link
                href="/login"
                className={
                    variant === "admin"
                        ? "text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                        : "hidden text-xs text-zinc-500 hover:text-zinc-800 sm:inline dark:hover:text-zinc-200"
                }
            >
                Sign in
            </Link>
        );
    }

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full outline-none ring-zinc-400 focus-visible:ring-2"
                aria-expanded={open}
                aria-haspopup="menu"
            >
                <span className="flex size-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                    {user.initials}
                </span>
                {variant === "admin" ? (
                    <span className="hidden text-left text-sm sm:block">
                        <span className="block font-medium leading-none text-zinc-900 dark:text-zinc-50">
                            {user.name}
                        </span>
                        <span className="text-xs text-zinc-500">{user.title}</span>
                    </span>
                ) : null}
            </button>
            {open ? (
                <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
                >
                    <div className="border-b border-zinc-100 px-3 py-2 dark:border-zinc-900">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500">{user.email}</p>
                    </div>
                    <Link
                        href="/admin"
                        role="menuitem"
                        className="block px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
                        onClick={() => setOpen(false)}
                    >
                        Staff desk
                    </Link>
                    <Link
                        href="/admin/settings"
                        role="menuitem"
                        className="block px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
                        onClick={() => setOpen(false)}
                    >
                        Profile & settings
                    </Link>
                    <button
                        type="button"
                        role="menuitem"
                        className="block w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
                        onClick={() => {
                            signOut();
                            setOpen(false);
                            router.push("/");
                            router.refresh();
                        }}
                    >
                        Sign out
                    </button>
                </div>
            ) : null}
        </div>
    );
}