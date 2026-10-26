"use client";

import { useProfileScreen } from "@/app/hooks/useProfileScreen";
import ErrorPanel from "../ErrorPanel/ErrorPanel";
import { FormSkeleton } from "../Skeleton/Skeleton";
import SchoolFields from "../SchoolFields/SchoolFields";

const fields = [
  { key: "school_name" as const, label: "School name" },
  { key: "email" as const, label: "Email" },
  { key: "phone" as const, label: "Phone" },
  { key: "address" as const, label: "Address" },
];

export default function SchoolDetailsSection() {
  const screen = useProfileScreen();
  return (
    <section className="w-full">
      <header className="border-b border-[#EEF0F4] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[#222233]">
          School details
        </h2>
      </header>
      {screen.status === "loading" ? <FormSkeleton /> : null}
      {screen.status === "error" ? <ErrorPanel onRetry={screen.retry} /> : null}
      {screen.status === "ready" ? (
        <SchoolFields
          draft={screen.draft}
          fields={fields}
          message={screen.message}
          saving={screen.saving}
          submitLabel="Save details"
          onField={screen.setField}
          onSave={screen.saveProfile}
        />
      ) : null}
    </section>
  );
}
