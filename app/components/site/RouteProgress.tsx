"use client";

import NextTopLoader from "nextjs-toploader";

export function RouteProgress() {
  return (
    <NextTopLoader
      color="#111111"
      height={3}
      showSpinner={false}
      shadow="0 0 8px rgba(17, 17, 17, 0.25)"
      crawlSpeed={180}
      speed={220}
    />
  );
}
