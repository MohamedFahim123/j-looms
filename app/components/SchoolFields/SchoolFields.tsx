"use client";

import type { SchoolProfile } from "@/app/hooks/useProfileScreen";
import SelectMenu, { type SelectOption } from "../SelectMenu/SelectMenu";

const fieldClass =
  "w-full rounded-xl border border-[#E6E8EE] bg-white px-4 py-2.5 text-sm text-[#1F2937] outline-none transition duration-200 focus:border-[#0F766E]";

export type ProfileField = {
  key: keyof SchoolProfile;
  label: string;
  kind?: "text" | "select";
  options?: SelectOption[];
};

type SchoolFieldsProps = {
  draft: SchoolProfile;
  fields: ProfileField[];
  message: string;
  saving: boolean;
  submitLabel: string;
  onField: (key: keyof SchoolProfile, value: string) => void;
  onSave: () => void;
  onCancel?: () => void;
};

export default function SchoolFields({
  draft,
  fields,
  message,
  saving,
  submitLabel,
  onField,
  onSave,
  onCancel,
}: SchoolFieldsProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
      className="grid gap-4 px-6 py-6 md:grid-cols-2"
    >
      {fields.map((field) => (
        <label key={field.key} className="block text-sm text-[#374151]">
          <span className="mb-2 block font-medium">{field.label}</span>
          {field.kind === "select" ? (
            <SelectMenu
              value={draft[field.key]}
              onChange={(value) => onField(field.key, value)}
              options={field.options ?? []}
            />
          ) : (
            <input
              className={fieldClass}
              value={draft[field.key]}
              onChange={(event) => onField(field.key, event.target.value)}
            />
          )}
        </label>
      ))}
      {message ? (
        <p className="text-sm text-red-600 md:col-span-2">{message}</p>
      ) : null}
      <div className="flex gap-3 md:col-span-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-xl border border-[#E6E8EE] bg-white px-4 py-2.5 text-sm font-medium text-[#1F2937] transition duration-200 hover:bg-[#F7F8FA] disabled:opacity-50"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
