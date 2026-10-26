export type AuthGroup = "login" | "register" | "recover";

export interface AuthScene {
  group: AuthGroup;
  headline: string;
  lede: string;
}

export function authScene(pathname: string): AuthScene {
  if (pathname.startsWith("/auth/register")) {
    return {
      group: "register",
      headline: "Open a school desk that stays in order.",
      lede: "Name the school, set the office login, then add the papers. Three short steps.",
    };
  }
  if (pathname.includes("password")) {
    return {
      group: "recover",
      headline: "Back to the school desk.",
      lede: "Use the email on the school account, then set a new password.",
    };
  }
  return {
    group: "login",
    headline: "The school day, held in one desk.",
    lede: "Teachers, classes, families, and the notes that keep the day moving.",
  };
}
