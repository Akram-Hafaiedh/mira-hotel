"use client";

import Link from "next/link";
import { useCallback } from "react";
import { ReservationBadge } from "@/components/admin/status-badge";
import { TableToolbar } from "@/components/admin/table-toolbar";
import { EmptyState } from "@/components/shared/empty-state";
import {
  formatMoney,
  formatShortDate,
  reservations,
  statusLabel,
  type Reservation,
  type ReservationStatus,
} from "@/lib/data/operations";
import { useClientTable } from "@/lib/use-client-table";

const filterOptions = [
  { value: "all", label: "All statuses" },
  ...(Object.keys(statusLabel) as ReservationStatus[]).map((s) => ({
    value: s,
    label: statusLabel[s],
  })),
];

export default function ReservationsPage() {
  const searchFn = useCallback((row: Reservation, q: string) => {
    return (
      row.guestName.toLowerCase().includes(q) ||
      row.code.toLowerCase().includes(q) ||
      row.roomName.toLowerCase().includes(q) ||
      row.roomNumber.includes(q) ||
      row.guestEmail.toLowerCase().includes(q)
    );
  }, []);

  const filterFn = useCallback((row: Reservation, filter: string) => {
    return row.status === filter;
  }, []);

  const table = useClientTable({
    data: reservations,
    pageSize: 8,
    searchFn,
    filterFn,
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
          Reservations
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Arrivals, stays, and booking status — demo data only.
        </p>
      </div>

      <div className="mb-4">
        <TableToolbar
          search={table.query}
          onSearchChange={table.setQuery}
          searchPlaceholder="Search guest, code, room…"
          filter={table.filter}
          onFilterChange={table.setFilter}
          filterOptions={filterOptions}
          total={table.total}
          page={table.page}
          pageSize={table.pageSize}
          pageCount={table.pageCount}
          onPageChange={table.setPage}
          hasActiveFilters={table.hasActiveFilters}
          onClear={table.clear}
        />
      </div>

      {table.total === 0 ? (
        <div className="space-y-3">
          <EmptyState
            icon="calendar"
            title="No reservations match"
            description="Try another search or clear filters to see all demo bookings."
          />
          {table.hasActiveFilters ? (
            <div className="text-center">
              <button
                type="button"
                onClick={table.clear}
                className="text-sm font-medium text-zinc-700 underline underline-offset-4 dark:text-zinc-300"
              >
                Clear filters
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-900">
                  <th className="px-4 py-3 font-medium">Guest</th>
                  <th className="px-4 py-3 font-medium">Room</th>
                  <th className="px-4 py-3 font-medium">Dates</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {table.pageItems.map((r) => (
                  <tr
                    key={r.id}
                    className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/reservations/${r.id}`}
                        className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
                      >
                        {r.guestName}
                      </Link>
                      <p className="mt-0.5 text-xs text-zinc-500">{r.code}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-zinc-800 dark:text-zinc-200">
                        {r.roomName}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        #{r.roomNumber} · {r.guests} guest
                        {r.guests === 1 ? "" : "s"}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      <p>
                        {formatShortDate(r.checkIn)} →{" "}
                        {formatShortDate(r.checkOut)}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {r.nights} night{r.nights === 1 ? "" : "s"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <ReservationBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                      {formatMoney(r.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}