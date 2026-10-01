import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReservationBadge } from "@/components/admin/status-badge";
import {
    formatMoney,
    formatShortDate,
    guestById,
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

    const guest = guestById(r.guestId);

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
                        <p className="mt-1 text-sm text-zinc-500">
                            {r.code} · created {formatShortDate(r.createdAt)}
                        </p>
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
                        {guest?.phone ? <Row label="Phone" value={guest.phone} /> : null}
                        {guest ? (
                            <Row
                                label="History"
                                value={`${guest.stays} stay${guest.stays === 1 ? "" : "s"} · last ${formatShortDate(guest.lastStay)}`}
                            />
                        ) : null}
                    </dl>
                    {guest ? (
                        <Link
                            href="/admin/guests"
                            className="mt-4 inline-block text-xs font-medium text-zinc-600 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                        >
                            Open guests list
                        </Link>
                    ) : null}
                </section>
            </div>

            {(r.notes || guest?.notes) && (
                <section className="mt-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Notes
                    </h2>
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {r.notes ? <p>{r.notes}</p> : null}
                        {guest?.notes ? (
                            <p className="text-zinc-600 dark:text-zinc-400">
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                    Guest profile:{" "}
                                </span>
                                {guest.notes}
                            </p>
                        ) : null}
                    </div>
                </section>
            )}

            <section className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Desk actions
                </h2>
                <p className="mt-2 text-xs text-zinc-500">
                    Demo UI only — buttons do not change server state.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {["Check in", "Check out", "Print folio", "Message guest"].map(
                        (label) => (
                            <button
                                key={label}
                                type="button"
                                disabled
                                className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-500 dark:border-zinc-700"
                            >
                                {label}
                            </button>
                        ),
                    )}
                </div>
            </section>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">{label}</dt>
            <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                {value}
            </dd>
        </div>
    );
}