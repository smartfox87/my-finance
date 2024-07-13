import { ACCOUNT_FIELD, ACCOUNTS_FIELD, AMOUNT_FIELD, CATEGORIES_FIELD, CATEGORY_FIELD, DATE_FIELD, DATES_PERIOD_FIELD, NAME_FIELD, SORT_FIELD } from "@/constants/fields";
import { FormField } from "@/types/form";
import { FilterField } from "@/types/filter";
import { FieldIds } from "@/types/field";

export const INITIAL_INCOMES_FILTER_FIELDS: FilterField[] = [{ ...SORT_FIELD, id: FieldIds.SORT }, ACCOUNTS_FIELD, CATEGORIES_FIELD, DATES_PERIOD_FIELD];

export const INITIAL_INCOME_FIELDS: FormField[] = [NAME_FIELD, ACCOUNT_FIELD, CATEGORY_FIELD, AMOUNT_FIELD, DATE_FIELD];
