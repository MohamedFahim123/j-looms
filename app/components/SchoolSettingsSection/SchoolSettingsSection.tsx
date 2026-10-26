"use client";

import { useProfileScreen } from "@/app/hooks/useProfileScreen";
import ErrorPanel from "../ErrorPanel/ErrorPanel";
import { FormSkeleton } from "../Skeleton/Skeleton";
import SchoolFields from "../SchoolFields/SchoolFields";

const timezones = [
  "Africa/Cairo",
  "Asia/Dubai",
  "Europe/London",
  "America/New_York",
].map((value) => ({ value, label: value }));
const languages = ["English", "Arabic"].map((value) => ({
  value,
  label: value,
}));
const attendance = ["Daily", "By session"].map((value) => ({
  value,
  label: value,
}));

const fields = [
  {
    key: "timezone" as const,
    label: "Timezone",
    kind: "select" as const,
    options: timezones,
  },
  {
    key: "language" as const,
    label: "Language",
    kind: "select" as const,
    options: languages,
  },
  {
    key: "attendance_mode" as const,
    label: "Attendance",
    kind: "select" as const,
    options: attendance,
  },
];

export default function SchoolSettingsSection() {
  const screen = useProfileScreen();
  return (
    <section className="w-full">
      <header className="border-b border-[#EEF0F4] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[#222233]">
          School settings
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
          submitLabel="Save settings"
          onField={screen.setField}
          onSave={screen.saveSettings}
        />
      ) : null}
    </section>
  );
}
