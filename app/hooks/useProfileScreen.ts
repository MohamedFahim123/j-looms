"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSchool, postSchool } from "./schoolClient";

export type SchoolProfile = {
  admin_name: string;
  school_name: string;
  email: string;
  phone: string;
  address: string;
  timezone: string;
  language: string;
  attendance_mode: string;
};

const emptyProfile: SchoolProfile = {
  admin_name: "",
  school_name: "",
  email: "",
  phone: "",
  address: "",
  timezone: "Africa/Cairo",
  language: "English",
  attendance_mode: "Daily",
};

export function useProfileScreen() {
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading",
  );
  const [saved, setSaved] = useState<SchoolProfile>(emptyProfile);
  const [draft, setDraft] = useState<SchoolProfile>(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    setMessage("");
    getSchool<{ data?: { profile?: SchoolProfile } }>("/school/profile")
      .then((json) => {
        if (!active) return;
        if (!json.data?.profile) {
          setStatus("error");
          return;
        }
        setSaved(json.data.profile);
        setDraft(json.data.profile);
        setEditing(false);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [attempt]);

  const setField = (key: keyof SchoolProfile, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage("");
    try {
      const json = await postSchool("/school/update-profile", {
        admin_name: draft.admin_name,
        name: draft.school_name,
        email: draft.email,
        phone: draft.phone,
        address: draft.address,
      });
      const next = (json.data as { profile?: SchoolProfile } | undefined)
        ?.profile;
      if (next) {
        setSaved(next);
        setDraft(next);
      }
      setEditing(false);
      toast.success("Profile saved");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not save the profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    setMessage("");
    try {
      const json = await postSchool("/school/update-settings", {
        timezone: draft.timezone,
        language: draft.language,
        attendance_mode: draft.attendance_mode,
      });
      const next = (json.data as { profile?: SchoolProfile } | undefined)
        ?.profile;
      if (next) {
        setSaved(next);
        setDraft(next);
      }
      toast.success("Settings saved");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not save settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  const startEdit = () => {
    setDraft(saved);
    setMessage("");
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(saved);
    setMessage("");
    setEditing(false);
  };

  return {
    status,
    draft,
    editing,
    message,
    saving,
    setField,
    startEdit,
    cancelEdit,
    saveProfile,
    saveSettings,
    retry: () => setAttempt((value) => value + 1),
  };
}
