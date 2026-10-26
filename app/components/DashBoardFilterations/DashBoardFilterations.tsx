"use client";

<<<<<<< HEAD
import { useActionsAndActivityStore } from "@/app/store/getActivitiesAndActions";
import { useClassesStore } from "@/app/store/getAllClasses";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
=======
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SelectMenu from "../SelectMenu/SelectMenu";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

interface DashBoardFilterationsProps {
  placeHolder?: string;
  page?: string;
  doesNotHaveFilterStatus?: boolean;
<<<<<<< HEAD
}

export default function DashBoardFilterations({
  placeHolder,
  page,
  doesNotHaveFilterStatus,
}: DashBoardFilterationsProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [debouncedName, setDebouncedName] = useState(name);
  const [debouncedStatus, setDebouncedStatus] = useState(status);
  const [activityId, setActivityId] = useState<number | string>("");
  const [classId, setClassId] = useState<number | string>("");
  const { classes } = useClassesStore();
  const { activities } = useActionsAndActivityStore();

  const [debouncedAct, setDebouncedAct] = useState(activityId);
  const [debouncedClass, setDebouncedClass] = useState(classId);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(name);
    }, 1000);
=======
  statusOptions?: { value: string; label: string }[];
}

const routes: Record<string, string> = {
  teachers: "/dashboard/teachers",
  classes: "/dashboard/classes",
  students: "/dashboard/students",
  parents: "/dashboard/parents",
  subjects: "/dashboard/subjects",
  events: "/dashboard/events",
  notifications: "/dashboard/notifications",
  requests: "/dashboard/requests",
  staff: "/dashboard/settings/school-staff",
};

const defaultStatus = [
  { value: "", label: "Status" },
  { value: "active", label: "Active" },
  { value: "deactive", label: "Deactive" },
];

export default function DashBoardFilterations({
  placeHolder,
  page,
  doesNotHaveFilterStatus,
  statusOptions,
}: DashBoardFilterationsProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [debouncedName, setDebouncedName] = useState(name);
  const [debouncedStatus, setDebouncedStatus] = useState(status);
  const options = statusOptions ?? defaultStatus;
  const keepPage = useRef(true);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedName(name), 400);
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    return () => clearTimeout(handler);
  }, [name]);

  useEffect(() => {
<<<<<<< HEAD
    const handler = setTimeout(() => {
      setDebouncedStatus(status);
    }, 1000);
=======
    const handler = setTimeout(() => setDebouncedStatus(status), 200);
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    return () => clearTimeout(handler);
  }, [status]);

  useEffect(() => {
<<<<<<< HEAD
    const handler = setTimeout(() => {
      setDebouncedAct(activityId);
    }, 1000);
    return () => clearTimeout(handler);
  }, [activityId]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedClass(classId);
    }, 1000);
    return () => clearTimeout(handler);
  }, [classId]);

  useEffect(() => {
    const filters: Record<string, string> = {};
    if (debouncedStatus) filters.status = debouncedStatus;
    if (debouncedName) filters.name = debouncedName;
    if (debouncedAct) filters.activity = String(debouncedAct);
    if (debouncedClass) filters.class = String(debouncedClass);

    const queryParams = new URLSearchParams(filters).toString();
    if (page === "teachers") {
      router.push(`/dashboard/teachers?${queryParams}`);
    } else if (page === "classes") {
      router.push(`/dashboard/classes?${queryParams}`);
    } else if (page === "students") {
      router.push(`/dashboard/students?${queryParams}`);
    } else if (page === "parents") {
      router.push(`/dashboard/parents?${queryParams}`);
    } else if (page === "employees") {
      router.push(`/dashboard/employees?${queryParams}`);
    } else if (page === "roles") {
      router.push(`/dashboard/roles?${queryParams}`);
    } else if (page === "curriculums") {
      router.push(`/dashboard/curriculums?${queryParams}`);
    }
  }, [
    debouncedName,
    status,
    router,
    debouncedStatus,
    page,
    debouncedAct,
    debouncedClass,
  ]);

  return (
    <div className="px-6 py-4">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        {!doesNotHaveFilterStatus && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-3 w-full md:w-auto focus:outline-none focus:border-indigo-500"
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="deactive">Deactive</option>
          </select>
        )}
        <div className="relative w-full md:w-auto">
=======
    const target = page ? routes[page] : "";
    if (!target) return;
    const current = new URLSearchParams(window.location.search);
    const next = new URLSearchParams();
    if (debouncedStatus) next.set("status", debouncedStatus);
    if (debouncedName) next.set("name", debouncedName);
    if (keepPage.current) {
      const currentPage = current.get("page");
      if (currentPage) next.set("page", currentPage);
      keepPage.current = false;
    }
    if (current.toString() === next.toString()) return;
    router.push(next.toString() ? `${target}?${next.toString()}` : target);
  }, [debouncedName, debouncedStatus, page, router]);

  return (
    <div className="px-6 py-4">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        {!doesNotHaveFilterStatus && (
          <SelectMenu
            className="w-full md:w-52"
            value={status}
            onChange={setStatus}
            options={options}
            placeholder="Status"
          />
        )}
        <div className="relative w-full md:ml-auto md:w-auto">
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
          <input
            type="text"
            name="name"
            value={name}
<<<<<<< HEAD
            onChange={(e) => setName(e.target.value)}
            placeholder={placeHolder}
            className="w-full md:w-64 border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-indigo-500"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
=======
            onChange={(event) => setName(event.target.value)}
            placeholder={placeHolder}
            className="w-full rounded-xl border border-[#E6E8EE] py-2.5 pl-4 pr-10 text-sm outline-none transition duration-200 focus:border-[#0F766E] md:w-64"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
          >
            <path d="M10 2a8 8 0 0 1 8 8c0 1.74-.57 3.37-1.53 4.68l5.85 5.85a1 1 0 1 1-1.42 1.42l-5.85-5.85A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 10 4z" />
          </svg>
        </div>
<<<<<<< HEAD
        {page === "curriculums" && (
          <div className="flex gap-6">
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 w-full md:w-auto focus:outline-none focus:border-indigo-500"
            >
              <option value="">Filter With Class</option>
              {classes?.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
            <select
              value={activityId}
              onChange={(e) => setActivityId(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 w-full md:w-auto focus:outline-none focus:border-indigo-500"
            >
              <option value="">Filter With Activity</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
        )}
=======
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      </div>
    </div>
  );
}
