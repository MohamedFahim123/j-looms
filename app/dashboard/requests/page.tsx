import RequestsSection from "@/app/components/RequestsSection/RequestsSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Requests" };

export default function RequestsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <RequestsSection />
    </Suspense>
  );
}
