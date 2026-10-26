import { dispatch } from "./dispatch";
import { isMockMode, isRemoteApiUrl, normalizeApiPath } from "./url";
import type { MockRequest } from "./types";

const FLAG = "__JOIN_LOOMS_MOCK_FETCH__";

function readAuthorization(headers: HeadersInit | undefined): string | null {
  if (!headers) return null;
  if (headers instanceof Headers) return headers.get("authorization");
  if (Array.isArray(headers)) {
    const found = headers.find(
      ([key]) => key.toLowerCase() === "authorization",
    );
    return found ? String(found[1]) : null;
  }
  const record = headers as Record<string, string>;
  const key = Object.keys(record).find(
    (name) => name.toLowerCase() === "authorization",
  );
  return key ? String(record[key]) : null;
}

async function readBody(init?: RequestInit): Promise<Record<string, unknown>> {
  const body = init?.body;
  if (body == null) return {};
  if (typeof body === "string") {
    if (!body) return {};
    try {
      const parsed = JSON.parse(body) as unknown;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  if (
    typeof URLSearchParams !== "undefined" &&
    body instanceof URLSearchParams
  ) {
    return Object.fromEntries(body.entries());
  }
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const data: Record<string, unknown> = {};
    body.forEach((value, key) => {
      data[key] = typeof value === "string" ? value : value.name || "file";
    });
    return data;
  }
  return {};
}

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input.url;
}

export async function mockResponseFor(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response | null> {
  if (!isMockMode()) return null;
  const url = requestUrl(input);
  if (!isRemoteApiUrl(url)) return null;
  const parsed = new URL(url);
  const request: MockRequest = {
    method: init?.method || (input instanceof Request ? input.method : "GET"),
    pathname: normalizeApiPath(parsed.pathname),
    searchParams: parsed.searchParams,
    body: await readBody(init),
    authorization:
      readAuthorization(init?.headers) ||
      (input instanceof Request ? input.headers.get("authorization") : null),
  };
  const result = await dispatch(request);
  return new Response(
    result.status === 204 ? null : JSON.stringify(result.body),
    {
      status: result.status,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    },
  );
}

export function installServerMockFetch() {
  const globalState = globalThis as typeof globalThis & { [FLAG]?: boolean };
  if (!isMockMode() || globalState[FLAG]) return;
  globalState[FLAG] = true;
  const original = globalThis.fetch.bind(globalThis);

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const mocked = await mockResponseFor(input, init);
    if (mocked) return mocked;
    return original(input, init);
  };
}
