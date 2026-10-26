"use client";

import { useEffect, useState } from "react";

export type ListFilters = Record<string, string>;
export type ListResult<T> = { data: T[]; totalPages: number; error?: boolean };

function readFilters(query: string): ListFilters {
  const params = new URLSearchParams(query);
  return {
    status: params.get("status") || "",
    name: params.get("name") || "",
    page: params.get("page") || "1",
  };
}

function sameFilters(left: ListFilters, right: ListFilters) {
  return (
    left.status === right.status &&
    left.name === right.name &&
    left.page === right.page
  );
}

export function useDashboardList<T>(
  query: string,
  load: (filters: ListFilters) => Promise<ListResult<T>>,
) {
  const [filters, setFilters] = useState<ListFilters>(() => readFilters(query));
  const [rows, setRows] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const next = readFilters(query);
    setFilters((current) => (sameFilters(current, next) ? current : next));
  }, [query]);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    load(filters)
      .then((result) => {
        if (!active) return;
        setRows(result.data);
        setTotalPages(result.totalPages);
        setStatus(result.error ? "error" : "ready");
      })
      .catch(() => {
        if (!active) return;
        setRows([]);
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [filters, load, attempt]);

  return {
    filters,
    rows,
    totalPages,
    status,
    retry: () => setAttempt((value) => value + 1),
  };
}
