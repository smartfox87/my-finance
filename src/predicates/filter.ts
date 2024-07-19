import { FieldIds } from "@/types/field";
import { FilterMultiItem, FilterPeriodItem, FilterSortItem, FilterStateKey } from "@/types/filter";
import { isDatesStrings } from "@/predicates/date";

export const isFilterStateKey = (key: any): key is FilterStateKey => FieldIds.PERIOD === key || FieldIds.CATEGORIES === key || FieldIds.ACCOUNTS === key || FieldIds.SORT === key;

export const isFilterPeriodItem = (item: { id: any; value: any }): item is FilterPeriodItem => item.id === FieldIds.PERIOD && isDatesStrings(item.value);

export const isFilterSortItem = (item: { id: any; value: any }): item is FilterSortItem => item.id === FieldIds.SORT;

export const isFilterMultiItem = (item: { id: any; value: any }): item is FilterMultiItem => item.id === FieldIds.CATEGORIES || item.id === FieldIds.ACCOUNTS;
