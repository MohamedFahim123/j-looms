"use client";

import { useRequestsScreen } from "@/app/hooks/useSchoolScreens";
import { useSearchParams } from "next/navigation";
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import ListFrame from "../ListFrame/ListFrame";
import Pagination from "../Pagination/Pagination";
import SelectMenu from "../SelectMenu/SelectMenu";

const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];
const rowOptions = statusOptions.filter((option) => option.value);

export default function RequestsSection() {
  const params = useSearchParams();
  const screen = useRequestsScreen(params.toString());

  return (
    <section className="w-full">
      <header className="border-b border-[#EEF0F4] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[#222233]">Requests</h2>
      </header>
      <DashBoardFilterations
        page="requests"
        placeHolder="Find a request"
        statusOptions={statusOptions}
      />
      <ListFrame
        status={screen.status}
        empty={screen.rows.length === 0}
        emptyLabel="No requests for this filter."
        onRetry={screen.retry}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-[#EEF0F4] text-[#6B7280]">
                <th className="px-6 py-3 font-medium">Request</th>
                <th className="px-6 py-3 font-medium">From</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {screen.rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#F3F4F6] transition duration-200 hover:bg-[#F8F8FC]"
                >
                  <td className="px-6 py-3 text-[#222233]">{row.title}</td>
                  <td className="px-6 py-3">{row.requester}</td>
                  <td className="px-6 py-3">{row.kind}</td>
                  <td className="px-6 py-3">
                    <SelectMenu
                      className="w-44"
                      value={row.status}
                      onChange={(value) => screen.setStatus(row.id, value)}
                      options={rowOptions}
                    />
                  </td>
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
