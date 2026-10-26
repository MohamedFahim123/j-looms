"use client";

import { useProfileScreen } from "@/app/hooks/useProfileScreen";
import ErrorPanel from "../ErrorPanel/ErrorPanel";
import { FormSkeleton } from "../Skeleton/Skeleton";
import SchoolFields from "../SchoolFields/SchoolFields";

const fields = [
  { key: "admin_name" as const, label: "Admin name" },
  { key: "school_name" as const, label: "School name" },
  { key: "email" as const, label: "Email" },
  { key: "phone" as const, label: "Phone" },
  { key: "address" as const, label: "Address" },
];

export default function ProfileSection() {
  const screen = useProfileScreen();
  return (
    <section className="w-full">
      <header className="flex items-center justify-between gap-3 border-b border-[#EEF0F4] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[#222233]">Profile</h2>
        {screen.status === "ready" && !screen.editing ? (
          <button
            type="button"
            onClick={screen.startEdit}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-indigo-700"
          >
            Edit
          </button>
        ) : null}
      </header>
      {screen.status === "loading" ? <FormSkeleton /> : null}
      {screen.status === "error" ? <ErrorPanel onRetry={screen.retry} /> : null}
      {screen.status === "ready" && !screen.editing ? (
        <dl className="grid gap-5 px-6 py-6 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key}>
              <dt className="text-sm font-medium text-[#6B7280]">
                {field.label}
              </dt>
              <dd className="mt-1 text-sm text-[#222233]">
                {screen.draft[field.key] || "—"}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {screen.status === "ready" && screen.editing ? (
        <SchoolFields
          draft={screen.draft}
          fields={fields}
          message={screen.message}
          saving={screen.saving}
          submitLabel="Save profile"
          onField={screen.setField}
          onSave={screen.saveProfile}
          onCancel={screen.cancelEdit}
        />
      ) : null}
    </section>
  );
}
