import { periodOptions } from "@/helpers/date.js";

export const INITIAL_SETTINGS_FIELDS = [
  {
    id: "currency",
    label_translation: "simple.currency",
    value: "",
    type: "select",
    required: true,
    showSearch: true,
    focus: true,
    options: [],
  },
  {
    id: "period",
    label_translation: "simple.period",
    value: "",
    type: "radio-buttons",
    required: true,
    options: periodOptions,
  },
];

export const INITIAL_PROFILE_FIELDS = [
  {
    id: "full_name",
    label_translation: "simple.full_name",
    value: "",
    type: "text",
    required: true,
    focus: true,
  },
  {
    id: "email",
    label_translation: "simple.email",
    value: "",
    type: "email",
    required: true,
    disabled: true,
  },
  {
    id: "birthdate",
    label_translation: "simple.birthdate",
    value: "",
    type: "date",
  },
  {
    id: "gender",
    label_translation: "complex.gender.label",
    value: "",
    type: "select",
    options: [
      { label_translation: "complex.gender.options.female", value: "female" },
      { label_translation: "complex.gender.options.male", value: "male" },
    ],
  },
];
