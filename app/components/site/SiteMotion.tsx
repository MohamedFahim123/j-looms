"use client";

import { useSitePageMotion } from "@/app/hooks/useSitePageMotion";
import type { ReactNode } from "react";

export function SiteMotion({ children }: { children: ReactNode }) {
  const motion = useSitePageMotion();
  return <div onClickCapture={motion.onClick}>{children}</div>;
}
