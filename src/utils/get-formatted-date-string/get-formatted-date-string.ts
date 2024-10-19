import dayjs from "dayjs";

export const getFormattedDateString = (date?: string, format: string = "YYYY MMMM DD"): string => {
  if (!date || !dayjs(date).isValid()) return "";
  return dayjs(date).format(format);
};
