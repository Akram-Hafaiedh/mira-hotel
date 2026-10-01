"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { marketingNav, pathIsActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MarketingNavLinks({
    className,
    onNavigate,
}: {
    className?: string;
    onNavigate?: () => void;
}) {
    const pathname = usePathname();

    return (
        <nav className={className}>
            {marketingNav.map((item) => {
                const active = pathIsActive(pathname, item.href);
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                            "text-sm transition-colors",
                            active
                                ? "font-medium text-zinc-900 dark:text-zinc-50"
                                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
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