"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./appToaster.module.css";

export function AppToaster() {
  return (
    <div className={styles.host}>
      <ToastContainer position="top-right" />
    </div>
  );
}
