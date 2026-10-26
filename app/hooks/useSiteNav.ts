"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useSiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return {
    pathname,
    open,
    toggle: () => setOpen((value) => !value),
    close: () => setOpen(false),
  };
}
