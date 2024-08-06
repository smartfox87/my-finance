import { MultiSelectFormFieldId } from "@/types/form";
import { FieldIds } from "@/types/field";

export const isMultiSelectFormFieldId = (id: string): id is MultiSelectFormFieldId => FieldIds.ACCOUNTS === id || FieldIds.CATEGORIES === id;
