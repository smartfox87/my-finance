import { periodOptions } from "@/helpers/date";
import { ComplexFieldNames, FieldTypes, SimplyFieldNames } from "@/types/form";

export const INITIAL_SETTINGS_FIELDS = [
  {
    id: "currency",
    label_translation: `simple.${SimplyFieldNames.CURRENCY}`,
    value: "",
    type: "select",
    required: true,
    showSearch: true,
    focus: true,
    options: [],
  },
  {
    id: "period",
    label_translation: `simple.${SimplyFieldNames.PERIOD}`,
    value: "",
    type: "radio-buttons",
    required: true,
    options: periodOptions,
  },
];

export const INITIAL_PROFILE_FIELDS = [
  {
    id: "full_name",
    label_translation: `simple.${SimplyFieldNames.FULL_NAME}`,
    value: "",
    type: "text",
    required: true,
    focus: true,
  },
  {
    id: "email",
    label_translation: `simple.${SimplyFieldNames.EMAIL}`,
    value: "",
    type: FieldTypes.EMAIL,
    required: true,
    disabled: true,
  },
  {
    id: "birthdate",
    label_translation: `simple.${SimplyFieldNames.BIRTHDATE}`,
    value: "",
    type: "date",
  },
  {
    id: "gender",
    label_translation: `complex.${ComplexFieldNames.GENDER}.label`,
    value: "",
    type: "select",
    options: [
      { label_translation: "complex.gender.options.female", value: "female" },
      { label_translation: "complex.gender.options.male", value: "male" },
    ],
  },
];
