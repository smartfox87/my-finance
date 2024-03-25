export const getUserId = () => localStorage.getItem("user_id");

export const getLanguage = () => localStorage.getItem("i18nextLng")?.substring(0, 2) || "en";
