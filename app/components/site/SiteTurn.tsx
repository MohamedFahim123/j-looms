"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./site.module.css";

export function SiteTurn({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className={styles.turn}>
      {children}
    </div>
  );
}
