import { showCommonError } from "@/utils/show-common-error";

export const getIntegerFromString = (value: string): number => {
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    showCommonError();
    throw new Error("Value is not a number");
  }
  return parsedValue;
};
