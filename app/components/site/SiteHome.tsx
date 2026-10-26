import {
  beliefs,
  deskSteps,
  marqueeWords,
  posts,
  sampleDay,
} from "@/lib/site/content";
import Image from "next/image";
import Link from "next/link";
import styles from "./site.module.css";

const reel = [...marqueeWords, ...marqueeWords];

export function SiteHome() {
  return (
    <>
      <section className={styles.hero}>
        <h1>
          <span className={styles.mask}>
            <span className={styles.serifLine}>The school day,</span>
          </span>
          <span className={styles.mask}>
            <span className={styles.sansLine}>held on one desk.</span>
          </span>
        </h1>
        <p className={styles.lede}>
          Teachers, classes, families, and the notes that keep the day moving.
          Built for the person who opens the school office.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/auth/register/step1">
            Open a school desk
          </Link>
          <Link className={styles.secondary} href="/auth/login">
            Sign in
          </Link>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {reel.map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </div>
      </div>

      <section className={styles.steps}>
        <h2>Everything the office opens in the morning</h2>
        <ol>
          {deskSteps.map((step) => (
            <li key={step.index}>
              <div>
                <h3>{step.title}</h3>
                <span>{step.index}</span>
              </div>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <Link className={styles.primary} href="/about">
          Read how the desk works
        </Link>
      </section>

      <section className={styles.belief}>
        <h2>
          <span className={styles.serifLine}>Built for the office</span>
          <span className={styles.sansLine}>Opened every morning</span>
        </h2>
        <div className={styles.beliefs}>
          {beliefs.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.case}>
        <div className={styles.caseCopy}>
          <h2>A morning the office can open</h2>
          <p>Sample day. Not a live school.</p>
          <ul>
            {sampleDay.map((line) => (
              <li key={line.room}>
                <strong>{line.room}</strong>
                <span>{line.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.casePhoto}>
          <Image
            src="/site/classroom.jpg"
            alt="An empty classroom with rows of desks"
            fill
            sizes="(max-width: 800px) 100vw, 480px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <section className={styles.journalPreview}>
        <h2>From the journal</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blogs/${post.slug}`}>
                <span>{post.title}</span>
                <small>{post.date}</small>
              </Link>
            </li>
          ))}
        </ul>
        <Link className={styles.textLink} href="/blogs">
          View all notes
        </Link>
      </section>

      <blockquote className={styles.quote}>
        <p>The office still runs the day. The record stays where the day is.</p>
        <footer>Join Looms</footer>
      </blockquote>

      <section className={styles.close}>
        <h2>Open the desk for your school.</h2>
        <Link className={styles.primary} href="/contact">
          Write to the desk
        </Link>
      </section>
    </>
  );
}
