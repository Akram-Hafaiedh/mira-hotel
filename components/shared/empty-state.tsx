import Link from "next/link";

type EmptyStateProps = {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    icon?: "inbox" | "search" | "calendar" | "users";
};

const icons = {
    inbox: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0l-2.5 5.5A2 2 0 0115.7 20H8.3a2 2 0 01-1.8-1.5L4 13m16 0H4"
        />
    ),
    search: (
        <>
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
        </>
    ),
    calendar: (
        <>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path strokeLinecap="round" d="M3 10h18M8 3v4M16 3v4" />
        </>
    ),
    users: (
        <>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
            />
            <circle cx="10" cy="7" r="4" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
            />
        </>
    ),
};

export function EmptyState({
    title,
    description,
    actionLabel,
    actionHref,
    icon = "inbox",
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-16 text-center dark:border-zinc-800 dark:bg-zinc-950/40">
            <div className="flex size-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="size-6"
                    aria-hidden
                >
                    {icons[icon]}
                </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {title}
            </h3>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">
                {description}
            </p>
            {actionLabel && actionHref ? (
                <Link
                    href={actionHref}
                    className="mt-6 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                    {actionLabel}
                </Link>
            ) : null}
        </div>
    );
}