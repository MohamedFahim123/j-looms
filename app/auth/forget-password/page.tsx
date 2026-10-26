import AuthForm from "@/app/components/AuthForm/AuthForm";
import AuthBtnSubmit from "@/app/components/AuthBtnSubmit/AuthBtnSubmit";
import type { Metadata } from "next";
import styles from "../authStyles.module.css";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgetPasswordPage() {
  return (
    <>
      <h2 className={styles.cardTitle}>Forgot password</h2>
      <p className={styles.cardLede}>Practice reset code: 123456</p>
      <AuthForm type="forgetPassword" />
      <AuthBtnSubmit
        type="Sign in"
        typeBtn="button"
        isSubmitting={false}
        navigateTo="/auth/login"
      />
    </>
  );
}
