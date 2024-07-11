import { DatesPeriods } from "@/types/date";

export enum FieldIds {
  SORT = "sort",
  PERIOD = "period",
  ACCOUNT = "account",
  ACCOUNTS = "accounts",
  CATEGORY = "category",
  CATEGORIES = "categories",
  NAME = "name",
  AMOUNT = "amount",
  BALANCE = "balance",
  DATE = "date",
  CURRENCY = "currency",
  FULL_NAME = "full_name",
  EMAIL = "email",
  BIRTHDATE = "birthdate",
  GENDER = "gender",
  SUBJECT = "subject",
  MESSAGE = "message",
  FILES = "files",
  PASSWORD = "password",
}

export enum FieldTypes {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  NUMBER = "number",
  TEXTAREA = "textarea",
  SELECT = "select",
  MULTISELECT = "multiselect",
  DATES_PERIOD = "period",
  RADIO_BUTTONS = "radio-buttons",
  FILE = "file",
  DATE = "date",
}

export enum FieldValues {
  ALL = "all",
}

export type MultiSelectOptionValue = number | FieldValues.ALL;

export type MultiSelectValue = MultiSelectOptionValue[];

export interface MultiSelectOption {
  value: MultiSelectOptionValue;
  label?: string;
  label_translation?: FieldTranslationSelectOption;
}

export type SingleSelectValue = number | string;

type ConditionalSelectValue<T> = T extends { mode: "multiple" } ? MultiSelectValue : SingleSelectValue;

export type SelectComponentProps<T> = T & { value?: ConditionalSelectValue<T> };

export type FieldType = `${FieldTypes}`;

export enum SimpleFieldNames {
  NAME = "name",
  BALANCE = "balance",
  AMOUNT = "amount",
  DATE = "date",
  CURRENCY = "currency",
  PERIOD = "period",
  FULL_NAME = "full_name",
  EMAIL = "email",
  BIRTHDATE = "birthdate",
  PASSWORD = "password",
  MESSAGE = "message",
  ATTACHMENTS = "attachments",
}

export enum ComplexFieldNames {
  CATEGORY = "category",
  ACCOUNT = "account",
  PERIOD = "period",
  SORT = "sort",
  GENDER = "gender",
  SUBJECT = "subject",
}

export enum SortFieldOptions {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  DATE_ASC = "date_asc",
  DATE_DESC = "date_desc",
  AMOUNT_ASC = "amount_asc",
  AMOUNT_DESC = "amount_desc",
}

export enum GenderFieldOptions {
  FEMALE = "female",
  MALE = "male",
}

export enum SubjectFieldOptions {
  FEEDBACK = "feedback",
  BUG = "bug",
  SUPPORT = "support",
  SUGGESTION = "suggestion",
  COLLABORATION = "collaboration",
  OTHER = "other",
}

export enum SelectFieldOptions {
  ALL = "all",
}

export interface SelectFieldOption {
  label: string;
  value: number | string;
}

export type FieldTranslationLabel = `simple.${SimpleFieldNames}` | `complex.${ComplexFieldNames}.label`;
export type FieldTranslationError = `fields.errors.${FieldTypes}`;
export type FieldTranslationSelectOption =
  | `complex.${ComplexFieldNames.SORT}.options.${SortFieldOptions}`
  | `complex.${ComplexFieldNames.GENDER}.options.${GenderFieldOptions}`
  | `complex.${ComplexFieldNames.SUBJECT}.options.${SubjectFieldOptions}`
  | `complex.${ComplexFieldNames.ACCOUNT | ComplexFieldNames.CATEGORY}.options.${SelectFieldOptions}`;
export type FieldTranslationRadioButtonOption = `complex.${ComplexFieldNames.PERIOD}.options.${DatesPeriods}`;
