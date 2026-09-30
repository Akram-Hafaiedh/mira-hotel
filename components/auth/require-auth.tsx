"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

/** Soft gate for /admin — redirects to login when no demo session */
export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, ready } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!ready) return;
        if (!user) {
            const next = encodeURIComponent(
                typeof window !== "undefined" ? window.location.pathname : "/admin",
            );
            router.replace(`/login?next=${next}`);
        }
    }, [ready, user, router]);

    if (!ready) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500">
                Loading…
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500">
                Redirecting to sign in…
            </div>
        );
    }

    return <>{children}</>;
}