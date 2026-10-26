<<<<<<< HEAD
"use client";

import AuthForm from "@/app/components/AuthForm/AuthForm";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Logo from "../../imgs/auth/BlueAndWhiteIllustrativeKidsApparelLogoBlue.png";
import styles from "../authStyles.module.css";
import {
  CustomEmailInput,
  CustomPasswordInput,
} from "../utils/customInputsValues";
import { Input } from "../utils/interfaces";

export default function LoginPage() {
  const [userType, setUserType] = useState<string>("Admin");

  const loginInputs: Input[] = [CustomEmailInput, CustomPasswordInput];

  useEffect(() => {
    const userType =
      typeof window !== "undefined" ? localStorage.getItem("userType") : null;
    if (userType === "Admin") {
      setUserType("Admin");
    }
  }, []);

  const handleChangeUserType = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const userType = e.target.value;
      if (userType === "Admin") {
        setUserType("Admin");
        localStorage.setItem("userType", "Admin");
      } else {
        setUserType("Employee");
        localStorage.setItem("userType", "Employee");
      }
    },
    []
  );

  return (
    <>
      <div className="flex justify-center">
        <Image
          src={Logo}
          alt="Join Looms Logo"
          width={100}
          height={100}
          className="scale-125 object-fill"
        />
      </div>
      <h1 className={`${styles.heading} text-center mb-3 text-4xl font-bol`}>
        Login
      </h1>
      <p className={`${styles.paragraph} text-center mb-4`}>
        Welcome, Log into you account
      </p>
      <AuthForm
        type={"login"}
        inputs={loginInputs}
        userType={userType}
        handleChangeUserType={handleChangeUserType}
      />
      <p className={`${styles.paragraph} text-center mb-10 text-sm mt-4`}>
        Already have an account?{" "}
        <Link
          href="/auth/register/step1"
          className="text-indigo-600 font-semibold underline"
        >
          Sign up
        </Link>
=======
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
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      </p>
    </>
  );
}
