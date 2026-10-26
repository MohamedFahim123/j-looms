"use client";

import ErrorPanel from "@/app/components/ErrorPanel/ErrorPanel";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPanel
      title="This page hit a problem"
      message="The school data did not come back. Nothing on the page was changed."
      onRetry={reset}
    />
  );
}
