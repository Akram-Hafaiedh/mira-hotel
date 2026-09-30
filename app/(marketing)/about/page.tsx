import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mira Hotel — a boutique stay in Cascadia. Quiet rooms, considered service, demo template.",
};

const values = [
  {
    title: "Quiet first",
    body: "Soft materials, measured lighting, and rooms that stay calm from morning work to late reading.",
  },
  {
    title: "Clear service",
    body: "A small front desk, straightforward answers, and no performance of luxury — just reliable care.",
  },
  {
    title: "Local rhythm",
    body: "Walkable streets, independent cafés nearby, and a lobby that feels more residence than terminal.",
  },
] as const;

export default function AboutPage() {
  return (
    <div>
      <section className="relative min-h-[320px] overflow-hidden bg-zinc-900 sm:min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
          alt="Hotel exterior and entrance at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            The property
          </p>
          <h1 className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
            A small hotel with a steady point of view
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              Mira Hotel is a boutique stay designed for travelers who want
              space to think — not a stage set. Forty-odd rooms, a quiet lobby,
              and staff who know the neighborhood well enough to send you two
              streets over instead of into a brochure.
            </p>
            <p>
              This site is a{" "}
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                Next.js template
              </strong>
              : the Cascadia address, rates, and booking flow are demo content
              so you can see the full guest experience before connecting a real
              property system.
            </p>
            <p>
              Architecture stays simple on purpose — natural light, honest
              materials, and rooms named for how they feel rather than how they
              rank.
            </p>
          </div>
          <aside className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              At a glance
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Rooms</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  4 types · demo
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Neighborhood</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  Cascadia
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Front desk</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  24 hours
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Check-in</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  From 3:00 pm
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Check-out</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  Until 11:00 am
                </dd>
              </div>
            </dl>
            <Link
              href="/rooms"
              className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              View rooms
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
            What we care about
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-zinc-200 bg-white p-8 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-50">
              Plan a stay
            </h2>
            <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
              Check dates and request a room — demo flow only, no real charges.
            </p>
          </div>
          <Link
            href="/booking"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Book a stay
          </Link>
        </div>
      </section>
    </div>
  );
}