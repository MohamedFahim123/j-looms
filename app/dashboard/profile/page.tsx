<<<<<<< HEAD
import Loader from "@/app/components/Loader/Loader";
import ProfileForm from "@/app/components/ProfileForm/ProfileForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loader />}>
      <ProfileForm />
=======
import ProfileSection from "@/app/components/ProfileSection/ProfileSection";
import { TableSkeleton } from "@/app/components/Skeleton/Skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <ProfileSection />
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    </Suspense>
  );
}
