import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#EBECFA] px-6 text-center">
      <div className="w-full max-w-lg rounded-[20px] bg-white px-6 py-16">
        <h1 className="text-lg font-semibold text-[#222233]">Page not found</h1>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          That address is not part of Join Looms.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-indigo-700"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
