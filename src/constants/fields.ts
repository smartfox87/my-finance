import { ComplexFieldNames, DateFormField, DatesPeriodFormField, FileFormField, NumberFormField, RadioButtonsFormField, SelectFormField, SimpleFieldNames, TextFormField } from "@/types/form";
import { getDatesPeriod, getPeriod, periodOptions } from "@/helpers/date";
import { PickerPeriods } from "@/types/date";
import { FieldTypes } from "@/types/field";

export const SORT_FIELD: SelectFormField = {
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

export const ACCOUNT_FIELD: SelectFormField = {
  id: "account",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  value: "",
  options: [],
  required: true,
  showSearch: true,
};

export const ACCOUNTS_FIELD: SelectFormField = {
  id: "accounts",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  value: ["all"],
  options: [{ label_translation: "complex.account.options.all", value: "all" }],
  showSearch: true,
  multiple: true,
};

export const CATEGORY_FIELD: SelectFormField = {
  id: "category",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.CATEGORY}.label`,
  value: "",
  options: [],
  required: true,
  showSearch: true,
};

export const CATEGORIES_FIELD: SelectFormField = {
  id: "categories",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.CATEGORY}.label`,
  value: ["all"],
  options: [{ label_translation: "complex.category.options.all", value: "all" }],
  showSearch: true,
  multiple: true,
};

export const DATES_PERIOD_FIELD: DatesPeriodFormField = {
  id: "period",
  type: FieldTypes.DATES_PERIOD,
  label_translation: `complex.${ComplexFieldNames.PERIOD}.label`,
  value: getDatesPeriod(undefined, getPeriod()),
};

export const NAME_FIELD: TextFormField = { id: "name", type: FieldTypes.TEXTAREA, label_translation: `simple.${SimpleFieldNames.NAME}`, value: "", maxLength: 1000, required: true, focus: true };

export const AMOUNT_FIELD: NumberFormField = { id: "amount", type: FieldTypes.NUMBER, label_translation: `simple.${SimpleFieldNames.AMOUNT}`, label_suffix: "", value: "", required: true };

export const BALANCE_FIELD: NumberFormField = { id: "balance", type: FieldTypes.NUMBER, label_translation: `simple.${SimpleFieldNames.BALANCE}`, value: "", required: true };

export const DATE_FIELD: DateFormField = {
  id: "date",
  type: FieldTypes.DATE,
  label_translation: `simple.${SimpleFieldNames.DATE}`,
  value: undefined,
  picker: PickerPeriods.DATE,
  required: true,
  placeholder: "YYYY-MM-DD",
};

export const CURRENCY_FIELD: SelectFormField = {
  id: "currency",
  type: FieldTypes.SELECT,
  label_translation: `simple.${SimpleFieldNames.CURRENCY}`,
  value: "",
  options: [],
  required: true,
  showSearch: true,
  focus: true,
};

export const PERIOD_FIELD: RadioButtonsFormField = {
  id: "period",
  type: FieldTypes.RADIO_BUTTONS,
  label_translation: `simple.${SimpleFieldNames.PERIOD}`,
  value: "",
  options: periodOptions,
  required: true,
};

export const FULL_NAME_FIELD: TextFormField = {
  id: "full_name",
  type: FieldTypes.TEXT,
  label_translation: `simple.${SimpleFieldNames.FULL_NAME}`,
  value: "",
  focus: true,
};

export const EMAIL_FIELD: TextFormField = {
  id: "email",
  type: FieldTypes.EMAIL,
  label_translation: `simple.${SimpleFieldNames.EMAIL}`,
  value: "",
  required: true,
};

export const BIRTHDATE_FIELD: DateFormField = {
  id: "birthdate",
  type: FieldTypes.DATE,
  label_translation: `simple.${SimpleFieldNames.BIRTHDATE}`,
  picker: PickerPeriods.DATE,
};

export const GENDER_FIELD: SelectFormField = {
  id: "gender",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.GENDER}.label`,
  value: "",
  options: [
    { label_translation: "complex.gender.options.female", value: "female" },
    { label_translation: "complex.gender.options.male", value: "male" },
  ],
};

export const SUBJECT_FIELD: SelectFormField = {
  id: "subject",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.SUBJECT}.label`,
  value: "",
  options: [
    { label_translation: "complex.subject.options.feedback", value: "feedback" },
    { label_translation: "complex.subject.options.bug", value: "bug" },
    { label_translation: "complex.subject.options.support", value: "support" },
    { label_translation: "complex.subject.options.suggestion", value: "suggestion" },
    { label_translation: "complex.subject.options.collaboration", value: "collaboration" },
    { label_translation: "complex.subject.options.other", value: "other" },
  ],
  required: true,
};

export const MESSAGE_FIELD: TextFormField = {
  id: "message",
  type: FieldTypes.TEXTAREA,
  label_translation: `simple.${SimpleFieldNames.MESSAGE}`,
  value: "",
  required: true,
};

export const FILES_FIELD: FileFormField = {
  id: "files",
  type: FieldTypes.FILE,
  label_translation: `simple.${SimpleFieldNames.ATTACHMENTS}`,
  value: [],
  maxCount: 3,
  multiple: true,
  accept: "image/*,video/*",
  maxSize: 5 * 1024 * 1024,
};

export const PASSWORD_FIELD: TextFormField = {
  id: "password",
  type: FieldTypes.PASSWORD,
  label_translation: `simple.${SimpleFieldNames.PASSWORD}`,
  value: "",
  required: true,
};
