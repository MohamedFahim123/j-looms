import SchoolSettingsSection from "@/app/components/SchoolSettingsSection/SchoolSettingsSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "School settings" };

export default function SchoolSettingsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <SchoolSettingsSection />
    </Suspense>
  );
}
