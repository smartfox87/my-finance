import { isMultiSelectValue } from "@/features/fields";
import { FieldIds, FieldValues } from "@/features/fields";
import type { FilterItem, FilterState } from "../../types";

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
