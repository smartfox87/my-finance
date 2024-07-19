import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd";
import { DatesStrings, PickerPeriod } from "@/types/date";
import type { RcFile } from "antd/es/upload";
import { FieldId, FieldIds, FieldTranslationLabel, FieldTranslationRadioButtonOption, FieldTypes, MultiSelectOptionValue, MultiSelectValue, SelectOption, SingleSelectValue } from "@/types/field";

export type FormItemRule = FieldTypes.NUMBER | FieldTypes.EMAIL;

export type BaseFormField = {
  label: FieldTranslationLabel;
  label_suffix?: string;
  placeholder?: string;
  focus?: boolean;
  required?: boolean;
  disabled?: boolean;
};

export type SingleSelectFormFieldId = FieldIds.SORT | FieldIds.ACCOUNT | FieldIds.CATEGORY | FieldIds.CURRENCY | FieldIds.GENDER | FieldIds.SUBJECT;
export type SingleSelectFormField<T extends SingleSelectValue = SingleSelectValue, S extends SingleSelectFormFieldId = SingleSelectFormFieldId> = BaseFormField & {
  id: S;
  type: FieldTypes.SELECT;
  value: T;
  options: SelectOption<T>[];
  options_prefix?: string;
  showSearch?: boolean;
  multiple?: boolean;
};

export type MultiSelectFormFieldId = FieldIds.ACCOUNTS | FieldIds.CATEGORIES;
export type MultiSelectFormField = BaseFormField & {
  id: MultiSelectFormFieldId;
  type: FieldTypes.MULTISELECT;
  value: MultiSelectValue;
  options: SelectOption<MultiSelectOptionValue>[];
  options_prefix?: string;
  showSearch?: boolean;
  multiple?: boolean;
};

export type RadioButtonsFormFieldId = FieldIds.PERIOD;
export type RadioButtonsFormField = BaseFormField & {
  id: RadioButtonsFormFieldId;
  type: FieldTypes.RADIO_BUTTONS;
  value: string;
  options: Array<{ label?: string; label_translation: FieldTranslationRadioButtonOption; value: string }>;
};

export type FileFormFieldId = FieldIds.FILES;
export type FileFormField = BaseFormField & {
  id: FileFormFieldId;
  type: FieldTypes.FILE;
  value: UploadFile[];
  multiple?: boolean;
  maxCount?: number;
  accept?: string;
  maxSize?: number;
};

export type DateFormFieldId = FieldIds.DATE | FieldIds.BIRTHDATE;
export type DateFormField = BaseFormField & {
  id: DateFormFieldId;
  type: FieldTypes.DATE;
  picker: PickerPeriod;
  value: Dayjs | null;
  disabledDate?: (current: Dayjs) => boolean;
};

export type DatesPeriodFormFieldId = FieldIds.PERIOD;
export type DatesPeriodFormField = BaseFormField & {
  id: DatesPeriodFormFieldId;
  type: FieldTypes.DATES_PERIOD;
  value: DatesStrings;
};

export type TextFormFieldId = FieldIds.NAME | FieldIds.FULL_NAME | FieldIds.EMAIL | FieldIds.MESSAGE | FieldIds.PASSWORD;
export type TextFormFieldType = FieldTypes.TEXT | FieldTypes.PASSWORD | FieldTypes.EMAIL | FieldTypes.TEXTAREA;
export type TextFormField<I extends TextFormFieldId = TextFormFieldId, T extends TextFormFieldType = TextFormFieldType> = BaseFormField & {
  id: I;
  type: T;
  value: string;
  maxLength?: number;
};

export type NumberFormFieldId = FieldIds.AMOUNT | FieldIds.BALANCE;
// todo check value type
export type NumberFormField<I extends NumberFormFieldId = NumberFormFieldId> = BaseFormField & {
  id: I;
  type: FieldTypes.NUMBER;
  value: number | string;
};

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

export type FormValue = Exclude<FormField["value"], null> | RcFile[];

export type FormValues = Record<FieldId, FormValue>;

export interface DefaultFormSaveHandler {
  (formValues: FormValues): Promise<void>;
}

export interface DefaultFormProps {
  fields: FormField[];
  onSaveForm: DefaultFormSaveHandler;
  isResetAfterSave?: boolean;
  isVisible?: boolean;
  onResetForm?: () => void;
  onChange?: () => void;
}

// notice: createRef type with target component inner functions and variables
export interface DefaultFormRef {
  handleChangeFieldValue: (field: ChangedField) => void;
}
