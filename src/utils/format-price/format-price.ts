import { getLanguage } from "@/utils/get-language";

export const formatPrice = (price: string | number, decimals: number = 2): string => {
  let result = price;

  if (!price) result = 0;

  const number = parseFloat(price.toString());
  if (isNaN(number)) result = 0;

  return result.toLocaleString(getLanguage(), { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};
