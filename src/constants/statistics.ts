import { ACCOUNTS_FIELD, CATEGORIES_FIELD, DATES_PERIOD_FIELD } from "@/constants/fields";
import type { FormField } from "@/types/form";
import { FieldIds } from "@/types/field";

export const INITIAL_STATISTICS_FILTER_FIELDS: FormField[] = [{ ...ACCOUNTS_FIELD, id: FieldIds.ACCOUNT }, { ...CATEGORIES_FIELD, id: FieldIds.CATEGORY }, DATES_PERIOD_FIELD];
