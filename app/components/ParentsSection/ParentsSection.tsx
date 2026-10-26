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
async function fetchparentsData(
  filters: Record<string, string | number> = {}
): Promise<{ data: Table[]; totalPages: number }> {
  loading = true;
  const token = await getTokenFromServerCookies();

  const apiUrl = filters.name
    ? `${dataURLS.filterParents}?q=${filters?.name}&t=${new Date().getTime()}`
    : `${dataURLS.allParents}?t=${new Date().getTime()}`;

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
    data: data?.data?.parents || [],
    totalPages: data?.meta?.totalPages || 1,
  };
=======
import ListFrame from "../ListFrame/ListFrame";

async function fetchParents(filters: Record<string, string>) {
  const token = Cookies.get("SERVER_JLOOMS_TOKEN");
  const queryParams = new URLSearchParams();
  if (filters.name) queryParams.set("q", filters.name);
  if (filters.page) queryParams.set("page", filters.page);
  const apiUrl = filters.name
    ? `${dataURLS.filterParents}?${queryParams.toString()}&t=${Date.now()}`
    : `${dataURLS.allParents}?${queryParams.toString()}&t=${Date.now()}`;
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
      data: (data?.data?.parents || []) as Table[],
      totalPages: data?.meta?.totalPages || 0,
    };
  } catch {
    return { data: [] as Table[], totalPages: 0, error: true };
  }
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
}

export default function ParentsSection() {
  const searchParams = useSearchParams();
<<<<<<< HEAD
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [parents, setParents] = useState<Table[]>([]);
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
      const { data, totalPages } = await fetchparentsData(filters);
      setParents(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] =
    userLoginnedType === "Admin"
      ? ["Parent Name", "Code", "Mobile", "Email", "Action"]
      : userLoginned?.permissions?.includes("Delete Parents")
      ? ["Parent Name", "Code", "Mobile", "Email", "Action"]
      : ["Parent Name", "Code", "Mobile", "Email"];

  return (
    <div
      className={`${
        totalPages > 1 && "pb-6"
      } w-full bg-white shadow-md rounded-lg overflow-hidden`}
    >
      <DashBoardPageHead
        text="Parents"
        btnText="Add Parent"
        haveBtn={
          userLoginnedType === "Admin"
            ? true
            : userLoginned?.permissions?.includes("Create Parents")
            ? true
            : false
        }
=======
  const list = useDashboardList<Table>(searchParams.toString(), fetchParents);
  const tableCells = ["Parent Name", "Code", "Mobile", "Email", "Remove"];

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
      <DashBoardPageHead
        text="Parents"
        btnText="Add Parent"
        haveBtn={true}
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
        btnLink="/dashboard/parents/add-parent"
      />
      <DashBoardFilterations
        doesNotHaveFilterStatus={true}
        page="parents"
        placeHolder="Find a Parent"
      />
<<<<<<< HEAD
      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : parents.length > 0 ? (
          <>
            <DashBoardTable
              tableData={parents}
              tableCells={tableCells}
              currPage="parents"
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Parents!
            </p>
          </div>
        )}
      </div>
=======
      <ListFrame
        status={list.status}
        empty={list.rows.length === 0}
        emptyLabel="No parents yet."
        onRetry={list.retry}
      >
        <div className="overflow-x-auto">
          <DashBoardTable
            tableData={list.rows}
            tableCells={tableCells}
            currPage="parents"
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
