"use client";

import { useMemo, useState } from "react";

export type ClientTableOptions<T> = {
  data: T[];
  pageSize?: number;
  /** Return true if row matches free-text query */
  searchFn: (row: T, query: string) => boolean;
  /** Return true if row matches active filter (filter === "all" should pass) */
  filterFn?: (row: T, filter: string) => boolean;
  initialFilter?: string;
};

export function useClientTable<T>({
  data,
  pageSize = 8,
  searchFn,
  filterFn,
  initialFilter = "all",
}: ClientTableOptions<T>) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((row) => {
      if (filterFn && filter !== "all" && !filterFn(row, filter)) return false;
      if (q && !searchFn(row, q)) return false;
      return true;
    });
  }, [data, query, filter, searchFn, filterFn]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  function setQueryAndReset(value: string) {
    setQuery(value);
    setPage(1);
  }

  function setFilterAndReset(value: string) {
    setFilter(value);
    setPage(1);
  }

  function clear() {
    setQuery("");
    setFilter(initialFilter);
    setPage(1);
  }

  return {
    query,
    setQuery: setQueryAndReset,
    filter,
    setFilter: setFilterAndReset,
    page: safePage,
    setPage,
    pageSize,
    pageCount,
    total,
    pageItems,
    filtered,
    clear,
    hasActiveFilters: query.trim() !== "" || filter !== initialFilter,
  };
}
