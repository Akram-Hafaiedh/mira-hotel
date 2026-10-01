"use client";

import {
    HousekeepingBadge,
    InventoryBadge,
} from "@/components/admin/status-badge";
import {
    housekeepingLabel,
    type HousekeepingStatus,
    type RoomUnit,
} from "@/lib/data/operations";

const columns: HousekeepingStatus[] = [
    "dirty",
    "in-progress",
    "clean",
    "inspected",
];

export function HousekeepingBoard({ units }: { units: RoomUnit[] }) {
    return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {columns.map((status) => {
                const list = units.filter((u) => u.housekeeping === status);
                return (
                    <div
                        key={status}
                        className="flex min-h-50 flex-col rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                    >
                        <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2.5 dark:border-zinc-900">
                            <div className="flex items-center gap-2">
                                <HousekeepingBadge status={status} />
                                <span className="text-xs text-zinc-500">
                                    {housekeepingLabel[status]}
                                </span>
                            </div>
                            <span className="text-xs tabular-nums text-zinc-500">
                                {list.length}
                            </span>
                        </div>
                        <ul className="flex flex-1 flex-col gap-2 p-2">
                            {list.length === 0 ? (
                                <li className="px-2 py-6 text-center text-xs text-zinc-400">
                                    None
                                </li>
                            ) : (
                                list.map((u) => (
                                    <li
                                        key={u.id}
                                        className="rounded-lg border border-zinc-100 bg-zinc-50/80 px-3 py-2.5 dark:border-zinc-900 dark:bg-zinc-900/40"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                                                    #{u.number}
                                                </p>
                                                <p className="mt-0.5 text-xs text-zinc-500">
                                                    {u.roomName} · Fl. {u.floor}
                                                </p>
                                            </div>
                                            <InventoryBadge status={u.inventory} />
                                        </div>
                                        {u.currentGuest ? (
                                            <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                                                Guest: {u.currentGuest}
                                            </p>
                                        ) : null}
                                        {u.nextArrival ? (
                                            <p className="mt-1 text-xs text-zinc-500">
                                                Next in: {u.nextArrival}
                                            </p>
                                        ) : null}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}