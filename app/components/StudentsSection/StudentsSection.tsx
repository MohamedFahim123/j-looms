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

  const apiUrl = filters.name
    ? `${dataURLS.filterStudents}?${queryParams}&t=${new Date().getTime()}`
    : `${dataURLS.allStudents}?t=${new Date().getTime()}`;

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
    data: data?.data?.students || [],
    totalPages: data?.meta?.totalPages || 1,
  };
}
export default function StudentsSection() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [students, setStudents] = useState<Table[]>([]);
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
      setStudents(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] =
    userLoginnedType === "Admin"
      ? ["name", "class name", "parent", "action"]
      : userLoginned?.permissions?.includes("Delete Students")
      ? ["name", "class name", "parent", "action"]
      : ["name", "class name", "parent"];

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <DashBoardPageHead
        text="Students"
        btnText="Add Student"
        haveBtn={
          userLoginnedType === "Admin"
            ? true
            : userLoginned?.permissions?.includes("Create Students")
            ? true
            : false
        }
=======
import ListFrame from "../ListFrame/ListFrame";

async function fetchStudents(filters: Record<string, string>) {
  const token = Cookies.get("SERVER_JLOOMS_TOKEN");
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });
  const apiUrl = filters.name
    ? `${dataURLS.filterStudents}?${queryParams}&t=${Date.now()}`
    : `${dataURLS.allStudents}?${queryParams}&t=${Date.now()}`;
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
      data: (data?.data?.students || []) as Table[],
      totalPages: data?.meta?.totalPages || 0,
    };
  } catch {
    return { data: [] as Table[], totalPages: 0, error: true };
  }
}

export default function StudentsSection() {
  const searchParams = useSearchParams();
  const list = useDashboardList<Table>(searchParams.toString(), fetchStudents);
  const tableCells = ["name", "class name", "parent", "Remove"];

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
      <DashBoardPageHead
        text="Students"
        btnText="Add Student"
        haveBtn={true}
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
        btnLink="/dashboard/students/add-new-student"
      />
      <DashBoardFilterations
        doesNotHaveFilterStatus={true}
        page="students"
        placeHolder="Find a Student"
      />
<<<<<<< HEAD
      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : students.length > 0 ? (
          <>
            <DashBoardTable
              tableData={students}
              tableCells={tableCells}
              currPage={"students"}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Students!
            </p>
          </div>
        )}
      </div>
=======
      <ListFrame
        status={list.status}
        empty={list.rows.length === 0}
        emptyLabel="No students yet."
        onRetry={list.retry}
      >
        <div className="overflow-x-auto">
          <DashBoardTable
            tableData={list.rows}
            tableCells={tableCells}
            currPage="students"
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
