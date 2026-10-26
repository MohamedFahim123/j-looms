import SchoolDetailsSection from "@/app/components/SchoolDetailsSection/SchoolDetailsSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "School details" };

export default function SchoolDetailsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <SchoolDetailsSection />
    </Suspense>
  );
}
