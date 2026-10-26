"use client";

import {
  contactErrors,
  emptyContact,
  type ContactNote,
} from "@/lib/site/contact";
import { useState } from "react";

export function useContactNote() {
  const [values, setValues] = useState<ContactNote>(emptyContact);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactNote, string>>>(
    {},
  );
  const [saved, setSaved] = useState<ContactNote | null>(null);

  function setField(key: keyof ContactNote, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit() {
    const next = contactErrors(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSaved(null);
      return;
    }
    setSaved(values);
  }

  function writeAnother() {
    setValues(emptyContact);
    setErrors({});
    setSaved(null);
  }

  return { values, errors, saved, setField, submit, writeAnother };
}
