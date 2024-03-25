import { getLanguage } from "@/helpers/localStorage.js";

export default function formatPrice(price, decimals = 2) {
  if (!price) return 0;

  const number = parseFloat(price);
  if (isNaN(number)) return 0;

  return number.toLocaleString(getLanguage(), { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
