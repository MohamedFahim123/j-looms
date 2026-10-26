"use client";

import { useAuthDirection } from "@/app/hooks/useAuthScene";
import { authScene } from "@/lib/authScene";
import { usePathname } from "next/navigation";
import styles from "./authStyles.module.css";

export function AuthStory() {
  const pathname = usePathname();
  const scene = authScene(pathname);
  const direction = useAuthDirection(scene.group);

  return (
    <div key={scene.group} className={styles.storyCopy} data-dir={direction}>
      <h1 className={styles.headline}>{scene.headline}</h1>
      <p className={styles.lede}>{scene.lede}</p>
    </div>
  );
}
