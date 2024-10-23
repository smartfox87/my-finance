import { getSession } from "../get-session";

export const getUserId = (): string | null => {
  const session = getSession();
  if (!session) return null;
  try {
    return JSON.parse(session).user?.id ?? null;
  } catch (e) {
    return null;
  }
};
