<<<<<<< HEAD
import Loader from "./components/Loader/Loader";

const loading = () => {
  return <Loader />;
};

export default loading;
=======
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";

export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#EBECFA] px-6">
      <div className="w-full max-w-3xl rounded-[20px] bg-white">
        <TableSkeleton />
      </div>
    </main>
  );
}
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
