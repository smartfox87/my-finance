import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd";
import type { PickerPeriod } from "@/types/date";
import type { SelectValue } from "antd/es/select";

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

export type FormItemRule = "number" | "email";

export interface BaseFormField {
  id: string;
  label_translation?: string;
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
  value: Dayjs;
  picker: PickerPeriod;
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

export interface PeriodFormField extends BaseFormField {
  type: FieldTypes.PERIOD;
  value: [string, string];
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

export type FormField = PeriodFormField | TextFormField | SelectFormField | DateFormField | FileFormField | RadioButtonsFormField | NumberFormField;

export type ChangedField =
  | Pick<PeriodFormField, "id" | "type" | "value">
  | Pick<TextFormField, "id" | "type" | "value">
  | Pick<SelectFormField, "id" | "type" | "value">
  | Pick<DateFormField, "id" | "type" | "value">
  | Pick<FileFormField, "id" | "type" | "value">
  | Pick<RadioButtonsFormField, "id" | "type" | "value">
  | Pick<NumberFormField, "id" | "type" | "value">;

export interface DefaultFormProps {
  fields: FormField[];
  isResetAfterSave?: boolean;
  isVisible?: boolean;
  onSaveForm: (formValues: any) => Promise<void>;
  onResetForm?: () => void;
  onChange?: () => void;
}

export type FormValue = null | number | string | string[] | UploadFile[] | Dayjs;

export interface FormValues {
  [key: string]: FormValue;
}

export interface ProcessedValues {
  [key: string]: any;
  // [key: string]: File[] | FormValue;
}

export interface PropFieldValue {
  name: string;
  type: string;
  value?: FormValue;
  fileList?: UploadFile[];
}
