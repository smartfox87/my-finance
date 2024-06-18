import { FieldTypes, FormField } from "@/types/form";

export const INITIAL_ACCOUNT_FIELDS: FormField[] = [
  { id: "name", label_translation: "simple.name", value: "", maxLength: 200, type: FieldTypes.TEXT, required: true, focus: true },
  { id: "balance", label_translation: "simple.balance", value: "", type: FieldTypes.NUMBER, required: true },
];
