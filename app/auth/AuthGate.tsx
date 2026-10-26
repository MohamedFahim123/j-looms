"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export function AuthGate() {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("SERVER_JLOOMS_TOKEN")) {
      router.push("/dashboard/profile");
    }
  }, [router]);

  return null;
}
