import { Dayjs } from "dayjs";

export type RuleType = "number" | "email";

export type ExtendedRuleType = RuleType | "password" | "textarea" | "select" | "period" | "radio-buttons" | "file" | "text" | "date";

export type PropField = {
  value: any;
  id: string;
  label_translation: string;
  type: ExtendedRuleType;
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
};
