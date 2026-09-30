import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-full flex-1 lg:grid-cols-[1.05fr_0.95fr]">
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 px-10 py-10 text-zinc-50 lg:flex">
                <Link href="/" className="text-sm font-semibold tracking-tight">
                    Mira Hotel
                </Link>
                <div className="max-w-md">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        Staff access
                    </p>
                    <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                        Sign in to the desk
                    </h1>
                    <p className="mt-4 text-sm leading-6 text-zinc-400">
                        Demo authentication only — sessions live in this browser. Use it to
                        reach the staff desk and profile menu.
                    </p>
                </div>
                <p className="text-xs text-zinc-600">Mira Hotel · template demo</p>
            </aside>
            <main className="relative flex flex-col bg-white dark:bg-zinc-950">
                <div className="flex items-center justify-between px-5 py-4 lg:justify-end">
                    <Link
                        href="/"
                        className="text-sm font-semibold tracking-tight text-zinc-900 lg:hidden dark:text-zinc-50"
                    >
                        Mira Hotel
                    </Link>
                    <Link
                        href="/"
                        className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                    >
                        Guest site
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center px-5 py-10">
                    <div className="w-full max-w-sm">{children}</div>
                </div>
            </main>
        </div>
    );
}