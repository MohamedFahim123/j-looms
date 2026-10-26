import EventsSection from "@/app/components/EventsSection/EventsSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <EventsSection />
    </Suspense>
  );
}
