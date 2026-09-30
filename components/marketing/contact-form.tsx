"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const inputClass =
    "h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-400 transition-shadow focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

const areaClass =
    "min-h-[120px] w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-400 transition-shadow focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

export function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [topic, setTopic] = useState("stay");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [sent, setSent] = useState(false);

    function validate() {
        const next: Record<string, string> = {};
        if (!name.trim()) next.name = "Name is required.";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            next.email = "Valid email is required.";
        }
        if (!message.trim() || message.trim().length < 10) {
            next.message = "Please write a short message (10+ characters).";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setSent(true);
    }

    if (sent) {
        return (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Message recorded
                </p>
                <h2 className="mt-2 text-xl font-medium text-zinc-900 dark:text-zinc-50">
                    Thank you, {name.split(" ")[0] || "there"}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    This is a demo form — nothing was emailed or stored. In a real
                    deployment you would wire this to your inbox or CRM.
                </p>
                <button
                    type="button"
                    onClick={() => {
                        setSent(false);
                        setMessage("");
                    }}
                    className="mt-6 text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
                >
                    Send another
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        Name
                    </span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className={cn(inputClass, "mt-1.5")}
                        placeholder="Alex Morgan"
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
                        autoComplete="email"
                        className={cn(inputClass, "mt-1.5")}
                        placeholder="alex@example.com"
                    />
                    {errors.email ? (
                        <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                            {errors.email}
                        </span>
                    ) : null}
                </label>
            </div>

            <label className="block text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    Topic
                </span>
                <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={cn(inputClass, "mt-1.5")}
                >
                    <option value="stay">Stay / availability</option>
                    <option value="events">Events & groups</option>
                    <option value="press">Press</option>
                    <option value="other">Something else</option>
                </select>
            </label>

            <label className="block text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    Message
                </span>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(areaClass, "mt-1.5")}
                    placeholder="How can we help?"
                    rows={5}
                />
                {errors.message ? (
                    <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                        {errors.message}
                    </span>
                ) : null}
            </label>

            <button
                type="submit"
                className="flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 sm:w-auto sm:px-8 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
                Send message
            </button>
            <p className="text-xs text-zinc-500">Demo only — no email is sent.</p>
        </form>
    );
}