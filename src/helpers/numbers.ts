import { showCommonError } from "@/helpers/errors";

export const getIntegerFromString = (value: string): number => {
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    showCommonError();
    throw new Error("Value is not a number");
  }
  return parsedValue;
};

export const checkIsPossibleNumber = (value: any): boolean => typeof value === "number" && !isNaN(value);
