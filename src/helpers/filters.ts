import { FieldIds, FieldValues } from "@/types/field";
import { FilterItem, FilterState } from "@/types/filter";

export const checkIsClearableFilter = ({ id, value }: FilterItem) => FieldIds.SORT !== id && FieldIds.PERIOD !== id && value !== FieldValues.ALL;

export const setFilterValue = (filterValues: FilterState | null, { id, value }: FilterItem) => {
  const state: FilterState = filterValues ? { ...filterValues } : {};
  if (Array.isArray(value)) {
    if (!value?.length || (!state[id]?.includes(FieldValues.ALL) && value.includes(FieldValues.ALL)) || (value.length === 1 && value.includes(FieldValues.ALL))) state[id] = [FieldValues.ALL];
    else state[id] = value.filter((val) => val !== FieldValues.ALL);
  } else state[id] = value;
  return state;
};
