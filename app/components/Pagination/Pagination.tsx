"use client";

<<<<<<< HEAD
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
=======
import { visiblePages } from "@/lib/pagination";
import { usePathname, useRouter } from "next/navigation";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();
<<<<<<< HEAD
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = window.location.pathname;
  const changePage = (page: number) => {
    if (!isClient) return;

    const params = new URLSearchParams(window.location.search);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => changePage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
=======
  const pathname = usePathname();
  const page =
    Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  if (totalPages <= 1) return null;

  const changePage = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(next));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EEF0F4] px-4 py-4"
    >
      <button
        type="button"
        onClick={() => changePage(page - 1)}
        disabled={page <= 1}
        className="rounded-xl border border-[#E6E8EE] bg-white px-3 py-2 text-sm text-[#1F2937] transition duration-200 hover:bg-[#F7F8FA] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {visiblePages(page, totalPages).map((item, index) =>
          item === "gap" ? (
            <span key={`gap-${index}`} className="px-2 text-sm text-[#9CA3AF]">
              …
            </span>
          ) : (
            <button
              type="button"
              key={item}
              onClick={() => changePage(item)}
              aria-current={item === page ? "page" : undefined}
              className={`h-9 min-w-9 rounded-xl px-3 text-sm transition duration-200 ${item === page ? "bg-white font-medium text-[#0F766E] shadow-[0_10px_24px_-14px_rgba(15,23,42,0.55)] ring-1 ring-[#E7E9EE]" : "text-[#4B5563] hover:bg-[#F4F5F8]"}`}
            >
              {item}
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        onClick={() => changePage(page + 1)}
        disabled={page >= totalPages}
        className="rounded-xl border border-[#E6E8EE] bg-white px-3 py-2 text-sm text-[#1F2937] transition duration-200 hover:bg-[#F7F8FA] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
  );
}
