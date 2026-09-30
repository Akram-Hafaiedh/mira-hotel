"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    defaultStay,
    formatStayDate,
    nightsBetween,
} from "@/lib/booking";
import { formatPrice, rooms, type Room } from "@/lib/data/rooms";
import { unsplashCard, unsplashThumb } from "@/lib/images";
import { cn } from "@/lib/utils";

type Step = "details" | "confirmed";

export function BookingForm({ initialRoomSlug }: { initialRoomSlug?: string }) {
    const defaults = defaultStay(2);
    const initialRoom =
        rooms.find((r) => r.slug === initialRoomSlug) ?? rooms[0];

    const [step, setStep] = useState<Step>("details");
    const [checkIn, setCheckIn] = useState(defaults.checkIn);
    const [checkOut, setCheckOut] = useState(defaults.checkOut);
    const [guests, setGuests] = useState(2);
    const [roomSlug, setRoomSlug] = useState(initialRoom.slug);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [refCode, setRefCode] = useState("");

    const room = rooms.find((r) => r.slug === roomSlug) ?? rooms[0];
    const nights = nightsBetween(checkIn, checkOut);
    const subtotal = nights * room.priceFrom;
    const taxes = Math.round(subtotal * 0.12);
    const total = subtotal + taxes;

    const minCheckOut = useMemo(() => {
        if (!checkIn) return defaults.checkOut;
        const d = new Date(checkIn + "T12:00:00");
        d.setDate(d.getDate() + 1);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    }, [checkIn, defaults.checkOut]);

    function validate(): boolean {
        const next: Record<string, string> = {};
        if (!checkIn) next.checkIn = "Choose a check-in date.";
        if (!checkOut) next.checkOut = "Choose a check-out date.";
        if (nights < 1) next.checkOut = "Check-out must be after check-in.";
        if (guests < 1) next.guests = "At least one guest.";
        if (guests > room.guests) {
            next.guests = `This room sleeps up to ${room.guests}.`;
        }
        if (!name.trim()) next.name = "Name is required.";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            next.email = "Valid email is required.";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        const code = `MIRA-${Date.now().toString(36).toUpperCase().slice(-6)}`;
        setRefCode(code);
        setStep("confirmed");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (step === "confirmed") {
        return (
            <div className="mx-auto max-w-lg text-center">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Request received
                </p>
                <h1 className="mt-3 text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                    You’re provisionally held
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    This is a demo confirmation — no payment was taken and nothing was
                    sent to a real property system. Reference{" "}
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {refCode}
                    </span>
                    .
                </p>
                <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-left text-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <dl className="space-y-3">
                        <Row label="Room" value={room.name} />
                        <Row label="Check-in" value={formatStayDate(checkIn)} />
                        <Row label="Check-out" value={formatStayDate(checkOut)} />
                        <Row label="Nights" value={String(nights)} />
                        <Row label="Guests" value={String(guests)} />
                        <Row label="Guest" value={name} />
                        <Row label="Email" value={email} />
                        <Row label="Total (demo)" value={formatPrice(total)} />
                    </dl>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setStep("details");
                            setRefCode("");
                        }}
                        className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                        Edit request
                    </button>
                    <Link
                        href="/rooms"
                        className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                    >
                        Browse rooms
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.35fr_0.85fr]"
        >
            <div className="space-y-10">
                <header>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        Stay
                    </p>
                    <h1 className="mt-3 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                        Book a stay
                    </h1>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        Choose dates and a room. This form only simulates a request — no
                        charges, no emails.
                    </p>
                </header>

                {/* Dates & guests */}
                <section className="space-y-4">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        Dates & guests
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Field label="Check-in" error={errors.checkIn}>
                            <input
                                type="date"
                                value={checkIn}
                                min={defaults.checkIn}
                                onChange={(e) => {
                                    setCheckIn(e.target.value);
                                    if (e.target.value >= checkOut) {
                                        const d = new Date(e.target.value + "T12:00:00");
                                        d.setDate(d.getDate() + 1);
                                        setCheckOut(
                                            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
                                        );
                                    }
                                }}
                                className={inputClass}
                            />
                        </Field>
                        <Field label="Check-out" error={errors.checkOut}>
                            <input
                                type="date"
                                value={checkOut}
                                min={minCheckOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className={inputClass}
                            />
                        </Field>
                        <Field label="Guests" error={errors.guests}>
                            <select
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className={inputClass}
                            >
                                {[1, 2, 3, 4].map((n) => (
                                    <option key={n} value={n}>
                                        {n} {n === 1 ? "guest" : "guests"}
                                    </option>
                                ))}
                            </select>
                        </Field>
                    </div>
                </section>

                {/* Room picker */}
                <section className="space-y-4">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        Room
                    </h2>
                    <div className="grid gap-3">
                        {rooms.map((r) => (
                            <RoomOption
                                key={r.slug}
                                room={r}
                                selected={roomSlug === r.slug}
                                onSelect={() => setRoomSlug(r.slug)}
                            />
                        ))}
                    </div>
                </section>

                {/* Guest details */}
                <section className="space-y-4">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        Your details
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Full name" error={errors.name}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                placeholder="Alex Morgan"
                                className={inputClass}
                            />
                        </Field>
                        <Field label="Email" error={errors.email}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                placeholder="alex@example.com"
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </section>
            </div>

            {/* Summary */}
            <aside className="lg:pt-2">
                <div className="sticky top-24 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
                        <Image
                            src={unsplashCard(room.image)}
                            alt={room.imageAlt}
                            fill
                            sizes="400px"
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                            Summary
                        </p>
                        <p className="mt-1 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                            {room.name}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">
                            {nights > 0
                                ? `${formatStayDate(checkIn)} → ${formatStayDate(checkOut)}`
                                : "Select valid dates"}
                        </p>
                    </div>
                    <dl className="space-y-2 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-900">
                        <div className="flex justify-between gap-4">
                            <dt className="text-zinc-500">
                                {nights || "—"} night{nights === 1 ? "" : "s"} ×{" "}
                                {formatPrice(room.priceFrom)}
                            </dt>
                            <dd className="tabular-nums text-zinc-900 dark:text-zinc-100">
                                {formatPrice(subtotal)}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-4">
                            <dt className="text-zinc-500">Taxes & fees (demo)</dt>
                            <dd className="tabular-nums text-zinc-900 dark:text-zinc-100">
                                {formatPrice(taxes)}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-4 border-t border-zinc-100 pt-3 text-base font-medium dark:border-zinc-900">
                            <dt className="text-zinc-900 dark:text-zinc-50">Total</dt>
                            <dd className="tabular-nums text-zinc-900 dark:text-zinc-50">
                                {formatPrice(total)}
                            </dd>
                        </div>
                    </dl>
                    <button
                        type="submit"
                        className="flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                    >
                        Request stay
                    </button>
                    <p className="text-center text-[11px] leading-relaxed text-zinc-500">
                        Demo only. No payment processing or confirmation email.
                    </p>
                </div>
            </aside>
        </form>
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

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block text-sm">
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
            <div className="mt-1.5">{children}</div>
            {error ? (
                <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                    {error}
                </span>
            ) : null}
        </label>
    );
}

const inputClass =
    "h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-400 transition-shadow focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

function RoomOption({
    room,
    selected,
    onSelect,
}: {
    room: Room;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-colors",
                selected
                    ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700",
            )}
        >
            <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800">
                <Image
                    src={unsplashThumb(room.image)}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {room.name}
                </span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                    {room.beds} · up to {room.guests} · from {formatPrice(room.priceFrom)}
                    /night
                </span>
            </span>
            <span
                className={cn(
                    "size-4 shrink-0 rounded-full border-2",
                    selected
                        ? "border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100"
                        : "border-zinc-300 dark:border-zinc-600",
                )}
                aria-hidden
            />
        </button>
    );
}