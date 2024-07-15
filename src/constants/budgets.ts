import { FormField } from "@/types/form";
import { FilterField } from "@/types/filter";
import { AMOUNT_FIELD, NAME_FIELD, ACCOUNTS_FIELD, CATEGORIES_FIELD, DATES_PERIOD_FIELD, SORT_FIELD } from "@/constants/fields";

export const INITIAL_BUDGETS_FILTER_FIELDS: FilterField[] = [SORT_FIELD, ACCOUNTS_FIELD, CATEGORIES_FIELD, DATES_PERIOD_FIELD];

export const INITIAL_BUDGET_FIELDS: FormField[] = [NAME_FIELD, ACCOUNTS_FIELD, CATEGORIES_FIELD, AMOUNT_FIELD, { ...DATES_PERIOD_FIELD, required: true }];
