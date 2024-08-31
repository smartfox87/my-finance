import dayjs, { isDayjs } from "dayjs";
import { isMultiSelectValue, isUploadFileArray } from "@/predicates/field";
import { isTruthy } from "@/predicates/common";
import { FieldTypes, FieldValues } from "@/types/field";
import type { ChangedField, FormField, FormValue, FormValues } from "@/types/form";

export const getValuesFromPropsFields = (fields: FormField[]): FormValues =>
  Object.assign(
    {},
    ...fields.map(({ id, type, value }) => ({
      [id]: type === FieldTypes.DATE && value ? dayjs(value) : value,
    })),
  );

export const getChangedFieldValue = (prevValue: FormValue, { id, value, type }: ChangedField): Record<string, FormValue> => {
  if (type === FieldTypes.MULTISELECT && isMultiSelectValue(value) && isMultiSelectValue(prevValue)) {
    if (!value?.length || (!prevValue.includes(FieldValues.ALL) && value.includes(FieldValues.ALL))) return { [id]: [FieldValues.ALL] };
    else return { [id]: value.filter((val) => val !== FieldValues.ALL) };
  } else return { [id]: value };
};

export const processFormValues = (values: FormValues): FormValues =>
  Object.assign(
    {},
    ...Object.entries(values).map(([key, value]) => {
      if (isUploadFileArray(value)) return { [key]: value.map(({ originFileObj }) => originFileObj).filter(isTruthy) };
      else if (isDayjs(value)) return { [key]: value.toISOString() };
      else if (isMultiSelectValue(value)) return { [key]: value.filter((val) => val !== FieldValues.ALL) };
      else return { [key]: value };
    }),
  );
