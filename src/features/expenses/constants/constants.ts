import { ACCOUNT_FIELD, ACCOUNTS_FIELD, AMOUNT_FIELD, CATEGORIES_FIELD, CATEGORY_FIELD, DATE_FIELD, DATES_PERIOD_FIELD, NAME_FIELD, SORT_FIELD } from "@/constants/fields";
import type { FilterField } from "@/types/filter";
import type { CostItemField } from "../types";

export const INITIAL_COSTS_FILTER_FIELDS: FilterField[] = [SORT_FIELD, ACCOUNTS_FIELD, CATEGORIES_FIELD, DATES_PERIOD_FIELD];

export const INITIAL_COST_FIELDS: CostItemField[] = [NAME_FIELD, ACCOUNT_FIELD, CATEGORY_FIELD, AMOUNT_FIELD, DATE_FIELD];