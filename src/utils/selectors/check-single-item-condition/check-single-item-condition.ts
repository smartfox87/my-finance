import { FieldValues, type MultiSelectValue } from "@/features/fields";

export const checkSingleItemCondition = (filterItem: MultiSelectValue | undefined, itemId: number): boolean =>
  filterItem !== undefined && (filterItem.includes(itemId) || filterItem.includes(FieldValues.ALL));
