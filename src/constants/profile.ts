import { periodOptions } from "@/helpers/date";
import { ComplexFieldNames, FieldTypes, FormField, SimpleFieldNames } from "@/types/form";
import { BIRTHDATE_FIELD, CURRENCY_FIELD, EMAIL_FIELD, FULL_NAME_FIELD, GENDER_FIELD } from "@/constants/fields";

export const INITIAL_SETTINGS_FIELDS: FormField[] = [
  CURRENCY_FIELD,
  {
    id: "period",
    label_translation: `simple.${SimpleFieldNames.PERIOD}`,
    value: "",
    type: "radio-buttons",
    required: true,
    options: periodOptions,
  },
];

export const INITIAL_PROFILE_FIELDS: FormField[] = [FULL_NAME_FIELD, EMAIL_FIELD, BIRTHDATE_FIELD, GENDER_FIELD];
