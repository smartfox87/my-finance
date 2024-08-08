export const getLanguage = (): string | undefined =>
  document.cookie
    .split(";")
    .find((cookie) => cookie.includes("NEXT_LOCALE"))
    ?.split("=")[1];

const findLocalStorageItemByRegExp = (regex: RegExp): string | null => Object.entries(localStorage).find(([key]) => regex.test(key))?.[1] || null;

const getLocalStorageSession = (): string | null => findLocalStorageItemByRegExp(/sb-[a-z0-9]+-auth-token/);

export const getUserId = (): string | null => {
  const session = getLocalStorageSession();
  if (!session) return null;
  return JSON.parse(session).user.id;
};
