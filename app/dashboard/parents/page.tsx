<<<<<<< HEAD
import Loader from "@/app/components/Loader/Loader";
import ParentsSection from "@/app/components/ParentsSection/ParentsSection";
=======
import ParentsSection from "@/app/components/ParentsSection/ParentsSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Parents",
};

export default function ParentsPage() {
  return (
<<<<<<< HEAD
    <Suspense fallback={<Loader />}>
=======
    <Suspense fallback={<TableSkeleton />}>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      <ParentsSection />
    </Suspense>
  );
}
