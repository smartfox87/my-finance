import { ComplexFieldNames, FieldTypes, FormField, SimpleFieldNames } from "@/types/form";
import { getDatesPeriod, getPeriod, periodOptions } from "@/helpers/date";
import { PickerPeriods } from "@/types/date";

export const SORT_FIELD: FormField = {
  id: "sort",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.SORT}.label`,
  value: "date_desc",
  options: [
    { label_translation: "complex.sort.options.name_asc", value: "name_asc" },
    { label_translation: "complex.sort.options.name_desc", value: "name_desc" },
    { label_translation: "complex.sort.options.date_asc", value: "date_asc" },
    { label_translation: "complex.sort.options.date_desc", value: "date_desc" },
    { label_translation: "complex.sort.options.amount_asc", value: "amount_asc" },
    { label_translation: "complex.sort.options.amount_desc", value: "amount_desc" },
  ],
  options_prefix: "complex.sort.options.prefix",
  focus: true,
};

export const ACCOUNT_FIELD: FormField = {
  id: "account",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  value: "",
  options: [],
  required: true,
  showSearch: true,
};

export const ACCOUNTS_FIELD: FormField = {
  id: "accounts",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  value: ["all"],
  options: [{ label_translation: "complex.account.options.all", value: "all" }],
  showSearch: true,
  multiple: true,
};

export const CATEGORY_FIELD: FormField = {
  id: "category",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.CATEGORY}.label`,
  value: "",
  options: [],
  required: true,
  showSearch: true,
};

export const CATEGORIES_FIELD: FormField = {
  id: "categories",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.CATEGORY}.label`,
  value: ["all"],
  options: [{ label_translation: "complex.category.options.all", value: "all" }],
  showSearch: true,
  multiple: true,
};

export const PERIOD_FIELD: FormField = {
  id: "period",
  type: FieldTypes.PERIOD,
  label_translation: `complex.${ComplexFieldNames.PERIOD}.label`,
  value: getDatesPeriod(undefined, getPeriod()),
};

export const NAME_FIELD: FormField = { id: "name", type: FieldTypes.TEXTAREA, label_translation: `simple.${SimpleFieldNames.NAME}`, value: "", maxLength: 1000, required: true, focus: true };

export const AMOUNT_FIELD: FormField = { id: "amount", type: FieldTypes.NUMBER, label_translation: `simple.${SimpleFieldNames.AMOUNT}`, label_suffix: "", value: "", required: true };

export const BALANCE_FIELD: FormField = { id: "balance", type: FieldTypes.NUMBER, label_translation: `simple.${SimpleFieldNames.BALANCE}`, value: "", required: true };

export const DATE_FIELD: FormField = {
  id: "date",
  type: FieldTypes.DATE,
  label_translation: `simple.${SimpleFieldNames.DATE}`,
  value: undefined,
  picker: PickerPeriods.DATE,
  required: true,
  placeholder: "YYYY-MM-DD",
};

export const CURRENCY_FIELD: FormField = {
  id: "currency",
  type: FieldTypes.SELECT,
  label_translation: `simple.${SimpleFieldNames.CURRENCY}`,
  value: "",
  options: [],
  required: true,
  showSearch: true,
  focus: true,
};
export const INITIAL_SETTINGS_FIELDS = [
  {
    id: "period",
    label_translation: `simple.${SimpleFieldNames.PERIOD}`,
    value: "",
    type: "radio-buttons",
    required: true,
    options: periodOptions,
  },
];

export const FULL_NAME_FIELD: FormField = {
  id: "full_name",
  type: FieldTypes.TEXT,
  label_translation: `simple.${SimpleFieldNames.FULL_NAME}`,
  value: "",
  required: true,
  focus: true,
};

export const EMAIL_FIELD: FormField = {
  id: "email",
  type: FieldTypes.EMAIL,
  label_translation: `simple.${SimpleFieldNames.EMAIL}`,
  value: "",
  required: true,
  disabled: true,
};

export const BIRTHDATE_FIELD: FormField = {
  id: "birthdate",
  type: FieldTypes.DATE,
  label_translation: `simple.${SimpleFieldNames.BIRTHDATE}`,
  picker: PickerPeriods.DATE,
};

export const GENDER_FIELD: FormField = {
  id: "gender",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.GENDER}.label`,
  value: "",
  options: [
    { label_translation: "complex.gender.options.female", value: "female" },
    { label_translation: "complex.gender.options.male", value: "male" },
  ],
};
