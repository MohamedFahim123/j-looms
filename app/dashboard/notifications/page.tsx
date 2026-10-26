import NotificationsSection from "@/app/components/NotificationsSection/NotificationsSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <NotificationsSection />
    </Suspense>
  );
}
