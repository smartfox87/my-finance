import { FieldIds, FieldTypes, FieldValues } from "@/types/field";
import { ActiveFilterItem, ActiveFilterItemValue, FilterField, FilterItem, FilterState, FilterStateValue } from "@/types/filter";
import { ProcessedFilterField } from "@/types/selectors";
import { i18nRef } from "@/i18n";
import { isMultiSelectValue } from "@/predicates/field";
import { isNumber, isTruthy } from "@/predicates/common";
import { isFilterMultiItem, isFilterPeriodItem, isFilterSortItem } from "@/predicates/filter";
import { isMultiSelectFormFieldId } from "@/predicates/form";

export const getActiveFilters = (processedFilterFields: ProcessedFilterField[], filterValues: FilterState | null): ActiveFilterItem[] =>
  processedFilterFields
    .map((field) => {
      if (field.type === FieldTypes.DATES_PERIOD) {
        return {
          id: field.id,
          label: i18nRef.t && i18nRef.t(`fields.${field.label}`),
          value: filterValues?.[field.id]?.[0] === filterValues?.[field.id]?.[1] ? filterValues?.[field.id]?.[0] : filterValues?.[field.id]?.join(" - "),
        };
      } else if (field.type === FieldTypes.MULTISELECT) {
        return filterValues?.[field.id]?.map((value) => ({
          id: field.id,
          label: i18nRef.t && i18nRef.t(`fields.${field.label}`),
          value,
          textValue: field.optionsObject?.[value],
        }));
      } else {
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

export const checkIsClearableFilter = ({ id, value }: ActiveFilterItemValue): boolean => isMultiSelectFormFieldId(id) && isNumber(value);

export const setFilterValue = (filterValues: FilterState | null, { id, value }: FilterItem) => {
  const state: FilterState = filterValues ? { ...filterValues } : {};
  if (isMultiSelectValue(value) && (id === FieldIds.CATEGORIES || id === FieldIds.ACCOUNTS)) {
    if (!value?.length || (!state[id]?.includes(FieldValues.ALL) && value.includes(FieldValues.ALL)) || (value.length === 1 && value.includes(FieldValues.ALL))) {
      state[id] = [FieldValues.ALL];
    } else {
      state[id] = value.filter((val) => val !== FieldValues.ALL);
    }
  } else if (id === FieldIds.PERIOD) {
    state[id] = value;
  } else if (id === FieldIds.SORT) {
    state[id] = value;
  }
  return state;
};

export const prepareObjectValuesForFilterStateValues = (objectValues: Record<string, FilterStateValue>) =>
  Object.entries(objectValues)
    .map(([key, value]) => {
      const filterItem = { id: key, value };
      if (isFilterPeriodItem(filterItem) || isFilterSortItem(filterItem) || isFilterMultiItem(filterItem)) return filterItem;
    })
    .filter(isTruthy);

export const getFilterItemsFromFields = (fields: FilterField[]): FilterItem[] =>
  fields
    .map((item): FilterItem | undefined => {
      const filterItem = { id: item.id, value: item.value };
      if (isFilterPeriodItem(filterItem) || isFilterSortItem(filterItem) || isFilterMultiItem(filterItem)) return filterItem;
    })
    .filter(isTruthy);
