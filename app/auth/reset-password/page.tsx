import AuthForm from "@/app/components/AuthForm/AuthForm";
import type { Metadata } from "next";
import styles from "../authStyles.module.css";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <>
      <h2 className={styles.cardTitle}>Reset password</h2>
      <p className={styles.cardLede}>Practice reset code: 123456</p>
      <AuthForm type="resetPassword" />
    </>
  );
}
