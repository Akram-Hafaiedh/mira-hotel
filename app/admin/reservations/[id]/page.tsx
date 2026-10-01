import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReservationBadge } from "@/components/admin/status-badge";
import {
    formatMoney,
    formatShortDate,
    reservationById,
} from "@/lib/data/operations";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const r = reservationById(id);
    return { title: r ? r.code : "Reservation" };
}

export default async function ReservationDetailPage({ params }: Props) {
    const { id } = await params;
    const r = reservationById(id);
    if (!r) notFound();

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-6">
                <Link
                    href="/admin/reservations"
                    className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                >
                    ← Reservations
                </Link>
                <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                            {r.guestName}
                        </h1>
                        <p className="mt-1 text-sm text-zinc-500">{r.code}</p>
                    </div>
                    <ReservationBadge status={r.status} />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <section className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Stay
                    </h2>
                    <dl className="mt-4 space-y-3 text-sm">
                        <Row label="Room" value={`${r.roomName} · #${r.roomNumber}`} />
                        <Row label="Check-in" value={formatShortDate(r.checkIn)} />
                        <Row label="Check-out" value={formatShortDate(r.checkOut)} />
                        <Row
                            label="Nights"
                            value={`${r.nights} · ${r.guests} guest${r.guests === 1 ? "" : "s"}`}
                        />
                        <Row label="Total" value={formatMoney(r.total)} />
                    </dl>
                </section>

                <section className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Guest
                    </h2>
                    <dl className="mt-4 space-y-3 text-sm">
                        <Row label="Name" value={r.guestName} />
                        <Row label="Email" value={r.guestEmail} />
                        <Row label="Booked" value={formatShortDate(r.createdAt)} />
                        {r.notes ? <Row label="Notes" value={r.notes} /> : null}
                    </dl>
                </section>
            </div>

            <p className="mt-6 text-xs text-zinc-500">
                Demo record only — no PMS actions or real updates.
            </p>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4">
            <dt className="shrink-0 text-zinc-500">{label}</dt>
            <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                {value}
            </dd>
        </div>
    );
}