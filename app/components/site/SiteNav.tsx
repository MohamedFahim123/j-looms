"use client";

import { useSiteNav } from "@/app/hooks/useSiteNav";
import { navIsCurrent, siteNav } from "@/lib/site/content";
import Link from "next/link";
import styles from "./site.module.css";

export function SiteNav() {
  const nav = useSiteNav();

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={nav.open}
        aria-controls="site-nav"
        onClick={nav.toggle}
      >
        {nav.open ? "Close" : "Menu"}
      </button>
      <nav
        id="site-nav"
        className={`${styles.nav} ${nav.open ? styles.navOpen : ""}`}
        aria-label="Site"
      >
        {siteNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={navIsCurrent(nav.pathname, item.href) ? "page" : undefined}
            onClick={nav.close}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/auth/login" className={styles.signIn} onClick={nav.close}>
          Sign in
        </Link>
        <Link href="/auth/register/step1" className={styles.start} onClick={nav.close}>
          Open a desk
        </Link>
      </nav>
    </>
  );
}
