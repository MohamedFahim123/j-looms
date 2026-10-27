"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type StatusOption = { value: string; defaultValue?: boolean };

export function useTeacherStatus(
  teacherId?: string,
  filterOptions?: StatusOption[],
) {
  const initial = filterOptions?.find((item) => item.defaultValue)?.value || "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  const updateStatus = async (next: string) => {
    const previous = value;
    setValue(next);
    if (!teacherId) return;
    const token =
      Cookies.get("CLIENT_JLOOMS_TOKEN") || (await getTokenFromServerCookies());
    const toastId = toast.loading("Loading...");
    try {
      const request = await fetch(
        `${dataURLS.updateTeacherStatus}/${teacherId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: next }),
        },
      );
      const response = await request.json();
      if (response?.status === 200) {
        toast.update(toastId, {
          render: response?.message || "Updated Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
        return;
      }
      setValue(previous);
      toast.update(toastId, {
        render: response?.message || "Request failed!",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    } catch {
      setValue(previous);
      toast.update(toastId, {
        render: "Request failed!",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  return { value, updateStatus };
}
