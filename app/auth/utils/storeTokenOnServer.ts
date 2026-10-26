"use server";

import { cookies } from "next/headers";

export async function setServerCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
<<<<<<< HEAD
    maxAge: 60 * 60 * 24,
  });
}

export async function getTokenFromServerCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("CLIENT_JLOOMS_TOKEN")?.value;
  return token;
}

export async function removeTokenFromServerCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("CLIENT_JLOOMS_TOKEN");
=======
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearServerCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
}
