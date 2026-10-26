import { dispatch } from "@/lib/mock/dispatch";
import { normalizeApiPath } from "@/lib/mock/url";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function readBody(
  request: NextRequest,
): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") || "";
  if (request.method === "GET" || request.method === "HEAD") return {};
  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const data: Record<string, unknown> = {};
    form.forEach((value, key) => {
      data[key] = typeof value === "string" ? value : value.name || "file";
    });
    return data;
  }
  const text = await request.text();
  if (!text) return {};
  try {
    const parsed = JSON.parse(text) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

async function handle(request: NextRequest, path: string[]) {
  const result = await dispatch({
    method: request.method,
    pathname: normalizeApiPath(`/${path.join("/")}`),
    searchParams: request.nextUrl.searchParams,
    body: await readBody(request),
    authorization: request.headers.get("authorization"),
  });
  if (result.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  return NextResponse.json(result.body, {
    status: result.status,
    headers: { "cache-control": "no-store" },
  });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return handle(request, path);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return handle(request, path);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return handle(request, path);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return handle(request, path);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return handle(request, path);
}
