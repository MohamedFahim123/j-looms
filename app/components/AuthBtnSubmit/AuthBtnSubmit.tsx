"use client";

import React from "react";
import styles from "./authBtnSubmit.module.css";
import { useRouter } from "next/navigation";

interface AuthBtnSubmitProps {
  type: string;
  isSubmitting: boolean;
  typeBtn?: "button";
  navigateTo?: string;
}

export default function AuthBtnSubmit({
  type,
  isSubmitting,
  typeBtn,
  navigateTo,
}: AuthBtnSubmitProps) {
  const router = useRouter();

  const handleClick = () => {
    if (navigateTo) {
      router.push(navigateTo);
    }
  };

  return (
    <button
      type={typeBtn ? typeBtn : "submit"}
      onClick={handleClick}
      disabled={isSubmitting}
      className={`${styles.authSubmit} ${typeBtn ? styles.typeBtn : ""}`}
    >
      {type}
    </button>
  );
}
