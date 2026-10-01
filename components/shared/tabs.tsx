"use client";

import { cn } from "@/lib/utils";

export type TabItem<T extends string = string> = {
    id: T;
    label: string;
};

type TabsProps<T extends string> = {
    items: readonly TabItem<T>[] | TabItem<T>[];
    value: T;
    onChange: (id: T) => void;
    className?: string;
};

export function Tabs<T extends string>({
    items,
    value,
    onChange,
    className,
}: TabsProps<T>) {
    return (
        <div
            role="tablist"
            className={cn(
                "flex gap-1 rounded-full border border-zinc-200 p-1 dark:border-zinc-800",
                className,
            )}
        >
            {items.map((item) => {
                const active = item.id === value;
                return (
                    <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChange(item.id)}
                        className={cn(
                            "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                            active
                                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                        )}
                    >
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
}