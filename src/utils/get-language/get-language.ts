export const getLanguage = (): string | undefined =>
  document.cookie
    .split(";")
    .find((cookie) => cookie.includes("NEXT_LOCALE"))
    ?.split("=")[1] || undefined;
