import { FieldValues, type MultiSelectValue } from "@/types/field";

export const checkSingleItemCondition = (filterItem: MultiSelectValue | undefined, itemId: number): boolean =>
  filterItem !== undefined && (filterItem.includes(itemId) || filterItem.includes(FieldValues.ALL));
