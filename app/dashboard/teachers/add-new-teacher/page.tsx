import AddTeacherForm from "@/app/components/AddTeacherForm/AddTeacherForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
<<<<<<< HEAD
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { Suspense } from "react";
=======
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import { Metadata } from "next";
import React, { Suspense } from "react";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

export const metadata: Metadata = {
  title: "Add New Teacher",
};

export default function AddNewTeacherPage() {
  return (
<<<<<<< HEAD
    <Suspense fallback={<Loader />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add Teacher" />
        <AddTeacherForm />
      </div>
=======
    <Suspense fallback={<TableSkeleton />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
      <DashBoardPageHead text="Add Teacher" />
      <AddTeacherForm />
    </div>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    </Suspense>
  );
}
