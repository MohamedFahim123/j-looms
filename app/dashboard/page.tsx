import { redirect } from "next/navigation";
import { useLoginnedUserStore } from "../store/useCurrLoginnedUser";

export default function DashBoardPage() {
<<<<<<< HEAD
  const { userLoginnedType } = useLoginnedUserStore.getState();
  const redirectedRoute =
    userLoginnedType === "Admin"
      ? "/dashboard/profile"
      : "/dashboard/employee-profile";
  redirect(redirectedRoute);
=======
  redirect("/dashboard/profile");
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
}
