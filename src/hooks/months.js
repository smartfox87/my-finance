import { useTranslation } from "react-i18next";

export const getMonthsByIndexList = (indexes = [], language) =>
  indexes
    .slice()
    .sort((a, b) => a - b)
    .map((index) => ({ index, name: new Date(`2000-${index}-01`).toLocaleDateString(language, { month: "long" }) }));

export const useMonths = () => {
  const {
    i18n: { language },
  } = useTranslation();
  return new Array(12).fill(null).map((_, index) => new Date(`2000-${index + 1}-01`).toLocaleDateString(language, { month: "long" }).substring(0, 3));
};
