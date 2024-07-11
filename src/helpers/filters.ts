import { FieldIds, FieldValues, MultiSelectOption } from "@/types/field";
import { FilterItem, FilterState } from "@/types/filter";
import { CostCategory } from "@/types/references";
import { ProcessedAccountItem } from "@/types/accounts";
import { i18nRef } from "@/i18n";

export const checkIsClearableFilter = ({ id, value }: FilterItem) => FieldIds.SORT !== id && FieldIds.PERIOD !== id && value !== FieldValues.ALL;

export const getOptionsFromCostCategories = (costCategories: CostCategory[]) => costCategories?.map(({ id, name }): MultiSelectOption => ({ value: id, label: name }));

export const getOptionsFromAccountsList = (accountsList: ProcessedAccountItem[]) => accountsList?.map(({ id, name }): MultiSelectOption => ({ value: id, label: name }));

export const getOptionsObjectFromOptions = (options: MultiSelectOption[]): { [key: number]: string } =>
  Object.assign({}, ...options.map(({ value, label, label_translation }) => ({ [value]: label_translation && i18nRef.t ? i18nRef.t(`fields.${label_translation}`) : label }), {}));

export const setFilterValue = (filterValues: FilterState | null, { id, value }: FilterItem) => {
  const state: FilterState = filterValues ? { ...filterValues } : {};
  if (Array.isArray(value)) {
    if (!value?.length || (!state[id]?.includes(FieldValues.ALL) && value.includes(FieldValues.ALL)) || (value.length === 1 && value.includes(FieldValues.ALL))) state[id] = [FieldValues.ALL];
    else state[id] = value.filter((val) => val !== FieldValues.ALL);
  } else state[id] = value;
  return state;
};
