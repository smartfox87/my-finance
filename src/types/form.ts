import { Dayjs } from "dayjs";
import { UploadFile } from "antd";

export interface DefaultFormProps {
  fields: PropField[];
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

export type FormItemRule = "number" | "email";

export type ExtendedFormItemRule = FormItemRule | "password" | "textarea" | "select" | "period" | "radio-buttons" | "file" | "text" | "date";

export interface PropField {
  value: any;
  id: string;
  label_translation: string;
  type: ExtendedFormItemRule;
  label?: string;
  label_suffix?: string;
  focus?: boolean;
  required?: boolean;
  disabled?: boolean;
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
  placeholder?: string;
}
