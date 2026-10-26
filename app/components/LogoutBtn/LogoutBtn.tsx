<<<<<<< HEAD
import { authEndPoints } from "@/app/auth/utils/authEndPoints";
import {
  getTokenFromServerCookies,
  removeTokenFromServerCookies,
} from "@/app/auth/utils/storeTokenOnServer";
import { useLoginnedUserStore } from "@/app/store/useCurrLoginnedUser";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function LogoutBtn() {
  const logout = async () => {
    const token = await getTokenFromServerCookies();
    const { userLoginnedType } = useLoginnedUserStore.getState();
    const loadingToastId = toast.loading("Loading...");
    const fetchRes = await fetch(
      userLoginnedType === "Admin"
        ? authEndPoints.logout
        : authEndPoints.employee_logout,
      {
=======
"use client";

import { authEndPoints } from "@/app/auth/utils/authEndPoints";
import { clearServerCookie } from "@/app/auth/utils/storeTokenOnServer";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function LogoutBtn() {
  const logout = async () => {
    const loadingToastId = toast.loading("Loading...");
    const token = Cookies.get("SERVER_JLOOMS_TOKEN");
    try {
      const fetchRes = await fetch(authEndPoints.logout, {
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
<<<<<<< HEAD
      }
    );
    const res = await fetchRes.json();
    toast.update(loadingToastId, {
      render: res?.data?.message || "Logout Successfully!",
      type: "success",
      isLoading: false,
      autoClose: 1500,
    });
    await removeTokenFromServerCookies();
    Cookies.remove("CLIENT_JLOOMS_TOKEN");
    redirect("/auth/login");
=======
      });
      const res = await fetchRes.json();
      toast.update(loadingToastId, {
        render: res?.data?.message || "Logout Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
    } catch {
      toast.update(loadingToastId, {
        render: "Logout Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
    }
    Cookies.remove("SERVER_JLOOMS_TOKEN");
    await clearServerCookie("JLOOMS_TOKEN");
    window.location.assign("/auth/login");
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
  };

  return (
    <button
      onClick={logout}
      type="button"
      className={`
                flex items-center gap-2 
                px-4 py-2
                outline-none 
                bg-red-500 text-white
                rounded-lg 
                hover:bg-white transition-all duration-300 
                hover:text-red-500
                active:bg-white 
                shadow-md
                focus:outline-none 
            `}
    >
      <FaSignOutAlt size={18} />
      Logout
    </button>
  );
}
