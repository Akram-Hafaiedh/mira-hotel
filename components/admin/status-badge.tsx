import { cn } from "@/lib/utils";
import type {
    HousekeepingStatus,
    ReservationStatus,
    RoomInventoryStatus,
} from "@/lib/data/operations";
import {
    housekeepingLabel,
    inventoryLabel,
    statusLabel,
} from "@/lib/data/operations";

const reservationStyles: Record<ReservationStatus, string> = {
    confirmed:
        "bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300",
    "checked-in":
        "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    "checked-out":
        "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
    cancelled:
        "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    pending:
        "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
};

const housekeepingStyles: Record<HousekeepingStatus, string> = {
    clean:
        "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    dirty:
        "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    "in-progress":
        "bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300",
    inspected:
        "bg-violet-50 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300",
};

const inventoryStyles: Record<RoomInventoryStatus, string> = {
    available:
        "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    occupied:
        "bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300",
    "out-of-service":
        "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
};

const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide";

export function ReservationBadge({ status }: { status: ReservationStatus }) {
    return (
        <span className={cn(base, reservationStyles[status])}>
            {statusLabel[status]}
        </span>
    );
}

export function HousekeepingBadge({ status }: { status: HousekeepingStatus }) {
    return (
        <span className={cn(base, housekeepingStyles[status])}>
            {housekeepingLabel[status]}
        </span>
    );
}

export function InventoryBadge({ status }: { status: RoomInventoryStatus }) {
    return (
        <span className={cn(base, inventoryStyles[status])}>
            {inventoryLabel[status]}
        </span>
    );
}