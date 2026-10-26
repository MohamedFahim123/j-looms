"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGate() {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("CLIENT_JLOOMS_TOKEN")) {
      router.push("/dashboard/profile");
    }
  }, [router]);

  return null;
}
