import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/marketing/contact-form";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mira Hotel — front desk, address, and demo message form.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      <PageHero
        eyebrow="Reach us"
        title="Contact"
        description="Questions about a stay, events, or the neighborhood — send a note or use the desk details below. The form is a UI demo only."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />

        <aside className="space-y-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Front desk
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-zinc-500">Phone</dt>
                <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">
                  +1 (555) 014-2200
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Email</dt>
                <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">
                  stay@mirahotel.demo
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Hours</dt>
                <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">
                  Open 24 hours
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Address
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Mira Hotel
              <br />
              180 Northline Avenue
              <br />
              Cascadia, CA 94107
              <br />
              United States
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              Fictional demo address for the template.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Prefer to book online?
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Check dates and request a room in a few steps.
            </p>
            <Link
              href="/booking"
              className="mt-4 inline-flex text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
            >
              Go to booking
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}