import { periodOptions } from "@/helpers/date.js";

export const INITIAL_SETTINGS_FIELDS = [
  {
    id: "currency",
    label_translation: "profile.currency",
    value: "",
    type: "select",
    required: true,
    showSearch: true,
    focus: true,
    options: [],
  },
  {
    id: "period",
    label_translation: "profile.period",
    value: "",
    type: "radio-buttons",
    required: true,
    options: periodOptions,
  },
];

export const INITIAL_PROFILE_FIELDS = [
  {
    id: "full_name",
    label_translation: "profile.full_name",
    value: "",
    type: "text",
    required: true,
    focus: true,
  },
  {
    id: "email",
    label_translation: "profile.email",
    value: "",
    type: "email",
    required: true,
    disabled: true,
  },
  {
    id: "birthdate",
    label_translation: "profile.birthdate",
    value: "",
    type: "date",
  },
  {
    id: "gender",
    label_translation: "profile.gender.label",
    value: "",
    type: "select",
    options: [
      { label_translation: "profile.gender.options.female", value: "female" },
      { label_translation: "profile.gender.options.male", value: "male" },
    ],
  },
];
