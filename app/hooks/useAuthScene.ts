"use client";

import { type AuthGroup } from "@/lib/authScene";
import { useEffect, useRef } from "react";

export function useAuthDirection(group?: AuthGroup) {
  const resolved = group;
  const previous = useRef<AuthGroup | undefined>(resolved);
  const direction =
    !resolved || previous.current === resolved
      ? "in"
      : resolved === "register"
        ? "from-login"
        : previous.current === "register"
          ? "from-register"
          : "in";

  useEffect(() => {
    previous.current = resolved;
  }, [resolved]);

  return direction;
}
