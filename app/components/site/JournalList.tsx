import { posts } from "@/lib/site/content";
import Link from "next/link";
import styles from "./site.module.css";

export function JournalList() {
  return (
    <section className={styles.journal}>
      <h1>From the journal</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blogs/${post.slug}`}>
              <span>{post.title}</span>
              <small className={styles.date}>{post.date}</small>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
