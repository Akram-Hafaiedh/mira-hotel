import Link from "next/link";
import { UserMenu } from "@/components/auth/user-menu";

const nav = [
  { href: "/rooms", label: "Rooms" },
  { href: "/booking", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

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
            className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Mira Hotel
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400 sm:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <UserMenu variant="marketing" />
            <Link
              href="/booking"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Book a stay
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-zinc-600 sm:flex-row sm:items-start sm:justify-between sm:px-6 dark:text-zinc-400">
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              Mira Hotel
            </p>
            <p className="mt-1 max-w-xs text-zinc-500">
              Boutique stay template · Cascadia demo property
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              Staff sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}