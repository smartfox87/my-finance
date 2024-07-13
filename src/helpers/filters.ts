import { FieldIds, FieldTypes, FieldValues } from "@/types/field";
import { ActiveFilterItem, ActiveFilterItemValue, FilterItem, FilterState } from "@/types/filter";
import { isMultiSelectValues, isTruthy } from "@/types/predicates";
import { ProcessedFilterField } from "@/types/selectors";
import { i18nRef } from "@/i18n";

export const getActiveFilters = (processedFilterFields: ProcessedFilterField[], filterValues: FilterState | null): ActiveFilterItem[] =>
  processedFilterFields
    .map((field) => {
      if (field.type === FieldTypes.DATES_PERIOD)
        return {
          id: field.id,
          label: i18nRef.t && i18nRef.t(`fields.${field.label}`),
          value: filterValues?.[field.id]?.[0] === filterValues?.[field.id]?.[1] ? filterValues?.[field.id]?.[0] : filterValues?.[field.id]?.join(" - "),
        };
      else if (field.type === FieldTypes.MULTISELECT)
        return filterValues?.[field.id]?.map((value) => ({
          id: field.id,
          label: i18nRef.t && i18nRef.t(`fields.${field.label}`),
          value,
          textValue: field.optionsObject?.[value],
        }));
      else {
        const filterValue = filterValues?.[field.id];
        if (filterValue === undefined) return;
        return {
          id: field.id,
          label: i18nRef.t && i18nRef.t(`fields.${field.label}`),
          value: filterValues?.[field.id],
          textValue: field.optionsObject?.[filterValue],
        };
      }
    })
    .flat(1)
    .filter(isTruthy);

export const checkIsClearableFilter = ({ id, value }: ActiveFilterItemValue) => (FieldIds.CATEGORIES === id || FieldIds.ACCOUNTS === id) && value && value !== FieldValues.ALL;

export const setFilterValue = (filterValues: FilterState | null, { id, value }: FilterItem) => {
  const state: FilterState = filterValues ? { ...filterValues } : {};
  if (isMultiSelectValues(value) && (id === FieldIds.CATEGORIES || id === FieldIds.ACCOUNTS)) {
    if (!value?.length || (!state[id]?.includes(FieldValues.ALL) && value.includes(FieldValues.ALL)) || (value.length === 1 && value.includes(FieldValues.ALL))) state[id] = [FieldValues.ALL];
    else state[id] = value.filter((val) => val !== FieldValues.ALL);
  } else if (id === FieldIds.PERIOD) state[id] = value;
  else if (id === FieldIds.SORT) state[id] = value;
  return state;
};
