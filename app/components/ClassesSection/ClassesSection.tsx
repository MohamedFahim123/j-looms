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
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
import DashBoardTable from "../DashBoardTable/DashBoardTable";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import ListFrame from "../ListFrame/ListFrame";

<<<<<<< HEAD
let loading: boolean = true;

async function fetchClassesData(
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

  const apiUrl = filters.name
    ? `${dataURLS.filterClasses}?${queryParams}&t=${new Date().getTime()}`
    : `${dataURLS.getAllClasses}?t=${new Date().getTime()}`;

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
    data: data?.data?.classes || [],
    totalPages: data?.meta?.totalPages || 1,
  };
}
export default function ClassesSection() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [classes, setClasses] = useState<Table[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const { userLoginned, userLoginnedType } = useLoginnedUserStore();

  useEffect(() => {
    const newFilters: Record<string, string | number> = {
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || 1,
    };
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      const { data, totalPages } = await fetchClassesData(filters);
      setClasses(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] =
    userLoginnedType === "Admin"
      ? ["Class Name", "Number of Students", "Actions"]
      : userLoginned?.permissions?.includes("Delete Classes")
      ? ["Class Name", "Number of Students", "Actions"]
      : ["Class Name", "Number of Students"];

  return (
    <div
      className={`${
        totalPages > 1 && "pb-6"
      } w-full bg-white shadow-md rounded-lg overflow-hidden`}
    >
      <DashBoardPageHead
        text="Classes"
        btnText="Add Class"
        haveBtn={
          userLoginnedType === "Admin"
            ? true
            : userLoginned?.permissions?.includes("Create Classes")
            ? true
            : false
        }
=======
async function fetchClasses(filters: Record<string, string>) {
  const token = Cookies.get("SERVER_JLOOMS_TOKEN");
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });
  const apiUrl = filters.name
    ? `${dataURLS.filterClasses}?${queryParams}&t=${Date.now()}`
    : `${dataURLS.classes}?${queryParams}&t=${Date.now()}`;
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
      data: (data?.data?.classes || []) as Table[],
      totalPages: data?.meta?.totalPages || 0,
    };
  } catch {
    return { data: [] as Table[], totalPages: 0, error: true };
  }
}

export default function ClassesSection() {
  const searchParams = useSearchParams();
  const list = useDashboardList<Table>(searchParams.toString(), fetchClasses);
  const tableCells = ["Class Name", "Number of Students", "Actions"];

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
      <DashBoardPageHead
        text="Classes"
        btnText="Add Class"
        haveBtn={true}
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
        btnLink="/dashboard/classes/add-new-class"
      />
      <DashBoardFilterations
        doesNotHaveFilterStatus={true}
        page="classes"
        placeHolder="Find a class"
      />
<<<<<<< HEAD
      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : classes?.length > 0 ? (
          <>
            <DashBoardTable
              tableData={classes}
              tableCells={tableCells}
              currPage="classes"
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Classes!
            </p>
          </div>
        )}
      </div>
=======
      <ListFrame
        status={list.status}
        empty={list.rows.length === 0}
        emptyLabel="No classes yet."
        onRetry={list.retry}
      >
        <div className="overflow-x-auto">
          <DashBoardTable
            tableData={list.rows}
            tableCells={tableCells}
            currPage="classes"
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
