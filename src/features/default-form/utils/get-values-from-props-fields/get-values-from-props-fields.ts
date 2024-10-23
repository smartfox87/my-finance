import dayjs from "dayjs";
import { FieldTypes } from "@/features/fields";
import type { FormField, FormValues } from "../../types";

export const getValuesFromPropsFields = (fields: FormField[]): FormValues =>
  Object.assign(
    {},
    ...fields.map(({ id, type, value }) => ({
      [id]: type === FieldTypes.DATE && value ? dayjs(value) : value,
    })),
  );
