import { siteNav } from "@/lib/site/content";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteTurn } from "./SiteTurn";
import { RouteProgress } from "./RouteProgress";
import styles from "./site.module.css";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.frame}>
      <RouteProgress />
      <a href="#content" className={styles.skip}>
        Skip to content
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          Join Looms
        </Link>
        <SiteNav />
      </header>
      <main id="content">
        <SiteTurn>{children}</SiteTurn>
      </main>
      <footer className={styles.footer}>
        <nav aria-label="Footer">
          {siteNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/auth/register/step1">Open a desk</Link>
        </nav>
        <p>Join Looms</p>
      </footer>
    </div>
  );
}
