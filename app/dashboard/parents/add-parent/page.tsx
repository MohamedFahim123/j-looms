import AddParentForm from "@/app/components/AddParentForm/AddParentForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
<<<<<<< HEAD
import Loader from "@/app/components/Loader/Loader";
=======
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Add Parent`,
};

export default function AddParentPage() {
  return (
<<<<<<< HEAD
    <Suspense fallback={<Loader />}>
=======
    <Suspense fallback={<TableSkeleton />}>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add Parent" />
        <AddParentForm />
      </div>
    </Suspense>
  );
}
