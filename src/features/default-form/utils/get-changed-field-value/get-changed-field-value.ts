import { isMultiSelectValue } from "../../predicates";
import { type ChangedField, type FormValue, FieldTypes, FieldValues } from "../../types";

export const getChangedFieldValue = (prevValue: FormValue, { id, value, type }: ChangedField): Record<string, FormValue> => {
  if (type === FieldTypes.MULTISELECT && isMultiSelectValue(value) && isMultiSelectValue(prevValue)) {
    if (!value?.length || (!prevValue.includes(FieldValues.ALL) && value.includes(FieldValues.ALL))) return { [id]: [FieldValues.ALL] };
    else return { [id]: value.filter((val) => val !== FieldValues.ALL) };
  } else return { [id]: value };
};
