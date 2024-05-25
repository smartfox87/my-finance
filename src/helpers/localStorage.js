export const getLanguage = () =>
  document.cookie
    .split(";")
    .find((cookie) => cookie.includes("NEXT_LOCALE"))
    ?.split("=")[1];

export const findLocalStorageItemByRegExp = (regex) => Object.entries(localStorage).find(([key]) => regex.test(key))?.[1] || null;

export const getLocalStorageSession = () => findLocalStorageItemByRegExp(/sb-[a-z0-9]+-auth-token/);

export const getUserId = () => {
  const session = getLocalStorageSession();
  if (!session) return null;
  return JSON.parse(session).user.id;
};
