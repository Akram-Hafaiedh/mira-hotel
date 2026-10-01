"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    defaultStay,
    formatStayDate,
    nightsBetween,
} from "@/lib/booking";
import {
    extraCost,
    paymentMethodLabel,
    stayExtras,
    type PaymentMethod,
} from "@/lib/data/extras";
import { formatPrice, rooms } from "@/lib/data/rooms";
import { unsplashCard, unsplashThumb } from "@/lib/images";
import { cn } from "@/lib/utils";

type Step = "details" | "checkout" | "confirmed";

function toISO(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function makeRef() {
    const part = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `MIRA-${part}`;
}

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
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [refCode, setRefCode] = useState("");
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [payment, setPayment] = useState<PaymentMethod>("pay_at_hotel");
    const [cardName, setCardName] = useState("");
    const [cardLast4, setCardLast4] = useState("");

    const room = rooms.find((r) => r.slug === roomSlug) ?? rooms[0];
    const nights = nightsBetween(checkIn, checkOut);
    const subtotal = nights * room.priceFrom;
    const taxes = Math.round(subtotal * 0.12);

    const extrasTotal = useMemo(() => {
        return stayExtras
            .filter((e) => selectedExtras.includes(e.id))
            .reduce((sum, e) => sum + extraCost(e, nights, guests), 0);
    }, [selectedExtras, nights, guests]);

    const total = subtotal + taxes + extrasTotal;

    const minCheckOut = useMemo(() => {
        if (!checkIn) return defaults.checkOut;
        const d = new Date(checkIn + "T12:00:00");
        d.setDate(d.getDate() + 1);
        return toISO(d);
    }, [checkIn, defaults.checkOut]);

    const guestOptions = useMemo(() => {
        const max = Math.max(...rooms.map((r) => r.guests), 4);
        return Array.from({ length: max }, (_, i) => i + 1);
    }, []);

    function selectRoom(slug: string) {
        setRoomSlug(slug);
        const next = rooms.find((r) => r.slug === slug);
        if (next && guests > next.guests) setGuests(next.guests);
    }

    function toggleExtra(id: string) {
        setSelectedExtras((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    }

    function validateDetails(): boolean {
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

    function validateCheckout(): boolean {
        const next: Record<string, string> = {};
        if (payment === "card_on_file") {
            if (!cardName.trim()) next.cardName = "Name on card is required.";
            if (!/^\d{4}$/.test(cardLast4.trim())) {
                next.cardLast4 = "Enter the last 4 digits (demo only).";
            }
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function goToCheckout(e: React.FormEvent) {
        e.preventDefault();
        if (!validateDetails()) return;
        setStep("checkout");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function confirmStay(e: React.FormEvent) {
        e.preventDefault();
        if (!validateCheckout()) return;
        setRefCode(makeRef());
        setStep("confirmed");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (step === "confirmed") {
        const chosen = stayExtras.filter((e) => selectedExtras.includes(e.id));
        return (
            <div className="mx-auto max-w-lg text-center">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Request received
                </p>
                <h1 className="mt-3 text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                    Thank you, {name.split(" ")[0] || "guest"}
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    This is a demo confirmation — nothing was charged or emailed. Your
                    reference is for the template walkthrough only.
                </p>
                <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-left text-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        Reference
                    </p>
                    <p className="mt-1 font-mono text-lg font-medium text-zinc-900 dark:text-zinc-50">
                        {refCode}
                    </p>
                    <dl className="mt-6 space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-900">
                        <Row label="Room" value={room.name} />
                        <Row
                            label="Dates"
                            value={`${formatStayDate(checkIn)} → ${formatStayDate(checkOut)}`}
                        />
                        <Row label="Guests" value={String(guests)} />
                        <Row label="Payment" value={paymentMethodLabel[payment]} />
                        {chosen.length > 0 ? (
                            <Row
                                label="Extras"
                                value={chosen.map((c) => c.name).join(", ")}
                            />
                        ) : null}
                        <Row label="Total (demo)" value={formatPrice(total)} />
                    </dl>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/rooms"
                        className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                    >
                        Browse rooms
                    </Link>
                    <button
                        type="button"
                        onClick={() => {
                            setStep("details");
                            setSelectedExtras([]);
                            setRefCode("");
                            setErrors({});
                        }}
                        className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                        New request
                    </button>
                </div>
            </div>
        );
    }

    if (step === "checkout") {
        return (
            <div className="mx-auto max-w-5xl">
                <StepIndicator current="checkout" />
                <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.9fr]">
                    <form onSubmit={confirmStay} className="space-y-8">
                        <div>
                            <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                                Checkout
                            </h1>
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                                Add optional extras and choose how you would pay — demo only, no
                                card is processed.
                            </p>
                        </div>

                        <section>
                            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                Stay extras
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {stayExtras.map((extra) => {
                                    const on = selectedExtras.includes(extra.id);
                                    const cost = extraCost(extra, nights, guests);
                                    return (
                                        <li key={extra.id}>
                                            <button
                                                type="button"
                                                onClick={() => toggleExtra(extra.id)}
                                                className={cn(
                                                    "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors",
                                                    on
                                                        ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                                                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700",
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border",
                                                        on
                                                            ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                                                            : "border-zinc-300 dark:border-zinc-600",
                                                    )}
                                                    aria-hidden
                                                >
                                                    {on ? (
                                                        <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    ) : null}
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="flex items-start justify-between gap-3">
                                                        <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                                            {extra.name}
                                                        </span>
                                                        <span className="shrink-0 text-sm tabular-nums text-zinc-700 dark:text-zinc-300">
                                                            {formatPrice(cost)}
                                                        </span>
                                                    </span>
                                                    <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
                                                        {extra.description}
                                                    </span>
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                Payment method
                            </h2>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {(
                                    [
                                        ["pay_at_hotel", "Pay when you arrive. No card details needed."],
                                        ["card_on_file", "Store last four digits for the demo only."],
                                    ] as const
                                ).map(([id, hint]) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => setPayment(id)}
                                        className={cn(
                                            "rounded-2xl border p-4 text-left transition-colors",
                                            payment === id
                                                ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                                                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800",
                                        )}
                                    >
                                        <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                            {paymentMethodLabel[id]}
                                        </span>
                                        <span className="mt-1 block text-xs text-zinc-500">{hint}</span>
                                    </button>
                                ))}
                            </div>

                            {payment === "card_on_file" ? (
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <label className="block text-sm">
                                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                            Name on card
                                        </span>
                                        <input
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                            className={cn(inputClass, "mt-1.5")}
                                            placeholder="As printed"
                                            autoComplete="cc-name"
                                        />
                                        {errors.cardName ? (
                                            <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                                                {errors.cardName}
                                            </span>
                                        ) : null}
                                    </label>
                                    <label className="block text-sm">
                                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                            Last 4 digits
                                        </span>
                                        <input
                                            value={cardLast4}
                                            onChange={(e) =>
                                                setCardLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
                                            }
                                            className={cn(inputClass, "mt-1.5")}
                                            placeholder="4242"
                                            inputMode="numeric"
                                            autoComplete="off"
                                        />
                                        {errors.cardLast4 ? (
                                            <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                                                {errors.cardLast4}
                                            </span>
                                        ) : null}
                                    </label>
                                </div>
                            ) : null}
                        </section>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => setStep("details")}
                                className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                            >
                                Confirm request
                            </button>
                        </div>
                    </form>

                    <CheckoutSummary
                        room={room}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        nights={nights}
                        guests={guests}
                        name={name}
                        email={email}
                        subtotal={subtotal}
                        taxes={taxes}
                        extrasTotal={extrasTotal}
                        selectedExtras={selectedExtras}
                        total={total}
                    />
                </div>
            </div>
        );
    }

    /* —— Details step —— */
    return (
        <div className="mx-auto max-w-5xl">
            <StepIndicator current="details" />
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.9fr]">
                <form onSubmit={goToCheckout} className="space-y-10">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                            Stay
                        </p>
                        <h1 className="mt-2 text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                            Book a stay
                        </h1>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            Choose dates and a room, then continue to checkout for extras and
                            payment preference — no charges, no emails.
                        </p>
                    </div>

                    <section>
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                            Dates & guests
                        </h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <label className="block text-sm">
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                    Check-in
                                </span>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className={cn(inputClass, "mt-1.5")}
                                />
                                {errors.checkIn ? (
                                    <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                                        {errors.checkIn}
                                    </span>
                                ) : null}
                            </label>
                            <label className="block text-sm">
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                    Check-out
                                </span>
                                <input
                                    type="date"
                                    value={checkOut}
                                    min={minCheckOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className={cn(inputClass, "mt-1.5")}
                                />
                                {errors.checkOut ? (
                                    <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                                        {errors.checkOut}
                                    </span>
                                ) : null}
                            </label>
                            <label className="block text-sm">
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                    Guests
                                </span>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    className={cn(inputClass, "mt-1.5")}
                                >
                                    {guestOptions.map((n) => (
                                        <option key={n} value={n}>
                                            {n} guest{n === 1 ? "" : "s"}
                                        </option>
                                    ))}
                                </select>
                                {errors.guests ? (
                                    <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                                        {errors.guests}
                                    </span>
                                ) : null}
                            </label>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                            Room
                        </h2>
                        <ul className="mt-4 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
                            {rooms.map((r) => {
                                const selected = r.slug === roomSlug;
                                const tooSmall = guests > r.guests;
                                return (
                                    <li key={r.slug}>
                                        <button
                                            type="button"
                                            disabled={tooSmall}
                                            onClick={() => selectRoom(r.slug)}
                                            className={cn(
                                                "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors",
                                                selected
                                                    ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                                                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700",
                                                tooSmall && "cursor-not-allowed opacity-40",
                                            )}
                                        >
                                            <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800">
                                                <Image
                                                    src={unsplashThumb(r.image)}
                                                    alt=""
                                                    fill
                                                    sizes="56px"
                                                    className="object-cover"
                                                />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block font-medium text-zinc-900 dark:text-zinc-50">
                                                    {r.name}
                                                </span>
                                                <span className="mt-0.5 block text-xs text-zinc-500">
                                                    {r.beds} · up to {r.guests} · from{" "}
                                                    {formatPrice(r.priceFrom)}/night
                                                </span>
                                            </span>
                                            <span
                                                className={cn(
                                                    "size-4 shrink-0 rounded-full border-2",
                                                    selected
                                                        ? "border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100"
                                                        : "border-zinc-300 dark:border-zinc-600",
                                                )}
                                            />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                            Your details
                        </h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm sm:col-span-2">
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                    Full name
                                </span>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={cn(inputClass, "mt-1.5")}
                                    autoComplete="name"
                                />
                                {errors.name ? (
                                    <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                                        {errors.name}
                                    </span>
                                ) : null}
                            </label>
                            <label className="block text-sm">
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                    Email
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cn(inputClass, "mt-1.5")}
                                    autoComplete="email"
                                />
                                {errors.email ? (
                                    <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                                        {errors.email}
                                    </span>
                                ) : null}
                            </label>
                            <label className="block text-sm">
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                    Phone{" "}
                                    <span className="font-normal text-zinc-500">(optional)</span>
                                </span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={cn(inputClass, "mt-1.5")}
                                    autoComplete="tel"
                                />
                            </label>
                            <label className="block text-sm sm:col-span-2">
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                    Notes{" "}
                                    <span className="font-normal text-zinc-500">(optional)</span>
                                </span>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    className={cn(inputClass, "mt-1.5 min-h-[88px] py-2.5")}
                                    placeholder="Arrival time, preferences…"
                                />
                            </label>
                        </div>
                    </section>

                    <button
                        type="submit"
                        className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                    >
                        Continue to checkout
                    </button>
                </form>

                <aside className="lg:pt-2">
                    <div className="sticky top-24 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none">
                        <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
                            <Image
                                src={unsplashCard(room.image)}
                                alt={room.imageAlt}
                                fill
                                sizes="400px"
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                                Summary
                            </p>
                            <h2 className="mt-1 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                                {room.name}
                            </h2>
                            <p className="mt-1 text-sm text-zinc-500">
                                {formatStayDate(checkIn)} → {formatStayDate(checkOut)}
                            </p>
                            <p className="mt-0.5 text-xs text-zinc-500">
                                {room.beds} · up to {room.guests} guests · {room.sizeSqm} m²
                            </p>
                        </div>
                        <dl className="space-y-2 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-900">
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-500">
                                    {nights} night{nights === 1 ? "" : "s"} ×{" "}
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
                            <div className="flex justify-between gap-4 border-t border-zinc-100 pt-2 font-medium dark:border-zinc-900">
                                <dt className="text-zinc-900 dark:text-zinc-50">Subtotal</dt>
                                <dd className="tabular-nums text-zinc-900 dark:text-zinc-50">
                                    {formatPrice(subtotal + taxes)}
                                </dd>
                            </div>
                        </dl>
                        <p className="text-center text-[11px] text-zinc-500">
                            Extras are selected on the next step.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function CheckoutSummary({
    room,
    checkIn,
    checkOut,
    nights,
    guests,
    name,
    email,
    subtotal,
    taxes,
    extrasTotal,
    selectedExtras,
    total,
}: {
    room: (typeof rooms)[0];
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    name: string;
    email: string;
    subtotal: number;
    taxes: number;
    extrasTotal: number;
    selectedExtras: string[];
    total: number;
}) {
    const chosen = stayExtras.filter((e) => selectedExtras.includes(e.id));
    return (
        <aside className="lg:pt-2">
            <div className="sticky top-24 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none">
                <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
                    <Image
                        src={unsplashCard(room.image)}
                        alt={room.imageAlt}
                        fill
                        sizes="400px"
                        className="object-cover"
                    />
                </div>
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        Your stay
                    </p>
                    <h2 className="mt-1 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                        {room.name}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        {formatStayDate(checkIn)} → {formatStayDate(checkOut)}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                        {guests} guest{guests === 1 ? "" : "s"} · {name || "—"} ·{" "}
                        {email || "—"}
                    </p>
                </div>
                <dl className="space-y-2 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-900">
                    <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">
                            {nights} night{nights === 1 ? "" : "s"} × {formatPrice(room.priceFrom)}
                        </dt>
                        <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">Taxes & fees</dt>
                        <dd className="tabular-nums">{formatPrice(taxes)}</dd>
                    </div>
                    {chosen.map((e) => (
                        <div key={e.id} className="flex justify-between gap-4">
                            <dt className="text-zinc-500">{e.name}</dt>
                            <dd className="tabular-nums">
                                {formatPrice(extraCost(e, nights, guests))}
                            </dd>
                        </div>
                    ))}
                    <div className="flex justify-between gap-4 border-t border-zinc-100 pt-2 text-base font-medium dark:border-zinc-900">
                        <dt className="text-zinc-900 dark:text-zinc-50">Total</dt>
                        <dd className="tabular-nums text-zinc-900 dark:text-zinc-50">
                            {formatPrice(total)}
                        </dd>
                    </div>
                </dl>
                <p className="text-center text-[11px] text-zinc-500">
                    Demo only. No payment processing.
                </p>
            </div>
        </aside>
    );
}

function StepIndicator({ current }: { current: "details" | "checkout" }) {
    const steps = [
        { id: "details", label: "Stay details" },
        { id: "checkout", label: "Checkout" },
    ] as const;
    return (
        <ol className="flex items-center gap-2 text-xs font-medium">
            {steps.map((s, i) => {
                const active = s.id === current;
                const done = current === "checkout" && s.id === "details";
                return (
                    <li key={s.id} className="flex items-center gap-2">
                        {i > 0 ? (
                            <span className="text-zinc-300 dark:text-zinc-700" aria-hidden>
                                /
                            </span>
                        ) : null}
                        <span
                            className={
                                active || done
                                    ? "text-zinc-900 dark:text-zinc-50"
                                    : "text-zinc-400"
                            }
                        >
                            {s.label}
                        </span>
                    </li>
                );
            })}
        </ol>
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

const inputClass =
    "h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-400 transition-shadow focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";