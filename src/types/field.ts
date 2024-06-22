export type SelectValue = string | number | (string | number)[];

export enum FieldTypes {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  NUMBER = "number",
  TEXTAREA = "textarea",
  SELECT = "select",
  PERIOD = "period",
  RADIO_BUTTONS = "radio-buttons",
  FILE = "file",
  DATE = "date",
}

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
}

export enum ComplexFieldNames {
  CATEGORY = "category",
  ACCOUNT = "account",
  PERIOD = "period",
  SORT = "sort",
  GENDER = "gender",
  SUBJECT = "subject",
}

export enum FieldSelectOptions {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  DATE_ASC = "date_asc",
  DATE_DESC = "date_desc",
  AMOUNT_ASC = "amount_asc",
  AMOUNT_DESC = "amount_desc",
}

export type FieldTranslationLabel = `simple.${SimpleFieldNames}` | `complex.${ComplexFieldNames}.label`;
export type FieldTranslationError = `fields.errors.${FieldTypes}`;
export type FieldTranslationSelectOption = `complex.${FieldTypes}.options.${FieldSelectOptions}`;
