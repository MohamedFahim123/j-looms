"use client";

import { AppToaster } from "@/app/components/AppToaster";
import { MockBridge } from "@/lib/mock/MockBridge";
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

export default function Layout({ children }: LayoutInterface) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
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
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("userType") : null;
    if (stored === "Admin" || stored === "Employee") {
      setUserLoginnedType(stored);
      return;
    }
    const raw = Cookies.get("CurrUserLoginned");
    if (!raw) return;
    try {
      const person = JSON.parse(raw) as { id?: string; role?: string };
      if (person.role) setUserLoginnedType("Employee");
      else if (person.id) setUserLoginnedType("Admin");
    } catch {
      return;
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
      <MockBridge />
      <AppToaster />
      <div
        className={`${styles.sideBarContainer} ${collapsed ? "w-20" : "w-62"}`}
      >
        <div className={`flex flex-col items-center py-4`}>
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
          </h2>
        </div>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className={`flex flex-col flex-1 ${styles.sideBarContainer}`}>
        <header className="flex justify-between items-center px-6 py-4">
          <h1 className={`text-2xl font-bold ${styles.dashBoardMainColor}`}>
            Hello, {userLoginned?.name} 👋
          </h1>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/notifications")}
              className={styles.dashBoardMainColor}
            >
              <FaBell size={24} />
            </button>
            <LogoutBtn />
          </div>
        </header>
        <main className="flex-1 px-6 pt-6">
          <div className={`bg-white ${styles.contentRadius}`}>{children}</div>
        </main>
      </div>
    </div>
  );
}
