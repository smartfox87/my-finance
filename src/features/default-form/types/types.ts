import {
  type DateFormField,
  type DatesPeriodFormField,
  type FileFormField,
  type MultiSelectFormField,
  type NumberFormField,
  type RadioButtonsFormField,
  type SingleSelectFormField,
  type TextFormField,
  FieldId,
  FieldTypes,
} from "@/features/fields";
import type { RcFile } from "antd/es/upload";

export type FormItemRule = FieldTypes.NUMBER | FieldTypes.EMAIL;

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

export type FormValue = FormField["value"] | RcFile[];

export type FormValues = Record<FieldId, FormValue>;

export interface DefaultFormSaveHandler {
  (formValues: FormValues): Promise<void>;
}

export type FormFieldProps<F extends FormField> = {
  field: F;
  onChange(field: ChangedField): void;
  value?: FormValue;
};

export interface DefaultFormProps {
  fields: FormField[];
  "data-cy"?: string;
  onSaveForm: DefaultFormSaveHandler;
  isResetAfterSave?: boolean;
  onResetForm?: () => void;
  onChange?: () => void;
}

// notice: createRef type with target component inner functions and variables
export type DefaultFormRef = {
  handleChangeFieldValue: (field: ChangedField) => void;
};
