import { isMultiSelectFormFieldId } from "@/predicates/form";
import { isNumber } from "@/predicates/common";
import type { ActiveFilterItemValue } from "@/features/filter";

export const checkIsClearableFilter = ({ id, value }: ActiveFilterItemValue): boolean => isMultiSelectFormFieldId(id) && isNumber(value);
