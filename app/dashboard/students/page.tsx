<<<<<<< HEAD
import Loader from "@/app/components/Loader/Loader";
import StudentsSection from "@/app/components/StudentsSection/StudentsSection";
=======
import StudentsSection from "@/app/components/StudentsSection/StudentsSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Students",
};

const StudentsPage = () => {
  return (
<<<<<<< HEAD
    <Suspense fallback={<Loader />}>
=======
    <Suspense fallback={<TableSkeleton />}>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      <StudentsSection />
    </Suspense>
  );
};
export default StudentsPage;
