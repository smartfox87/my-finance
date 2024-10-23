import { type FileFormField, type SingleSelectFormField, type TextFormField, FieldIds, FieldTypes } from "@/features/fields";

export type ContactItemField =
  | TextFormField<FieldIds.FULL_NAME, FieldTypes.TEXT>
  | TextFormField<FieldIds.EMAIL, FieldTypes.EMAIL>
  | TextFormField<FieldIds.MESSAGE, FieldTypes.TEXTAREA>
  | SingleSelectFormField<FieldIds.SUBJECT, string>
  | FileFormField;
