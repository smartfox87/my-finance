import { FieldIds } from "@/types/field";
import type { MultiSelectFormFieldId } from "@/types/form";

export const isMultiSelectFormFieldId = (id: string): id is MultiSelectFormFieldId => FieldIds.ACCOUNTS === id || FieldIds.CATEGORIES === id;
