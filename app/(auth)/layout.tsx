import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh flex-1 lg:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 px-10 py-10 text-zinc-50 lg:flex">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Mira Hotel
          </Link>

          <div className="max-w-md">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              Staff access
            </p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Sign in to the desk
            </h1>
            <p className="mt-4 text-sm leading-6 text-zinc-300">
              Demo authentication only — sessions live in this browser. Use it
              to reach the staff desk and profile menu.
            </p>
          </div>

          <p className="text-xs text-zinc-500">Mira Hotel · template demo</p>
        </div>
      </aside>

      <main className="relative flex flex-col bg-zinc-50 dark:bg-zinc-950">
        <div className="flex items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-zinc-900 lg:hidden dark:text-zinc-50"
          >
            Mira Hotel
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              Guest site
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-5 py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </main>
    </div>
  );
}