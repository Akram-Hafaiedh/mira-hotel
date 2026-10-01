"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    /** Wider dialog for forms with gallery, etc. */
    size?: "md" | "lg";
    /** Scroll body independently (long forms) */
    scrollBody?: boolean;
};

export function Modal({
    open,
    onClose,
    title,
    description,
    children,
    size = "md",
    scrollBody = false,
}: ModalProps) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            <button
                type="button"
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                aria-label="Close dialog"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="shared-modal-title"
                className={cn(
                    "relative z-10 flex w-full flex-col border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950",
                    "max-h-[90dvh] rounded-t-2xl sm:rounded-2xl",
                    size === "lg" ? "max-w-xl" : "max-w-lg",
                )}
            >
                <div className="shrink-0 border-b border-zinc-100 px-6 py-4 dark:border-zinc-900">
                    <h2
                        id="shared-modal-title"
                        className="text-lg font-medium text-zinc-900 dark:text-zinc-50"
                    >
                        {title}
                    </h2>
                    {description ? (
                        <p className="mt-1 text-xs text-zinc-500">{description}</p>
                    ) : null}
                </div>
                <div
                    className={cn(
                        "px-6 py-4",
                        scrollBody && "min-h-0 flex-1 overflow-y-auto",
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

type ModalFooterProps = {
    children: React.ReactNode;
    className?: string;
};

/** Optional footer bar for actions (use inside Modal children or as sibling pattern) */
export function ModalFooter({ children, className }: ModalFooterProps) {
    return (
        <div
            className={cn(
                "flex shrink-0 justify-end gap-2 border-t border-zinc-100 px-6 py-4 dark:border-zinc-900",
                className,
            )}
        >
            {children}
        </div>
    );
}