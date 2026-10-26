import AuthForm from "@/app/components/AuthForm/AuthForm";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "../authStyles.module.css";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <>
      <h2 className={styles.cardTitle}>Sign in</h2>
      <p className={styles.cardLede}>Use the school office email.</p>
      <p className={styles.demo}>Demo school: admin@joinlooms.com / password123</p>
      <AuthForm type="login" />
      <p className={styles.switchRow}>
        New school? <Link href="/auth/register/step1">Create an account</Link>
      </p>
    </>
  );
}
