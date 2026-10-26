import ClassesSection from "@/app/components/ClassesSection/ClassesSection";
<<<<<<< HEAD
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
=======
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Classes",
};

export default function page() {
  return (
<<<<<<< HEAD
    <Suspense fallback={<Loader />}>
=======
    <Suspense fallback={<TableSkeleton />}>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      <ClassesSection />
    </Suspense>
  );
}
