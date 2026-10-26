"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { deleteSchool, loadCollection, postSchool } from "./schoolClient";
import { useDashboardList } from "./useDashboardList";

export type SubjectRow = {
  id: number;
  name: string;
  code: string;
  class_name: string;
};
export type EventRow = {
  id: number;
  title: string;
  date: string;
  place: string;
  status: string;
};
export type NoticeRow = {
  id: number;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};
export type RequestRow = {
  id: number;
  title: string;
  requester: string;
  kind: string;
  status: string;
};
export type StaffRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
};

function loadSubjects(filters: Record<string, string>) {
  return loadCollection<SubjectRow>("/school/subjects", "subjects", filters);
}
function loadEvents(filters: Record<string, string>) {
  return loadCollection<EventRow>("/school/events", "events", filters);
}
function loadNotices(filters: Record<string, string>) {
  return loadCollection<NoticeRow>(
    "/school/notifications",
    "notifications",
    filters,
  );
}
function loadRequests(filters: Record<string, string>) {
  return loadCollection<RequestRow>("/school/requests", "requests", filters);
}
function loadStaff(filters: Record<string, string>) {
  return loadCollection<StaffRow>("/school/all-teachers", "teachers", filters);
}

export function useSubjectsScreen(query: string) {
  const list = useDashboardList(query, loadSubjects);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const createSubject = async () => {
    if (!name.trim() || !code.trim()) {
      setFormError("Name and code are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      await postSchool("/school/store-subject", {
        name: name.trim(),
        code: code.trim(),
      });
      setName("");
      setCode("");
      toast.success("Subject added");
      list.retry();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not add the subject.",
      );
    } finally {
      setSaving(false);
    }
  };

  const removeSubject = async (id: number) => {
    try {
      await deleteSchool(`/school/delete-subject/${id}`);
      toast.success("Subject removed");
      list.retry();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not remove the subject.",
      );
    }
  };

  return {
    ...list,
    name,
    code,
    setName,
    setCode,
    formError,
    saving,
    createSubject,
    removeSubject,
  };
}

export function useEventsScreen(query: string) {
  const list = useDashboardList(query, loadEvents);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const createEvent = async () => {
    if (!title.trim() || !date || !place.trim()) {
      setFormError("Title, date, and place are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      await postSchool("/school/store-event", {
        title: title.trim(),
        date,
        place: place.trim(),
        status: "Upcoming",
      });
      setTitle("");
      setDate("");
      setPlace("");
      toast.success("Event added");
      list.retry();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not add the event.",
      );
    } finally {
      setSaving(false);
    }
  };

  const removeEvent = async (id: number) => {
    try {
      await deleteSchool(`/school/delete-event/${id}`);
      toast.success("Event removed");
      list.retry();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not remove the event.",
      );
    }
  };

  return {
    ...list,
    title,
    date,
    place,
    setTitle,
    setDate,
    setPlace,
    formError,
    saving,
    createEvent,
    removeEvent,
  };
}

export function useNoticesScreen(query: string) {
  const list = useDashboardList(query, loadNotices);
  const markRead = async (id: number) => {
    try {
      await postSchool(`/school/read-notification/${id}`, {});
      list.retry();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update the notification.",
      );
    }
  };
  return { ...list, markRead };
}

export function useRequestsScreen(query: string) {
  const list = useDashboardList(query, loadRequests);
  const setStatus = async (id: number, status: string) => {
    try {
      await postSchool(`/school/update-request/${id}`, { status });
      toast.success("Request updated");
      list.retry();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update the request.",
      );
    }
  };
  return { ...list, setStatus };
}

export function useStaffScreen(query: string) {
  return useDashboardList(query, loadStaff);
}
