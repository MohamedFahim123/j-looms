import type { JournalPost } from "@/lib/site/content";
import Image from "next/image";
import Link from "next/link";
import styles from "./site.module.css";

export function JournalArticle({ post }: { post: JournalPost }) {
  return (
    <article className={styles.article}>
      <Link href="/blogs" className={styles.back}>
        All notes
      </Link>
      <h1>{post.title}</h1>
      <span className={styles.date}>{post.date}</span>
      <Image src={post.image} alt={post.alt} width={1200} height={720} />
      {post.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </article>
  );
}
