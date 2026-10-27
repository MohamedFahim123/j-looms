import { middleware } from "./app/utils/middleWare";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return middleware(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
