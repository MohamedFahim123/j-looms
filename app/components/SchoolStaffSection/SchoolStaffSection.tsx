"use client";

import { useStaffScreen } from "@/app/hooks/useSchoolScreens";
import { useSearchParams } from "next/navigation";
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import ListFrame from "../ListFrame/ListFrame";
import Pagination from "../Pagination/Pagination";

export default function SchoolStaffSection() {
  const params = useSearchParams();
  const screen = useStaffScreen(params.toString());

  return (
    <section className="w-full">
      <header className="border-b border-[#EEF0F4] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[#222233]">School staff</h2>
      </header>
      <DashBoardFilterations
        doesNotHaveFilterStatus
        page="staff"
        placeHolder="Find a staff member"
      />
      <ListFrame
        status={screen.status}
        empty={screen.rows.length === 0}
        emptyLabel="No staff match this search."
        onRetry={screen.retry}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-[#EEF0F4] text-[#6B7280]">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {screen.rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#F3F4F6] transition duration-200 hover:bg-[#F8F8FC]"
                >
                  <td className="px-6 py-3 text-[#222233]">{row.name}</td>
                  <td className="px-6 py-3">{row.email}</td>
                  <td className="px-6 py-3">{row.phone}</td>
                  <td className="px-6 py-3">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={screen.totalPages}
          currentPage={Number(screen.filters.page) || 1}
        />
      </ListFrame>
    </section>
  );
}
