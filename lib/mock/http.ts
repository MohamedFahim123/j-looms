import type { MockResult } from "./types";

export function ok(
  message: string,
  extra: Record<string, unknown> = {},
): MockResult {
  return {
    status: 200,
    body: {
      status: 200,
      message,
      ...extra,
    },
  };
}

export function fail(
  status: number,
  message: string,
  errors?: Record<string, string[]>,
): MockResult {
  return {
    status,
    body: {
      status,
      message,
      ...(errors ? { errors } : {}),
    },
  };
}

export function text(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return "";
}

export function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function idList(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map(asNumber)
    .filter((id): id is number => id !== null && id > 0);
}

export function includesText(haystack: string, needle: string | null): boolean {
  if (!needle) {
    return true;
  }
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export function sameText(left: string, right: string): boolean {
  return left.toLowerCase() === right.toLowerCase();
}
