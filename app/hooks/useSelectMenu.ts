"use client";

import { useEffect, useRef, useState } from "react";

type Box = { top: number; left: number; width: number };

export function useSelectMenu() {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    if (!open) return;

    const place = () => {
      const node = rootRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const width = Math.max(rect.width, 220);
      const left = Math.max(
        8,
        Math.min(rect.left, window.innerWidth - width - 8),
      );
      setBox({ top: rect.bottom + 8, left, width });
    };

    place();

    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        rootRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  return {
    rootRef,
    menuRef,
    open,
    box,
    toggle: () => setOpen((value) => !value),
    close: () => setOpen(false),
  };
}
