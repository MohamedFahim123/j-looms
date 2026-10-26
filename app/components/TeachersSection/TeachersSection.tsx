"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { Table } from "@/app/dashboard/utils/interfaces";
<<<<<<< HEAD
import { useLoginnedUserStore } from "@/app/store/useCurrLoginnedUser";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
=======
import { useDashboardList } from "@/app/hooks/useDashboardList";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
import DashBoardTable from "../DashBoardTable/DashBoardTable";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
<<<<<<< HEAD

let loading: boolean = true;
async function fetchTeachersData(
  filters: Record<string, string | number> = {}
): Promise<{ data: Table[]; totalPages: number }> {
  loading = true;

  const token = await getTokenFromServerCookies();

  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, String(value));
    }
  });

  const apiUrl =
    filters?.status || filters.name
      ? `${dataURLS.filterTeachers}?${queryParams}&t=${new Date().getTime()}`
      : `${dataURLS.teachers}?t=${new Date().getTime()}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return { data: [], totalPages: 0 };
  }

  const data = await response.json();
  loading = false;
  return {
    data: data?.data?.teachers || [],
    totalPages: data?.meta?.totalPages || 1,
  };
}
export default function TeachersSection() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [teachers, setTeachers] = useState<Table[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const { userLoginned, userLoginnedType } = useLoginnedUserStore();

  useEffect(() => {
    const newFilters: Record<string, string | number> = {
      status: searchParams.get("status") || "",
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || 1,
    };
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      const { data, totalPages } = await fetchTeachersData(filters);
      setTeachers(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] =
    userLoginnedType === "Admin"
      ? ["name", "phone", "email", "status", "action"]
      : userLoginned?.permissions?.includes("Delete Teachers")
      ? ["name", "phone", "email", "status", "action"]
      : ["name", "phone", "email", "status"];

  return (
    <div
      className={`${
        totalPages > 1 && "pb-6"
      } w-full bg-white shadow-md rounded-lg overflow-hidden`}
    >
      <DashBoardPageHead
        text="Teachers"
        btnText="Add Teacher"
        haveBtn={
          userLoginnedType === "Admin"
            ? true
            : userLoginned?.permissions?.includes("Create Teachers")
            ? true
            : false
        }
        btnLink="/dashboard/teachers/add-new-teacher"
      />
      <DashBoardFilterations page="teachers" placeHolder="Find a teacher" />
      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : teachers.length > 0 ? (
          <>
            <DashBoardTable
              tableData={teachers}
              tableCells={tableCells}
              currPage="teachers"
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Teachers!
            </p>
          </div>
        )}
      </div>
=======
import ListFrame from "../ListFrame/ListFrame";

async function fetchTeachers(filters: Record<string, string>) {
  const token = Cookies.get("SERVER_JLOOMS_TOKEN");
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });
  const apiUrl =
    filters.status || filters.name
      ? `${dataURLS.filterTeachers}?${queryParams}&t=${Date.now()}`
      : `${dataURLS.teachers}?${queryParams}&t=${Date.now()}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      return { data: [] as Table[], totalPages: 0, error: true };
    const data = await response.json();
    return {
      data: (data?.data?.teachers || []) as Table[],
      totalPages: data?.meta?.totalPages || 0,
    };
  } catch {
    return { data: [] as Table[], totalPages: 0, error: true };
  }
}

export default function TeachersSection() {
  const searchParams = useSearchParams();
  const list = useDashboardList<Table>(searchParams.toString(), fetchTeachers);
  const tableCells = ["name", "phone", "email", "status", "action"];

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
      <DashBoardPageHead
        text="Teachers"
        btnText="Add Teacher"
        haveBtn={true}
        btnLink="/dashboard/teachers/add-new-teacher"
      />
      <DashBoardFilterations page="teachers" placeHolder="Find a teacher" />
      <ListFrame
        status={list.status}
        empty={list.rows.length === 0}
        emptyLabel="No teachers yet."
        onRetry={list.retry}
      >
        <div className="overflow-x-auto">
          <DashBoardTable
            tableData={list.rows}
            tableCells={tableCells}
            currPage="teachers"
          />
          <Pagination
            totalPages={list.totalPages}
            currentPage={Number(list.filters.page) || 1}
          />
        </div>
      </ListFrame>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    </div>
  );
}
