import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-[#222233]">
        That record is not here
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
        It may have been removed, or the address does not match a page in this
        school.
      </p>
      <Link
        href="/dashboard/profile"
        className="mt-6 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-indigo-700"
      >
        Back to profile
      </Link>
    </div>
  );
}
