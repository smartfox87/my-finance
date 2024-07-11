import { FieldIds } from "@/types/field";
import { DatesStrings } from "@/types/date";
import { MultiSelectValue } from "@/types/field";

type FilterValue = string | MultiSelectValue;

export interface FilterPeriodItem {
  id: FieldIds.PERIOD;
  value: DatesStrings;
}

export interface FilterCommonItem {
  id: FieldIds.CATEGORIES | FieldIds.ACCOUNTS | FieldIds.SORT;
  value: FilterValue;
}

export type FilterItem = FilterCommonItem | FilterPeriodItem;

export interface FilterPeriodStateItem {
  [FieldIds.PERIOD]: DatesStrings;
}

export interface FilterState extends Partial<FilterPeriodStateItem> {
  [FieldIds.SORT]?: string;
  [FieldIds.CATEGORIES]?: MultiSelectValue;
  [FieldIds.ACCOUNTS]?: MultiSelectValue;
}

export type FilterStateKey = keyof FilterState;

export const isFilterStateKey = (key: any): key is FilterStateKey => FieldIds.PERIOD === key || FieldIds.CATEGORY === key || FieldIds.ACCOUNT === key || FieldIds.SORT === key;
