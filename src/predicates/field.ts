import { isNumber, isString } from "@/types/predicates";
import { SingleSelectValue } from "@/types/field";

export const isSingleSelectValue = (value: any): value is SingleSelectValue => isString(value) || isNumber(value);
