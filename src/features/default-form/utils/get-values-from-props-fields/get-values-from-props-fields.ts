import dayjs from "dayjs";
import { FieldTypes } from "@/types/field";
import type { FormField, FormValues } from "@/types/form";

export const getValuesFromPropsFields = (fields: FormField[]): FormValues =>
  Object.assign(
    {},
    ...fields.map(({ id, type, value }) => ({
      [id]: type === FieldTypes.DATE && value ? dayjs(value) : value,
    })),
  );
