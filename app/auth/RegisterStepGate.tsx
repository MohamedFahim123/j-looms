"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export function RegisterStepGate({
  step,
  redirectTo,
  children,
}: {
  step: "2" | "3";
  redirectTo: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = Cookies.get("current_step");
    if (current !== step) {
      router.push(redirectTo);
      return;
    }
    setReady(true);
  }, [redirectTo, router, step]);

  if (!ready) return null;
  return children;
}
