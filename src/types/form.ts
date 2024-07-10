import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd";
import { DatesStrings, PickerPeriod } from "@/types/date";
import type { RcFile } from "antd/es/upload";
import {
  FieldIds,
  FieldTranslationLabel,
  FieldTranslationRadioButtonOption,
  FieldTranslationSelectOption,
  FieldTypes,
  MultiSelectOptionValue,
  MultiSelectValue,
  SingleSelectValue,
} from "@/types/field";

export type FormItemRule = FieldTypes.NUMBER | FieldTypes.EMAIL;

export interface BaseFormField {
  label: FieldTranslationLabel;
  label_suffix?: string;
  placeholder?: string;
  focus?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export type SingleSelectFormFieldId = FieldIds.SORT | FieldIds.ACCOUNT | FieldIds.CATEGORY | FieldIds.CURRENCY | FieldIds.GENDER | FieldIds.SUBJECT;
export const isSingleSelectFormFieldId = (id: string): id is SingleSelectFormFieldId =>
  FieldIds.SORT === id || FieldIds.ACCOUNT === id || FieldIds.CATEGORY === id || FieldIds.CURRENCY === id || FieldIds.GENDER === id || FieldIds.SUBJECT === id;
export interface SingleSelectFormField extends BaseFormField {
  id: SingleSelectFormFieldId;
  type: FieldTypes.SELECT;
  value: SingleSelectValue;
  options: Array<{ option?: string; label?: string; label_translation?: FieldTranslationSelectOption; value: SingleSelectValue }>;
  options_prefix?: string;
  showSearch?: boolean;
}

export type MultiSelectFormFieldId = FieldIds.ACCOUNTS | FieldIds.CATEGORIES;
export const isMultiSelectFormFieldId = (id: string): id is MultiSelectFormFieldId => FieldIds.ACCOUNTS === id || FieldIds.CATEGORIES === id;
export interface MultiSelectFormField extends BaseFormField {
  id: MultiSelectFormFieldId;
  type: FieldTypes.MULTISELECT;
  value: MultiSelectValue;
  options: Array<{ option?: string; label?: string; label_translation?: FieldTranslationSelectOption; value: MultiSelectOptionValue }>;
  options_prefix?: string;
  showSearch?: boolean;
}

type RadioButtonsFormFieldId = FieldIds.PERIOD;
export const isRadioButtonsFormFieldId = (id: string): id is RadioButtonsFormFieldId => FieldIds.PERIOD === id;
export interface RadioButtonsFormField extends BaseFormField {
  id: RadioButtonsFormFieldId;
  type: FieldTypes.RADIO_BUTTONS;
  value: string;
  options: Array<{ label?: string; label_translation: FieldTranslationRadioButtonOption; value: string }>;
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

type DateFormFieldId = FieldIds.DATE | FieldIds.BIRTHDATE;
export const isDateFormFieldId = (id: string): id is DateFormFieldId => FieldIds.DATE === id || FieldIds.BIRTHDATE === id;
export interface DateFormField extends BaseFormField {
  id: DateFormFieldId;
  type: FieldTypes.DATE;
  picker: PickerPeriod;
  value?: Dayjs;
  disabledDate?: (current: Dayjs) => boolean;
}

export type DatesPeriodFormFieldId = FieldIds.PERIOD;
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

export type FormField = DatesPeriodFormField | TextFormField | SingleSelectFormField | MultiSelectFormField | DateFormField | FileFormField | RadioButtonsFormField | NumberFormField;

export type ChangedField =
  | Pick<DatesPeriodFormField, "id" | "type" | "value">
  | Pick<TextFormField, "id" | "type" | "value">
  | Pick<SingleSelectFormField, "id" | "type" | "value">
  | Pick<MultiSelectFormField, "id" | "type" | "value">
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
