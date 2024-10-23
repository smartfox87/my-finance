import { isDatesStrings } from "@/predicates/date";
import { isString } from "@/predicates/common";
import { isMultiSelectValue } from "@/predicates/field";
import { FieldIds } from "@/types/field";
import type { FilterMultiItem, FilterPeriodItem, FilterPeriodStateItem, FilterSortItem, FilterStateKey } from "@/features/filter";

export const isFilterStateKey = (key: string): key is FilterStateKey => FieldIds.PERIOD === key || FieldIds.CATEGORIES === key || FieldIds.ACCOUNTS === key || FieldIds.SORT === key;

export const isFilterPeriodItem = (item: { id: string; value: unknown }): item is FilterPeriodItem => item.id === FieldIds.PERIOD && isDatesStrings(item.value);

export const isFilterSortItem = (item: { id: string; value: unknown }): item is FilterSortItem => item.id === FieldIds.SORT && isString(item.value);

export const isFilterMultiItem = (item: { id: string; value: unknown }): item is FilterMultiItem =>
  (item.id === FieldIds.CATEGORIES || item.id === FieldIds.ACCOUNTS) && isMultiSelectValue(item.value);

export const isFilterPeriodStateItem = (item: Record<string, unknown>): item is FilterPeriodStateItem => FieldIds.PERIOD in item && isDatesStrings(item[FieldIds.PERIOD]);
