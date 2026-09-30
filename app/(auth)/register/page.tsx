import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
    title: "Create account",
    description: "Demo staff registration for Mira Hotel.",
};

export default function RegisterPage() {
    return (
        <div>
            <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                Create account
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Demo only — creates a local session in this browser.
            </p>
            <div className="mt-8">
                <RegisterForm />
            </div>
            <p className="mt-6 text-center text-sm text-zinc-500">
                Already have access?{" "}
                <Link
                    href="/login"
                    className="font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}