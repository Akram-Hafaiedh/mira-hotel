/** Shared marketing page intro — same type & spacing on every public page */

export function PageHero({
    eyebrow,
    title,
    description,
    children,
}: {
    eyebrow: string;
    title: string;
    description?: string;
    children?: React.ReactNode;
}) {
    return (
        <header className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {title}
            </h1>
            {description ? (
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {description}
                </p>
            ) : null}
            {children}
        </header>
    );
}