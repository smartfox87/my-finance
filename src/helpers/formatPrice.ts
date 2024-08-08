import { getLanguage } from "@/helpers/localStorage.js";

export default function formatPrice(price: string | number | undefined, decimals = 2): string {
  if (!price) return "0";

  const number = parseFloat(price.toString());
  if (isNaN(number)) return "0";

  return number.toLocaleString(getLanguage(), { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
