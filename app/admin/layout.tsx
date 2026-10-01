import Link from "next/link";
import { AdminMobileNav } from "@/components/admin/mobile-nav";
import { RequireAuth } from "@/components/auth/require-auth";
import { UserMenu } from "@/components/auth/user-menu";
import { ThemeToggle } from "@/components/shared/theme-toggle";

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
    <RequireAuth>
      {/* h-dvh + overflow-hidden: sidebar stays put, only main scrolls */}
      <div className="flex h-dvh overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:flex">
          <div className="flex h-14 shrink-0 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
            <Link
              href="/admin"
              className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Mira Desk
            </Link>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="shrink-0 border-t border-zinc-200 p-3 dark:border-zinc-800">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              ← Guest site
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-zinc-200 bg-white/95 px-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95 sm:px-6">
            <div className="flex items-center gap-2 lg:hidden">
              <AdminMobileNav />
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
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/"
                className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 lg:hidden"
              >
                Guest site
              </Link>
              <UserMenu variant="admin" />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}