import { i18nRef } from "@/i18n";

export const getLocalisedMonths = (): string[] => new Array(12).fill(null).map((_, index) => new Date(`2000-${index + 1}-01`).toLocaleDateString(i18nRef.locale, { month: "long" }).substring(0, 3));
