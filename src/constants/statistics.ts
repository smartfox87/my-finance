import { ACCOUNTS_FIELD, CATEGORIES_FIELD, DATES_PERIOD_FIELD } from "@/constants/fields";
import type { FormField } from "@/types/form";

export const INITIAL_STATISTICS_FILTER_FIELDS: FormField[] = [{ ...ACCOUNTS_FIELD, id: "account" }, { ...CATEGORIES_FIELD, id: "category" }, DATES_PERIOD_FIELD];