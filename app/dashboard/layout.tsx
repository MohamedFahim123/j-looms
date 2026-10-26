"use client";
<<<<<<< HEAD

import logo from "@/public/Ellipse6.svg";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { getTokenFromServerCookies } from "../auth/utils/storeTokenOnServer";
import LogoutBtn from "../components/LogoutBtn/LogoutBtn";
import SideBar from "../components/SideBar/SideBar";
import { useUserStore } from "../store/getLoginnedUserProfile";
import { useLoginnedUserStore } from "../store/useCurrLoginnedUser";
import { LayoutInterface } from "../utils/interfaces";
import styles from "./dashboardMain.module.css";
=======
import React, { useEffect, useState } from "react";
import { LayoutInterface } from "../utils/interfaces";
import SideBar from "../components/SideBar/SideBar";
import { FaBell } from "react-icons/fa";
import styles from "./dashboardMain.module.css";
import Image from "next/image";
import logo from "@/public/Ellipse6.svg";
import { usePathname, useRouter } from "next/navigation";
import LogoutBtn from "../components/LogoutBtn/LogoutBtn";
import Cookies from "js-cookie";
import { MockBridge } from "@/lib/mock/MockBridge";
import { AppToaster } from "@/app/components/AppToaster";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

export default function Layout({ children }: LayoutInterface) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
<<<<<<< HEAD
  const { userLoginned, setUserLoginned, setUserLoginnedType } =
    useLoginnedUserStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (!userLoginned) {
      const userCookies = Cookies.get("CurrUserLoginned");
      setUserLoginned(JSON.parse(userCookies || "{}"));
    }
  }, [setUserLoginned, userLoginned]);

  useEffect(() => {
    const userType =
      typeof window !== "undefined" ? localStorage.getItem("userType") : null;
    if (userType) {
      setUserLoginnedType(userType);
    }
  }, [setUserLoginnedType]);

  useEffect(() => {
    (async () => {
      const token = await getTokenFromServerCookies();
      if (!token) {
        router.push("/auth/login");
        return;
      }
    })();
  }, [router]);

  return (
    <div className="flex min-h-screen">
=======
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("SERVER_JLOOMS_TOKEN");
    if (!token) {
      router.push("/auth/login");
      return;
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <MockBridge />
      <AppToaster />
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      <div
        className={`${styles.sideBarContainer} ${collapsed ? "w-20" : "w-62"}`}
      >
        <div className={`flex flex-col items-center py-4`}>
<<<<<<< HEAD
          <Image
            width={100}
            height={100}
            src={
              user?.image ? (user?.image !== "N/A" ? user?.image : logo) : logo
            }
            alt="Join Looms Logo"
            className="rounded-full mb-1"
          />
          <h2
            className={`font-semibold ${styles.dashBoardMainColor} ${
              collapsed && "hidden"
            }`}
          >
            {user?.admin_name
              ? user?.admin_name !== "N/A"
                ? user?.admin_name
                : ""
              : ""}
=======
          <Image src={logo} alt="Join Looms Logo" />
          <h2
            className={`font-semibold ${styles.dashBoardMainColor} ${collapsed && "hidden"}`}
          >
            Sample Inter. school
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
          </h2>
        </div>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className={`flex flex-col flex-1 ${styles.sideBarContainer}`}>
        <header className="flex justify-between items-center px-6 py-4">
          <h1 className={`text-2xl font-bold ${styles.dashBoardMainColor}`}>
<<<<<<< HEAD
            Hello, {userLoginned?.name} 👋
=======
            Hello, Moe 👋
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
          </h1>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/notifications")}
<<<<<<< HEAD
              className={styles.dashBoardMainColor}
=======
              className={`${styles.dashBoardMainColor} transition duration-200 hover:opacity-70`}
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
            >
              <FaBell size={24} />
            </button>
            <LogoutBtn />
          </div>
        </header>
        <main className="flex-1 px-6 pt-6">
<<<<<<< HEAD
          <div className={`bg-white ${styles.contentRadius}`}>{children}</div>
=======
          <div
            key={pathname}
            className={`bg-white page-enter ${styles.contentRadius}`}
          >
            {children}
          </div>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
        </main>
      </div>
    </div>
  );
}
