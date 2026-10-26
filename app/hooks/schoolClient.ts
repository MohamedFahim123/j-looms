"use client";

import { baseUrl } from "@/app/utils/baseUrl";
import Cookies from "js-cookie";
import type { ListFilters, ListResult } from "./useDashboardList";

function headers(): HeadersInit {
  const token = Cookies.get("SERVER_JLOOMS_TOKEN");
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token ?? ""}`,
  };
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  const json = await response.json().catch(() => ({}));
  return json && typeof json === "object"
    ? (json as Record<string, unknown>)
    : {};
}

export async function getSchool<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: headers(),
    cache: "no-store",
  });
  const json = await readJson(response);
  if (!response.ok) {
    throw new Error(
      typeof json.message === "string"
        ? json.message
        : "Could not load this page.",
    );
  }
  return json as T;
}

export async function postSchool(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  const json = await readJson(response);
  if (!response.ok) {
    throw new Error(
      typeof json.message === "string" ? json.message : "Request failed.",
    );
  }
  return json;
}

export async function deleteSchool(path: string) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "DELETE",
    headers: headers(),
  });
  const json = await readJson(response);
  if (!response.ok) {
    throw new Error(
      typeof json.message === "string"
        ? json.message
        : "Could not remove that record.",
    );
  }
  return json;
}

export async function loadCollection<T>(
  path: string,
  key: string,
  filters: ListFilters,
): Promise<ListResult<T>> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([name, value]) => {
    if (value) params.set(name, value);
  });
  params.set("t", String(Date.now()));
  try {
    const json = await getSchool<{
      data?: Record<string, T[]>;
      meta?: { totalPages?: number };
    }>(`${path}?${params.toString()}`);
    return {
      data: json.data?.[key] ?? [],
      totalPages: json.meta?.totalPages ?? 0,
    };
  } catch {
    return { data: [], totalPages: 0, error: true };
  }
}
