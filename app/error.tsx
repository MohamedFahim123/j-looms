"use client";

import ErrorPanel from "@/app/components/ErrorPanel/ErrorPanel";

export default function RootError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#EBECFA] px-6">
      <div className="w-full max-w-lg rounded-[20px] bg-white">
        <ErrorPanel
          title="Join Looms could not open this page"
          onRetry={reset}
        />
      </div>
    </main>
  );
}
