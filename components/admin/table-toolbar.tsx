"use client";

export type FilterOption = { value: string; label: string };

type TableToolbarProps = {
    search: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    filter?: string;
    onFilterChange?: (value: string) => void;
    filterOptions?: FilterOption[];
    filterLabel?: string;
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    hasActiveFilters?: boolean;
    onClear?: () => void;
};

export function TableToolbar({
    search,
    onSearchChange,
    searchPlaceholder = "Search…",
    filter,
    onFilterChange,
    filterOptions,
    filterLabel = "Status",
    total,
    page,
    pageSize,
    pageCount,
    onPageChange,
    hasActiveFilters,
    onClear,
}: TableToolbarProps) {
    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    return (
        <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative max-w-sm flex-1">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
                            aria-hidden
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
                        </svg>
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="h-10 w-full rounded-xl border border-zinc-200 bg-white py-2 pr-3 pl-9 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                        />
                    </div>
                    {filterOptions && onFilterChange ? (
                        <label className="flex items-center gap-2 text-sm">
                            <span className="sr-only sm:not-sr-only sm:text-zinc-500">
                                {filterLabel}
                            </span>
                            <select
                                value={filter}
                                onChange={(e) => onFilterChange(e.target.value)}
                                className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                            >
                                {filterOptions.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ) : null}
                    {hasActiveFilters && onClear ? (
                        <button
                            type="button"
                            onClick={onClear}
                            className="text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                        >
                            Clear
                        </button>
                    ) : null}
                </div>
                <p className="text-xs text-zinc-500 tabular-nums">
                    {total === 0 ? "No results" : `Showing ${from}–${to} of ${total}`}
                </p>
            </div>

            {pageCount > 1 ? (
                <div className="flex items-center justify-end gap-2">
                    <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    >
                        Previous
                    </button>
                    <span className="text-xs tabular-nums text-zinc-500">
                        Page {page} of {pageCount}
                    </span>
                    <button
                        type="button"
                        disabled={page >= pageCount}
                        onClick={() => onPageChange(page + 1)}
                        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    >
                        Next
                    </button>
                </div>
            ) : null}
        </div>
    );
}