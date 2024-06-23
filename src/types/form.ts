import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd";
import { DatesStrings, PickerPeriod } from "@/types/date";
import type { RcFile } from "antd/es/upload";
import { FieldTranslationLabel, FieldTranslationRadioButtonOption, FieldTranslationSelectOption, FieldTypes } from "@/types/field";

export type SelectValue = string | number | (string | number)[];

export type FormItemRule = FieldTypes.NUMBER | FieldTypes.EMAIL;

export interface BaseFormField {
  id: string;
  label: FieldTranslationLabel;
  label_suffix?: string;
  placeholder?: string;
  focus?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface SelectFormField extends BaseFormField {
  type: FieldTypes.SELECT;
  value: SelectValue;
  options: Array<{ option?: string; label?: string; label_translation?: FieldTranslationSelectOption; value: string }>;
  options_prefix?: string;
  multiple?: boolean;
  showSearch?: boolean;
}

export interface RadioButtonsFormField extends BaseFormField {
  type: FieldTypes.RADIO_BUTTONS;
  value: string;
  options: Array<{ label?: string; label_translation: FieldTranslationRadioButtonOption; value: string }>;
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
