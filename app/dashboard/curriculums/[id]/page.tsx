import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { serverFetch } from "@/lib/mock/server-fetch";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { dataURLS } from "../../utils/dataUrls";

export const metadata: Metadata = { title: "Curriculum" };

interface CurriculumDetails {
  name?: string;
  class_name?: string;
  activity?: string;
  date_from?: string;
  date_to?: string;
}

export default async function CurriculumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = (await cookies()).get("CLIENT_JLOOMS_TOKEN")?.value;
  const response = await serverFetch(`${dataURLS.singleCurriculum}/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const payload = (await response.json()) as {
    data?: { curriculum?: CurriculumDetails };
  };
  const curriculum = payload.data?.curriculum;

  if (!curriculum) {
    return (
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <DashBoardPageHead text="Curriculum Not Found" haveBtn={false} />
      </div>
    );
  }

  const fields = [
    ["Class", curriculum.class_name],
    ["Activity", curriculum.activity],
    ["From", curriculum.date_from],
    ["To", curriculum.date_to],
  ];

  return (
    <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
      <DashBoardPageHead text={curriculum.name || "Curriculum"} haveBtn={false} />
      <dl className="grid gap-4 px-6 py-6 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-gray-500">{label}</dt>
            <dd className="mt-1 text-gray-900">{value || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
