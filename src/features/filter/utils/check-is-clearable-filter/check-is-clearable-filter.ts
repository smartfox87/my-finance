import { isMultiSelectFormFieldId } from "@/features/fields";
import { isNumber } from "@/predicates/common";
import type { ActiveFilterItemValue } from "@/features/filter";

export const checkIsClearableFilter = ({ id, value }: ActiveFilterItemValue): boolean => isMultiSelectFormFieldId(id) && isNumber(value);
