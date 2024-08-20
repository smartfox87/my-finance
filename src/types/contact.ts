import { FieldIds, FieldTypes } from "@/types/field";
import type { FileFormField, SingleSelectFormField, TextFormField } from "@/types/form";

export type ContactItemField =
  | TextFormField<FieldIds.FULL_NAME, FieldTypes.TEXT>
  | TextFormField<FieldIds.EMAIL, FieldTypes.EMAIL>
  | TextFormField<FieldIds.MESSAGE, FieldTypes.TEXTAREA>
  | SingleSelectFormField<FieldIds.SUBJECT, string>
  | FileFormField;
