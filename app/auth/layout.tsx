import { AuthCard } from "@/app/auth/AuthCard";
import { AuthGate } from "@/app/auth/AuthGate";
import { AuthStory } from "@/app/auth/AuthStory";
import { AppToaster } from "@/app/components/AppToaster";
import logo from "@/app/imgs/auth/BlueAndWhiteIllustrativeKidsApparelLogoBlue.png";
import { MockBridge } from "@/lib/mock/MockBridge";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./authStyles.module.css";

const points = [
  "Classes, teachers, and families",
  "Attendance and the day's notes",
  "One office login for the school",
];

export const metadata: Metadata = {
  title: {
    default: "Sign in",
    template: "%s · Join Looms",
  },
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <MockBridge />
      <AppToaster />
      <AuthGate />
      <div className={styles.desk}>
        <a href="#auth-card" className={styles.skip}>
          Skip to the form
        </a>
        <Link href="/" className={styles.home} aria-label="Home">
          <HomeMark />
        </Link>
        <section className={styles.story}>
        <Image src={logo} alt="Join Looms" className={styles.logo} priority />
        <AuthStory />
        <div className={styles.stage}>
          <div className={styles.bars} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={styles.mark} aria-hidden="true">
            <ClassMark />
          </div>
          <div className={styles.floatCard}>
            <span>School desk</span>
            <strong>Teachers, classes, families</strong>
          </div>
        </div>
          <ul className={styles.points}>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
        <section className={styles.panel} id="auth-card">
          <AuthCard>{children}</AuthCard>
        </section>
      </div>
    </div>
  );
}

function HomeMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClassMark() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <path d="M16 22h28a6 6 0 0 1 6 6v24H22a6 6 0 0 0-6 6V22Z" fill="#fff" />
      <path
        d="M22 22h28a6 6 0 0 1 6 6v24"
        stroke="#4338ca"
        strokeWidth="3"
        strokeLinejoin="round"
      
      />
      <path d="M24 34h20M24 42h14" stroke="#4338ca" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}