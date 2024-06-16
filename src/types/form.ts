import { Dayjs } from "dayjs";
import { UploadFile } from "antd";
import type { Period } from "@/types/date";

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
  // type: FieldType;
  value: any;
  label?: string;
  label_translation: string;
  label_suffix?: string;
  placeholder?: string;
  focus?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface SelectFormField extends BaseFormField {
  type: FieldTypes.SELECT;
  multiple?: boolean;
  options: Array<{ option?: string; label?: string; label_translation?: string; value: string }>;
  showSearch?: boolean;
}

export interface RadioButtonsFormField extends BaseFormField {
  type: FieldTypes.RADIO_BUTTONS;
  multiple?: boolean;
  options: Array<{ option?: string; label?: string; label_translation?: string; value: string }>;
  showSearch?: boolean;
}

export interface DateFormField extends BaseFormField {
  type: FieldTypes.DATE;
  picker: Period;
  disabledDate?: (current: Dayjs) => boolean;
}

export interface FileFormField extends BaseFormField {
  type: FieldTypes.FILE;
  multiple?: boolean;
  // fileList: any[];
  maxCount?: number;
  accept?: string;
  maxSize?: number;
}

export interface PeriodFormField extends BaseFormField {
  type: FieldTypes.PERIOD;
}

export interface TextFormField extends BaseFormField {
  type: FieldTypes.TEXT | FieldTypes.PASSWORD | FieldTypes.EMAIL | FieldTypes.NUMBER | FieldTypes.TEXTAREA;
  maxLength?: number;
}

export type FormField = PeriodFormField | TextFormField | SelectFormField | DateFormField | FileFormField | RadioButtonsFormField;

export interface CommonFormField extends BaseFormField {
  disabledDate?: (current: Dayjs) => boolean;
  options?: Array<{ option?: string; label?: string; label_translation?: string; value: string }>;
  maxCount?: number;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  fileList?: any[];
  showSearch?: boolean;
  maxLength?: number;
  picker?: "date" | "week" | "month" | "quarter" | "year";
}

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
  [key: string]: File[] | FormValue;
}

export interface ChangedField {
  id: string;
  value: FormValue;
  multiple?: boolean;
  type?: string;
}

export interface PropFieldValue {
  name: string;
  type: string;
  value?: FormValue;
  fileList?: UploadFile[];
}
