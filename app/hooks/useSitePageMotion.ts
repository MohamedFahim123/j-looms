"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

function plainPath(pathname: string) {
  const trimmed = pathname.replace(/\/$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function waitForPath(pathname: string) {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const check = () => {
      const current = plainPath(window.location.pathname);
      if (current === pathname || performance.now() - start > 1800) {
        window.scrollTo(0, 0);
        requestAnimationFrame(() => resolve());
        return;
      }
      requestAnimationFrame(check);
    };
    check();
  });
}

export function useSitePageMotion() {
  const router = useRouter();

  function onClick(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = (event.target as Element | null)?.closest("a");
    if (!link) return;
    if (link.getAttribute("target") === "_blank" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    let url: URL;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;

    const pathname = plainPath(url.pathname);
    if (
      pathname.startsWith("/auth") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/api")
    ) {
      return;
    }
    if (pathname === plainPath(window.location.pathname) && url.search === window.location.search) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof document.startViewTransition !== "function") return;

    event.preventDefault();
    event.stopPropagation();
    document.startViewTransition(async () => {
      router.push(`${pathname}${url.search}`);
      await waitForPath(pathname);
    });
  }

  return { onClick };
}
