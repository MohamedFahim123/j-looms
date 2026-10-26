import type { ReactNode } from "react";
import ErrorPanel from "../ErrorPanel/ErrorPanel";
import { TableSkeleton } from "../Skeleton/Skeleton";

type ListFrameProps = {
  status: "loading" | "error" | "ready";
  empty: boolean;
  emptyLabel: string;
  onRetry: () => void;
  children: ReactNode;
};

export default function ListFrame({
  status,
  empty,
  emptyLabel,
  onRetry,
  children,
}: ListFrameProps) {
  if (status === "loading") return <TableSkeleton />;
  if (status === "error") return <ErrorPanel onRetry={onRetry} />;
  if (empty) {
    return (
      <p className="px-6 py-16 text-center text-sm text-[#6B7280]">
        {emptyLabel}
      </p>
    );
  }
  return <>{children}</>;
}
