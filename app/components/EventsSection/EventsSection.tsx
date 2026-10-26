"use client";

import { useEventsScreen } from "@/app/hooks/useSchoolScreens";
import { useSearchParams } from "next/navigation";
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import ListFrame from "../ListFrame/ListFrame";
import Pagination from "../Pagination/Pagination";

const fieldClass =
  "w-full rounded-xl border border-[#E6E8EE] bg-white px-4 py-2.5 text-sm outline-none transition duration-200 focus:border-[#0F766E]";
const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "Upcoming", label: "Upcoming" },
  { value: "Done", label: "Done" },
];

export default function EventsSection() {
  const params = useSearchParams();
  const screen = useEventsScreen(params.toString());

  return (
    <section className="w-full">
      <header className="border-b border-[#EEF0F4] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[#222233]">Events</h2>
      </header>
      <form
        className="grid gap-3 px-6 pt-5 md:grid-cols-[1fr_auto_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          screen.createEvent();
        }}
      >
        <input
          className={fieldClass}
          placeholder="Title"
          value={screen.title}
          onChange={(event) => screen.setTitle(event.target.value)}
        />
        <input
          className={fieldClass}
          type="date"
          value={screen.date}
          onChange={(event) => screen.setDate(event.target.value)}
          aria-label="Event date"
        />
        <input
          className={fieldClass}
          placeholder="Place"
          value={screen.place}
          onChange={(event) => screen.setPlace(event.target.value)}
        />
        <button
          type="submit"
          disabled={screen.saving}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-indigo-700 disabled:opacity-50"
        >
          {screen.saving ? "Adding…" : "Add event"}
        </button>
      </form>
      {screen.formError ? (
        <p className="px-6 pt-3 text-sm text-red-600">{screen.formError}</p>
      ) : null}
      <DashBoardFilterations
        page="events"
        placeHolder="Find an event"
        statusOptions={statusOptions}
      />
      <ListFrame
        status={screen.status}
        empty={screen.rows.length === 0}
        emptyLabel="No events for this filter."
        onRetry={screen.retry}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-[#EEF0F4] text-[#6B7280]">
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Place</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium"> </th>
              </tr>
            </thead>
            <tbody>
              {screen.rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#F3F4F6] transition duration-200 hover:bg-[#F8F8FC]"
                >
                  <td className="px-6 py-3 text-[#222233]">{row.title}</td>
                  <td className="px-6 py-3">{row.date}</td>
                  <td className="px-6 py-3">{row.place}</td>
                  <td className="px-6 py-3">{row.status}</td>
                  <td className="px-6 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => screen.removeEvent(row.id)}
                      className="text-sm text-[#B42318] transition duration-200 hover:underline"
                    >
                      Remove
                    </button>
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
