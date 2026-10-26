import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./site.module.css";

export function SitePage({
  title,
  image,
  alt,
  children,
}: {
  title: string;
  image: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.page}>
      <div>
        <h1>{title}</h1>
        {children}
      </div>
      <div className={styles.shot}>
        <Image src={image} alt={alt} width={900} height={1100} />
      </div>
    </article>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p>
      <Link className={styles.primary} href={href}>
        {children}
      </Link>
    </p>
  );
}
