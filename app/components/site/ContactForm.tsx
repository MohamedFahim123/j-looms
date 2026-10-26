"use client";

import { useContactNote } from "@/app/hooks/useContactNote";
import type { ContactNote } from "@/lib/site/contact";
import styles from "./site.module.css";

const fields: { key: keyof ContactNote; label: string; multiline?: boolean }[] = [
  { key: "name", label: "Your name" },
  { key: "school", label: "School" },
  { key: "email", label: "Email" },
  { key: "note", label: "What do you need?", multiline: true },
];

export function ContactForm() {
  const form = useContactNote();

  if (form.saved) {
    return (
      <div className={styles.saved}>
        <p>
          This note stays on this page. A mailbox is not connected, so nothing
          was sent.
        </p>
        <dl>
          <dt>Name</dt>
          <dd>{form.saved.name}</dd>
          <dt>School</dt>
          <dd>{form.saved.school}</dd>
          <dt>Email</dt>
          <dd>{form.saved.email}</dd>
          <dt>Note</dt>
          <dd>{form.saved.note}</dd>
        </dl>
        <p>
          <button type="button" className={styles.primary} onClick={form.writeAnother}>
            Write another
          </button>
        </p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        form.submit();
      }}
      noValidate
    >
      {fields.map((field) => (
        <label key={field.key}>
          {field.label}
          {field.multiline ? (
            <textarea
              id={field.key}
              value={form.values[field.key]}
              onChange={(event) => form.setField(field.key, event.target.value)}
              aria-invalid={Boolean(form.errors[field.key])}
              aria-describedby={form.errors[field.key] ? `${field.key}-error` : undefined}
            />
          ) : (
            <input
              id={field.key}
              type={field.key === "email" ? "email" : "text"}
              value={form.values[field.key]}
              onChange={(event) => form.setField(field.key, event.target.value)}
              aria-invalid={Boolean(form.errors[field.key])}
              aria-describedby={form.errors[field.key] ? `${field.key}-error` : undefined}
              autoComplete={field.key === "email" ? "email" : "name"}
            />
          )}
          {form.errors[field.key] ? (
            <span id={`${field.key}-error`} className={styles.fieldError}>
              {form.errors[field.key]}
            </span>
          ) : null}
        </label>
      ))}
      <button type="submit" className={styles.primary}>
        Keep this note
      </button>
    </form>
  );
}
