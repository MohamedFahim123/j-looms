import SubjectsSection from "@/app/components/SubjectsSection/SubjectsSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Subjects" };

export default function SubjectsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <SubjectsSection />
    </Suspense>
  );
}
