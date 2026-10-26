export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div
      className="px-6 py-5"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="skeleton mb-4 h-11 rounded-xl" />
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="skeleton mb-3 h-12 rounded-xl" />
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div
      className="px-6 py-6"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="mb-4">
          <div className="skeleton mb-2 h-3 w-28 rounded-full" />
          <div className="skeleton h-11 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
