import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd";
import { DatesStrings, PickerPeriod } from "@/types/date";
import type { RcFile } from "antd/es/upload";
import { FieldIds, FieldTranslationLabel, FieldTranslationRadioButtonOption, FieldTranslationSelectOption, FieldTypes } from "@/types/field";

export type SelectValue = string | number | (string | number)[];

export type FormItemRule = FieldTypes.NUMBER | FieldTypes.EMAIL;

export interface BaseFormField {
  label: FieldTranslationLabel;
  label_suffix?: string;
  placeholder?: string;
  focus?: boolean;
  required?: boolean;
  disabled?: boolean;
}

type SelectFormFieldId = FieldIds.SORT | FieldIds.ACCOUNT | FieldIds.ACCOUNTS | FieldIds.CATEGORY | FieldIds.CATEGORIES | FieldIds.CURRENCY | FieldIds.GENDER | FieldIds.SUBJECT;
export const isSelectFormFieldId = (id: string): id is SelectFormFieldId =>
  FieldIds.ACCOUNT === id || FieldIds.ACCOUNTS === id || FieldIds.CATEGORY === id || FieldIds.CATEGORIES === id || FieldIds.CURRENCY === id || FieldIds.GENDER === id || FieldIds.SUBJECT === id;
export interface SelectFormField extends BaseFormField {
  id: SelectFormFieldId;
  type: FieldTypes.SELECT;
  value: SelectValue;
  options: Array<{ option?: string; label?: string; label_translation?: FieldTranslationSelectOption; value: string }>;
  options_prefix?: string;
  multiple?: boolean;
  showSearch?: boolean;
}

type RadioButtonsFormFieldId = FieldIds.PERIOD;
export const isRadioButtonsFormFieldId = (id: string): id is RadioButtonsFormFieldId => FieldIds.PERIOD === id;
export interface RadioButtonsFormField extends BaseFormField {
  id: RadioButtonsFormFieldId;
  type: FieldTypes.RADIO_BUTTONS;
  value: string;
  options: Array<{ label?: string; label_translation: FieldTranslationRadioButtonOption; value: string }>;
  multiple?: boolean;
  showSearch?: boolean;
}

type DateFormFieldId = FieldIds.DATE | FieldIds.BIRTHDATE;
export const isDateFormFieldId = (id: string): id is DateFormFieldId => FieldIds.DATE === id || FieldIds.BIRTHDATE === id;
export interface DateFormField extends BaseFormField {
  id: DateFormFieldId;
  type: FieldTypes.DATE;
  picker: PickerPeriod;
  value?: Dayjs;
  disabledDate?: (current: Dayjs) => boolean;
}

type FileFormFieldId = FieldIds.FILES;
export const isFileFormFieldId = (id: string): id is FileFormFieldId => FieldIds.FILES === id;
export interface FileFormField extends BaseFormField {
  id: FileFormFieldId;
  type: FieldTypes.FILE;
  value: UploadFile[];
  multiple?: boolean;
  maxCount?: number;
  accept?: string;
  maxSize?: number;
}

type DatesPeriodFormFieldId = FieldIds.PERIOD;
export const isDatesPeriodFormFieldId = (id: string): id is DatesPeriodFormFieldId => FieldIds.PERIOD === id;
export interface DatesPeriodFormField extends BaseFormField {
  id: DatesPeriodFormFieldId;
  type: FieldTypes.DATES_PERIOD;
  value: DatesStrings;
}

type TextFormFieldId = FieldIds.NAME | FieldIds.FULL_NAME | FieldIds.EMAIL | FieldIds.MESSAGE | FieldIds.PASSWORD;
export const isTextFormFieldId = (id: string): id is TextFormFieldId =>
  FieldIds.NAME === id || FieldIds.FULL_NAME === id || FieldIds.EMAIL === id || FieldIds.MESSAGE === id || FieldIds.PASSWORD === id;
export interface TextFormField extends BaseFormField {
  id: TextFormFieldId;
  type: FieldTypes.TEXT | FieldTypes.PASSWORD | FieldTypes.EMAIL | FieldTypes.TEXTAREA;
  value: string;
  maxLength?: number;
}

type NumberFormFieldId = FieldIds.AMOUNT | FieldIds.BALANCE;
export const isNumberFormFieldId = (id: string): id is NumberFormFieldId => FieldIds.AMOUNT === id || FieldIds.BALANCE === id;
export interface NumberFormField extends BaseFormField {
  id: NumberFormFieldId;
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
