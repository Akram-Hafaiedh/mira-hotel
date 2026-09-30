import Link from "next/link";

const nav = [
  { href: "/admin", label: "Overview", end: true },
  { href: "/admin/reservations", label: "Reservations" },
  { href: "/admin/rooms", label: "Rooms" },
  { href: "/admin/guests", label: "Guests" },
  { href: "/admin/settings", label: "Settings" },
] as const;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1">
      <aside className="hidden w-56 shrink-0 border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 lg:block">
        <div className="flex h-14 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
          <Link
            href="/admin"
            className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Mira Desk
          </Link>
        </div>
        <nav className="flex flex-col gap-0.5 p-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 hidden w-56 border-t border-zinc-200 p-3 lg:block dark:border-zinc-800">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
          >
            ← Guest site
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800 sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/admin"
              className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Mira Desk
            </Link>
          </div>
          <p className="hidden text-sm text-zinc-500 sm:block lg:flex-1">
            Staff desk · demo
          </p>
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 lg:hidden"
          >
            Guest site
          </Link>
          <div className="flex size-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            MD
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
