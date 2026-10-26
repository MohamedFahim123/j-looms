import SchoolStaffSection from "@/app/components/SchoolStaffSection/SchoolStaffSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "School staff" };

export default function SchoolStaffPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <SchoolStaffSection />
    </Suspense>
  );
}
