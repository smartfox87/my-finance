import { FieldIds } from "@/types/field";
import { FilterStateKey } from "@/types/filter";

export const isFilterStateKey = (key: any): key is FilterStateKey => FieldIds.PERIOD === key || FieldIds.CATEGORY === key || FieldIds.ACCOUNT === key || FieldIds.SORT === key;
