<<<<<<< HEAD
import ActionOrActivitySection from "@/app/components/ActionOrActivitySection/ActionOrActivitySection";
=======
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { dataURLS } from "../../utils/dataUrls";
import { teacherInterface } from "../../utils/interfaces";
<<<<<<< HEAD
import Loader from "@/app/components/Loader/Loader";
=======
import ActionOrActivitySection from "@/app/components/ActionOrActivitySection/ActionOrActivitySection";
import { serverFetch } from "@/lib/mock/server-fetch";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";

export const dynamic = "force-dynamic";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

export const metadata: Metadata = {
  title: `Class Details`,
};

interface ParamsProps {
  id: string;
}

interface classDetailsProps {
  params: Promise<ParamsProps>;
}

export interface OPTION {
  icon: string;
  id: number;
  type: string;
  name_ar: string;
  name_en: string;
  action: string;
  teachers: teacherInterface[];
  name: string;
<<<<<<< HEAD
  class_activity_id?: number | string;
  class_action_id?: number | string;
=======
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
}

interface ClassDetails {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  number_of_students: number;
  actions: OPTION[];
  activities: OPTION[];
<<<<<<< HEAD
  teachers: teacherInterface[];
=======
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
}

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

export default async function ClassDetailsPage({ params }: classDetailsProps) {
  const { id } = await params;
  const cookiesData = await cookies();
<<<<<<< HEAD
  const token = cookiesData.get("CLIENT_JLOOMS_TOKEN")?.value;
  const request = await fetch(
=======
  const token = cookiesData.get("SERVER_JLOOMS_TOKEN")?.value;
  const request = await serverFetch(
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    `${dataURLS.singleClass}/${id}?t=${new Date().getTime()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
<<<<<<< HEAD
    }
  );
  const responseData = await request.json();
=======
    },
  );
  const responseData = await request.json();
  if (request.status === 401) redirect("/auth/login");
  if (!request.ok || !responseData?.data?.id) notFound();
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
  const classDetails: ClassDetails = responseData?.data;

  const actionArray: OPTION[] = classDetails?.actions;
  const activityArray: OPTION[] = classDetails?.activities;
<<<<<<< HEAD
  const teachers: teacherInterface[] = classDetails?.teachers || [];

  const allowedTeachersRequest = await fetch(
=======

  const allowedTeachersRequest = await serverFetch(
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    `${dataURLS.allowedTeachers}?t=${new Date().getTime()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
<<<<<<< HEAD
    }
=======
    },
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
  );
  const allowedReponse = await allowedTeachersRequest.json();
  const allowedTeachers = allowedReponse?.data?.teachers;

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

  if(actionArray?.length === 0 && activityArray?.length === 0 && allowedTeachers?.length === 0){ 
    return <Loader />
  }

  if (!classDetails) {
    return (
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <DashBoardPageHead text="Class Not Found" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
      <DashBoardPageHead text={classDetails?.name_en || "Class Name Unknown"} />
      <ActionOrActivitySection
        teachers={teachers}
        id={id}
        allActions={actions?.data?.actions}
        allActivities={activities?.data?.activities}
        actionArray={actionArray}
        activityArray={activityArray}
        allowedTeachers={allowedTeachers}
      />
    </div>
=======
    "activities",
  );

  return (
    <Suspense fallback={<TableSkeleton />}>
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <DashBoardPageHead
          text={classDetails?.name_en || "Class Name Unknown"}
        />
        <ActionOrActivitySection
          id={id}
          allActions={actions?.data?.actions}
          allActivities={activities?.data?.activities}
          actionArray={actionArray}
          activityArray={activityArray}
          allowedTeachers={allowedTeachers}
        />
      </div>
    </Suspense>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
  );
}
