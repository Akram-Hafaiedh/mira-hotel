"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { DEMO_LOGIN_HINT, useAuth } from "@/lib/auth";

const inputClass =
    "h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

function LoginFormInner() {
    const { signIn } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "/admin";

    const [email, setEmail] = useState("desk@mirahotel.demo");
    const [password, setPassword] = useState("demo");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setPending(true);
        const result = signIn(email, password);
        setPending(false);
        if (!result.ok) {
            setError(result.error);
            return;
        }
        router.push(next.startsWith("/") ? next : "/admin");
        router.refresh();
    }

    return (
        <div>
            <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                Sign in
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Staff access to Mira Desk and your profile menu.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <label className="block text-sm">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        Email
                    </span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
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
                        autoComplete="current-password"
                        className={`${inputClass} mt-1.5`}
                        required
                    />
                </label>
                {error ? (
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                ) : null}
                <button
                    type="submit"
                    disabled={pending}
                    className="flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                    {pending ? "Signing in…" : "Sign in"}
                </button>
            </form>

            <p className="mt-4 text-xs leading-relaxed text-zinc-500">{DEMO_LOGIN_HINT}</p>

            <p className="mt-6 text-center text-sm text-zinc-500">
                No account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
                >
                    Create one
                </Link>
            </p>
        </div>
    );
}

export function LoginForm() {
    return (
        <Suspense fallback={<div className="text-sm text-zinc-500">Loading…</div>}>
            <LoginFormInner />
        </Suspense>
    );
}