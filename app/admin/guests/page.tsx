"use client";

import { useCallback } from "react";
import { TableToolbar } from "@/components/admin/table-toolbar";
import { EmptyState } from "@/components/shared/empty-state";
import { formatShortDate, guests, type Guest } from "@/lib/data/operations";
import { useClientTable } from "@/lib/use-client-table";

export default function GuestsPage() {
  const searchFn = useCallback((row: Guest, q: string) => {
    return (
      row.name.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q) ||
      row.phone.toLowerCase().includes(q) ||
      (row.notes?.toLowerCase().includes(q) ?? false)
    );
  }, []);

  const sorted = [...guests].sort((a, b) => b.stays - a.stays);

  const table = useClientTable({
    data: sorted,
    pageSize: 8,
    searchFn,
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
          Guests
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Guest profiles from demo stays — no CRM backend.
        </p>
      </div>

      <div className="mb-4">
        <TableToolbar
          search={table.query}
          onSearchChange={table.setQuery}
          searchPlaceholder="Search name, email, phone…"
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
            icon="users"
            title="No guests match"
            description="Try another search to find a demo guest profile."
          />
          {table.hasActiveFilters ? (
            <div className="text-center">
              <button
                type="button"
                onClick={table.clear}
                className="text-sm font-medium text-zinc-700 underline underline-offset-4 dark:text-zinc-300"
              >
                Clear search
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-900">
                  <th className="px-4 py-3 font-medium">Guest</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Stays</th>
                  <th className="px-4 py-3 font-medium">Last stay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {table.pageItems.map((g) => (
                  <tr
                    key={g.id}
                    className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">
                        {g.name}
                      </p>
                      {g.notes ? (
                        <p className="mt-0.5 max-w-xs truncate text-xs text-zinc-500">
                          {g.notes}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-zinc-700 dark:text-zinc-300">
                        {g.email}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">{g.phone}</p>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-zinc-800 dark:text-zinc-200">
                      {g.stays}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      {formatShortDate(g.lastStay)}
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