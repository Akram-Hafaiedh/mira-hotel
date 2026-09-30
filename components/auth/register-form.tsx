"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

const inputClass =
    "h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

export function RegisterForm() {
    const { signIn } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (!name.trim()) {
            setError("Name is required.");
            return;
        }
        const result = signIn(email, password);
        if (!result.ok) {
            setError(result.error);
            return;
        }
        // Overwrite display name from the form
        try {
            const raw = localStorage.getItem("mira-hotel-demo-user");
            if (raw) {
                const user = JSON.parse(raw);
                user.name = name.trim();
                user.initials = name
                    .trim()
                    .split(/\s+/)
                    .map((w: string) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                localStorage.setItem("mira-hotel-demo-user", JSON.stringify(user));
            }
        } catch {
            /* ignore */
        }
        router.push("/admin");
        router.refresh();
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <label className="block text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">Name</span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${inputClass} mt-1.5`}
                    required
                />
            </label>
            <label className="block text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">Email</span>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputClass} mt-1.5`}
                    required
                />
            </label>
            <label className="block text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    Password
                </span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} mt-1.5`}
                    required
                />
            </label>
            {error ? (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            ) : null}
            <button
                type="submit"
                className="flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
                Create account
            </button>
        </form>
    );
}