type ErrorPanelProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorPanel({
  title = "Something went wrong",
  message = "This page could not be loaded. Try again, or come back in a moment.",
  onRetry,
}: ErrorPanelProps) {
  return (
    <div className="px-6 py-16 text-center" role="alert">
      <h2 className="text-lg font-semibold text-[#222233]">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
        {message}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-indigo-700"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
