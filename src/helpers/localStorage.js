export const getUserId = () => localStorage.getItem("user_id");

export const getLanguage = () =>
  document.cookie
    .split(";")
    .find((cookie) => cookie.includes("NEXT_LOCALE"))
    ?.split("=")[1];
