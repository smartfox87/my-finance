import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd";
import { DatesStrings, PickerPeriod } from "@/types/date";
import type { RcFile } from "antd/es/upload";

export type SelectValue = string | number | (string | number)[];

export enum FieldTypes {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  NUMBER = "number",
  TEXTAREA = "textarea",
  SELECT = "select",
  DATES_PERIOD = "period",
  RADIO_BUTTONS = "radio-buttons",
  FILE = "file",
  DATE = "date",
}

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

export type FieldType = `${FieldTypes}`;

export type FormItemRule = FieldTypes.NUMBER | FieldTypes.EMAIL;

export interface BaseFormField {
  id: string;
  label_translation?: FieldTranslationLabel;
  label?: string;
  label_suffix?: string;
  placeholder?: string;
  focus?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface SelectFormField extends BaseFormField {
  type: FieldTypes.SELECT;
  value: SelectValue;
  options: Array<{ option?: string; label?: string; label_translation?: string; value: string }>;
  options_prefix?: string;
  multiple?: boolean;
  showSearch?: boolean;
}

export interface RadioButtonsFormField extends BaseFormField {
  type: FieldTypes.RADIO_BUTTONS;
  value: string;
  options: Array<{ option?: string; label?: string; label_translation?: string; value: string }>;
  multiple?: boolean;
  showSearch?: boolean;
}

export interface DateFormField extends BaseFormField {
  type: FieldTypes.DATE;
  picker: PickerPeriod;
  value?: Dayjs;
  disabledDate?: (current: Dayjs) => boolean;
}

export interface FileFormField extends BaseFormField {
  type: FieldTypes.FILE;
  value: UploadFile[];
  multiple?: boolean;
  maxCount?: number;
  accept?: string;
  maxSize?: number;
}

export interface DatesPeriodFormField extends BaseFormField {
  type: FieldTypes.DATES_PERIOD;
  value: DatesStrings;
}

export interface TextFormField extends BaseFormField {
  type: FieldTypes.TEXT | FieldTypes.PASSWORD | FieldTypes.EMAIL | FieldTypes.TEXTAREA;
  value: string;
  maxLength?: number;
}

export interface NumberFormField extends BaseFormField {
  type: FieldTypes.NUMBER;
  value: number | string;
}

export type FormField = DatesPeriodFormField | TextFormField | SelectFormField | DateFormField | FileFormField | RadioButtonsFormField | NumberFormField;

export type ChangedField =
  | Pick<DatesPeriodFormField, "id" | "type" | "value">
  | Pick<TextFormField, "id" | "type" | "value">
  | Pick<SelectFormField, "id" | "type" | "value">
  | Pick<DateFormField, "id" | "type" | "value">
  | Pick<FileFormField, "id" | "type" | "value">
  | Pick<RadioButtonsFormField, "id" | "type" | "value">
  | Pick<NumberFormField, "id" | "type" | "value">;

export type FormValue = FormField["value"] | (RcFile | undefined)[];

export type FormValues = Record<string, FormValue>;

export interface DefaultFormProps {
  fields: FormField[];
  onSaveForm: (formValues: Record<string, FormValue>) => Promise<void>;
  isResetAfterSave?: boolean;
  isVisible?: boolean;
  onResetForm?: () => void;
  onChange?: () => void;
}
