import AddNewClassForm from "@/app/components/AddNewClassForm/AddNewClassForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";
import { cookies } from "next/headers";
<<<<<<< HEAD
import { dataURLS } from "../../utils/dataUrls";
import Loader from "@/app/components/Loader/Loader";
import { Suspense } from "react";
=======
import { serverFetch } from "@/lib/mock/server-fetch";
import { Suspense } from "react";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

const cache: {
  actions?: { data: unknown; timestamp: number };
  activities?: { data: unknown; timestamp: number };
} = {};

const CACHE_EXPIRATION_TIME = 15 * 60 * 1000;

async function fetchWithCache(
  url: string,
  token: string,
<<<<<<< HEAD
  cacheKey: "actions" | "activities"
=======
  cacheKey: "actions" | "activities",
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
) {
  const now = Date.now();
  if (
    cache[cacheKey] &&
    now - cache[cacheKey].timestamp < CACHE_EXPIRATION_TIME
  ) {
    return cache[cacheKey].data;
  }
<<<<<<< HEAD
  const response = await fetch(url, {
=======
  const response = await serverFetch(url, {
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  cache[cacheKey] = {
    data,
    timestamp: now,
  };

  return data;
}
<<<<<<< HEAD
=======

export const dynamic = "force-dynamic";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

export const metadata: Metadata = {
  title: "Add New Class",
  description: "Add New Class to your school",
};

<<<<<<< HEAD
export default async function page() {
  const cookiesData = await cookies();
  const token = cookiesData.get("CLIENT_JLOOMS_TOKEN")?.value;
=======
export default async function AddNewClassPage() {
  const cookiesData = await cookies();
  const token = cookiesData.get("SERVER_JLOOMS_TOKEN")?.value;
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

  const actions = await fetchWithCache(
    dataURLS.getActions,
    token ? token : "",
<<<<<<< HEAD
    "actions"
=======
    "actions",
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
  );
  const activities = await fetchWithCache(
    dataURLS.getActivities,
    token ? token : "",
<<<<<<< HEAD
    "activities"
  );

  return (
    <Suspense fallback={<Loader />}>
=======
    "activities",
  );

  return (
    <Suspense fallback={<TableSkeleton />}>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add New Class" />
        <AddNewClassForm
          actions={actions?.data?.actions}
          activities={activities?.data?.activities}
        />
      </div>
    </Suspense>
  );
}
