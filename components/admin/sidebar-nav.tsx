"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav, pathIsActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function AdminSidebarNav() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
            {adminNav.map((item) => {
                const active = pathIsActive(
                    pathname,
                    item.href,
                    "end" in item ? item.end : false,
                );
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "rounded-md px-3 py-2 text-sm transition-colors",
                            active
                                ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                        )}
                        aria-current={active ? "page" : undefined}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}