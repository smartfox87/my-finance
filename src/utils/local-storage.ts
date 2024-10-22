import { getSession } from "@/utils/get-session";

export const getLanguage = (): string | undefined =>
  document.cookie
    .split(";")
    .find((cookie) => cookie.includes("NEXT_LOCALE"))
    ?.split("=")[1];

export const getUserId = (): string | null => {
  const session = getSession();
  if (!session) return null;
  return JSON.parse(session).user.id;
};
