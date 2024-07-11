import { FieldIds } from "@/types/field";
import { DatesStrings } from "@/types/date";
import { MultiSelectValue } from "@/types/field";

type FilterValue = string | MultiSelectValue;

type FilterId = FieldIds.CATEGORY | FieldIds.CATEGORIES | FieldIds.ACCOUNT | FieldIds.ACCOUNTS | FieldIds.SORT;

export type FilterCommonItem = { id: FilterId; value: FilterValue };

export type FilterPeriodItem = { id: FieldIds.PERIOD; value: DatesStrings };

export type FilterItem = FilterCommonItem | FilterPeriodItem;

export interface FilterPeriodStateItem {
  [FieldIds.PERIOD]: DatesStrings;
}

export interface FilterState extends Partial<FilterPeriodStateItem> {
  [FieldIds.SORT]: string;
  [FieldIds.CATEGORY]?: MultiSelectValue;
  [FieldIds.CATEGORIES]?: MultiSelectValue;
  [FieldIds.ACCOUNT]?: MultiSelectValue;
  [FieldIds.ACCOUNTS]?: MultiSelectValue;
}

export type FilterStateKey = keyof FilterState;

export const isFilterStateKey = (key: any): key is FilterStateKey => FieldIds.PERIOD === key || FieldIds.CATEGORY === key || FieldIds.ACCOUNT === key || FieldIds.SORT === key;
