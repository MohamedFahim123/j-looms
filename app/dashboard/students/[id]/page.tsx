import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
<<<<<<< HEAD
import DashBoardTable from "@/app/components/DashBoardTable/DashBoardTable";
import Loader from "@/app/components/Loader/Loader";
import SingleStudentView from "@/app/components/SingleStudentView/SingleStudentView";
import { useLoginnedUserStore } from "@/app/store/useCurrLoginnedUser";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { dataURLS } from "../../utils/dataUrls";
=======
import SingleStudentView from "@/app/components/SingleStudentView/SingleStudentView";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { dataURLS } from "../../utils/dataUrls";
import DashBoardTable from "@/app/components/DashBoardTable/DashBoardTable";
import { serverFetch } from "@/lib/mock/server-fetch";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

interface ParamsProps {
  id: string;
}

interface StudentsDetailsProps {
  params: Promise<ParamsProps>;
}
<<<<<<< HEAD
=======

export const dynamic = "force-dynamic";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

export const metadata: Metadata = {
  title: `Student Details`,
};

export default async function SingleStudentPage({
  params,
}: StudentsDetailsProps) {
  const { id } = await params;
  const cookiesData = await cookies();
<<<<<<< HEAD
  const token = cookiesData.get("CLIENT_JLOOMS_TOKEN")?.value;
  const { userLoginned, userLoginnedType } = useLoginnedUserStore.getState();

  const fetchTeacher = await fetch(`${dataURLS.singleStudent}/${id}`, {
=======
  const token = cookiesData.get("SERVER_JLOOMS_TOKEN")?.value;

  const fetchTeacher = await serverFetch(`${dataURLS.singleStudent}/${id}`, {
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await fetchTeacher?.json();
<<<<<<< HEAD

  const student = response?.data?.student;
  const tableCells =
    userLoginnedType === "Admin"
      ? ["Parent Name", "Parent Code", "Relation", "Mobile"]
      : userLoginned?.permissions?.includes("Un Assign Parents")
      ? ["Parent Name", "Parent Code", "Relation", "Mobile", "Remove"]
      : ["Parent Name", "Parent Code", "Relation", "Mobile"];

  return (
    <Suspense fallback={<Loader />}>
=======
  const student = response?.data?.student;
  if (fetchTeacher.status === 401) redirect("/auth/login");
  if (!fetchTeacher.ok || !student) notFound();
  const tableCells = [
    "Parent Name",
    "Parent Code",
    "Relation",
    "Mobile",
    "Remove",
  ];

  return (
    <Suspense fallback={<TableSkeleton />}>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <DashBoardPageHead
          text={`code: ${student?.code}` || ""}
          haveBtn={false}
        />
        <SingleStudentView student={student} />
<<<<<<< HEAD
        {userLoginnedType === "Admin"
          ? student?.parents?.length > 0 && (
              <DashBoardTable
                currPage="singleStudent"
                tableCells={tableCells}
                tableData={student?.parents}
                currStudentId={id}
              />
            )
          : userLoginned?.permissions?.includes("Assign Parents") &&
            student?.parents?.length > 0 && (
              <DashBoardTable
                currPage="singleStudent"
                tableCells={tableCells}
                tableData={student?.parents}
                currStudentId={id}
              />
            )}
=======
        {student?.parents?.length > 0 && (
          <DashBoardTable
            currPage="singleStudent"
            tableCells={tableCells}
            tableData={student?.parents}
            currStudentId={id}
          />
        )}
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      </div>
    </Suspense>
  );
}
