import Loader from "@/app/components/Loader/Loader";
import TeachersSection from "@/app/components/TeachersSection/TeachersSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Teachers",
};

export default function TeachersPage() {
  return (
<<<<<<< HEAD
    <Suspense fallback={<Loader />}>
=======
    <Suspense fallback={<TableSkeleton />}>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      <TeachersSection />
    </Suspense>
  );
}
