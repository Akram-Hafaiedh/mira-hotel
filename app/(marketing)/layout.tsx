import Link from "next/link";
import { UserMenu } from "@/components/auth/user-menu";
import { MarketingNavLinks } from "@/components/marketing/nav-links";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { marketingFooterGroups } from "@/lib/nav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="shrink-0 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Mira Hotel
          </Link>
          <MarketingNavLinks className="hidden items-center gap-5 lg:flex xl:gap-6" />
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <UserMenu variant="marketing" />
            <Link
              href="/booking"
              className="hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:inline-flex dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Book a stay
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">{children}</main>

      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Mira Hotel
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">
                Boutique stay in Cascadia — rooms, The Courtyard restaurant, and
                curated experiences. Demo template only.
              </p>
              <p className="mt-4 text-xs text-zinc-500">
                180 Northline Avenue
                <br />
                Cascadia, CA 94107
              </p>
            </div>
            {marketingFooterGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {group.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
            <p>© {new Date().getFullYear()} Mira Hotel · template demo</p>
            <p>No real bookings or payments</p>
          </div>
        </div>
      </footer>
    </div>
  );
}