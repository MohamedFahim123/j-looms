import AddStudentForm from "@/app/components/AddStudentForm/AddStudentForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
<<<<<<< HEAD
import Loader from "@/app/components/Loader/Loader";
=======
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Add New Student`,
};
export default function AddNewStudentPage() {
  return (
<<<<<<< HEAD
    <Suspense fallback={<Loader />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add Student" />
      </div>
      <AddStudentForm />
=======
    <Suspense fallback={<TableSkeleton />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add Student" />
        <AddStudentForm />
      </div>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    </Suspense>
  );
}
