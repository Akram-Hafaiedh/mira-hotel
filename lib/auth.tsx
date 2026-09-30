"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

export type DemoUser = {
    name: string;
    email: string;
    title: string;
    initials: string;
};

const STORAGE_KEY = "mira-hotel-demo-user";

const demoAccounts: Record<string, DemoUser> = {
    "desk@mirahotel.demo": {
        name: "Maya Chen",
        email: "desk@mirahotel.demo",
        title: "Front desk",
        initials: "MC",
    },
    "manager@mirahotel.demo": {
        name: "Jonas Adler",
        email: "manager@mirahotel.demo",
        title: "General manager",
        initials: "JA",
    },
};

type AuthContextValue = {
    user: DemoUser | null;
    ready: boolean;
    signIn: (email: string, password: string) => { ok: true } | { ok: false; error: string };
    signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<DemoUser | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setUser(JSON.parse(raw) as DemoUser);
        } catch {
            /* ignore */
        }
        setReady(true);
    }, []);

    const signIn = useCallback((email: string, password: string) => {
        const normalized = email.trim().toLowerCase();
        if (!password || password.length < 4) {
            return { ok: false as const, error: "Use any password with at least 4 characters." };
        }
        const account =
            demoAccounts[normalized] ??
            ({
                name: normalized.split("@")[0]?.replace(/\./g, " ") || "Guest",
                email: normalized,
                title: "Staff",
                initials: (normalized.slice(0, 2) || "ST").toUpperCase(),
            } satisfies DemoUser);

        // Title-case a generated name a bit
        if (!demoAccounts[normalized]) {
            account.name = account.name
                .split(" ")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");
            account.initials = account.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
        }

        setUser(account);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
        return { ok: true as const };
    }, []);

    const signOut = useCallback(() => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const value = useMemo(
        () => ({ user, ready, signIn, signOut }),
        [user, ready, signIn, signOut],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

export const DEMO_LOGIN_HINT =
    "Try desk@mirahotel.demo or manager@mirahotel.demo — any password (4+ chars).";