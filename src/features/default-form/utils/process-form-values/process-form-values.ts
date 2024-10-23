import { isMultiSelectValue, isUploadFileArray } from "@/features/fields";
import { isTruthy } from "@/predicates/common";
import { isDayjs } from "dayjs";
import { FieldValues } from "@/features/fields";
import type { FormValues } from "../../types";

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
