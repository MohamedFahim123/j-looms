"use client";

import { useNoticesScreen } from "@/app/hooks/useSchoolScreens";
import { useSearchParams } from "next/navigation";
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import ListFrame from "../ListFrame/ListFrame";
import Pagination from "../Pagination/Pagination";

export default function NotificationsSection() {
  const params = useSearchParams();
  const screen = useNoticesScreen(params.toString());

  return (
    <section className="w-full">
      <header className="border-b border-[#EEF0F4] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[#222233]">Notifications</h2>
      </header>
      <DashBoardFilterations
        doesNotHaveFilterStatus
        page="notifications"
        placeHolder="Find a notification"
      />
      <ListFrame
        status={screen.status}
        empty={screen.rows.length === 0}
        emptyLabel="No notifications yet."
        onRetry={screen.retry}
      >
        <ul>
          {screen.rows.map((row) => (
            <li
              key={row.id}
              className="flex items-start justify-between gap-4 border-b border-[#F3F4F6] px-6 py-4 transition duration-200 hover:bg-[#F8F8FC]"
            >
              <div>
                <p
                  className={`text-[#222233] ${row.read ? "font-normal" : "font-semibold"}`}
                >
                  {row.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                  {row.body}
                </p>
                <p className="mt-2 text-xs text-[#9CA3AF]">{row.createdAt}</p>
              </div>
              <button
                type="button"
                disabled={row.read}
                onClick={() => screen.markRead(row.id)}
                className="shrink-0 rounded-xl border border-[#E6E8EE] px-3 py-2 text-sm text-[#1F2937] transition duration-200 hover:bg-[#F7F8FA] disabled:cursor-default disabled:opacity-40"
              >
                {row.read ? "Read" : "Mark read"}
              </button>
            </li>
          ))}
        </ul>
        <Pagination
          totalPages={screen.totalPages}
          currentPage={Number(screen.filters.page) || 1}
        />
      </ListFrame>
    </section>
  );
}
