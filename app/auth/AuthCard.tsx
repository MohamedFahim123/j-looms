"use client";

import RegisterStepProgress from "@/app/components/RegisterStepProgress/RegisterStepProgress";
import { useAuthDirection } from "@/app/hooks/useAuthScene";
import { authScene } from "@/lib/authScene";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./authStyles.module.css";

export function AuthCard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const scene = authScene(pathname);
  const direction = useAuthDirection(scene.group);
  const showSteps =
    pathname === "/auth/register/step2" || pathname === "/auth/register/step3";
  const steps = [
    {
      title: "School",
      subtitle: "Name and email",
      isCompleted: true,
      isActive: false,
    },
    {
      title: "Login",
      subtitle: "Office password",
      isCompleted: pathname === "/auth/register/step3",
      isActive: pathname === "/auth/register/step2",
    },
    {
      title: "Papers",
      subtitle: "School documents",
      isCompleted: false,
      isActive: pathname === "/auth/register/step3",
    },
  ];

  return (
    <div key={pathname} className={styles.card} data-dir={direction}>
      {showSteps ? <RegisterStepProgress steps={steps} /> : null}
      {children}
    </div>
  );
}
