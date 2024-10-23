import { FieldValues, type MultiSelectValue } from "@/features/fields";

export const checkMultiItemCondition = (filterItem: MultiSelectValue | undefined, itemValues: MultiSelectValue) =>
  filterItem !== undefined && (!itemValues.length || filterItem.includes(FieldValues.ALL) || filterItem.some((filterValue) => itemValues.includes(filterValue)));
