import { type MultiSelectFormFieldId, FieldIds } from "../types";

export const isMultiSelectFormFieldId = (id: string): id is MultiSelectFormFieldId => FieldIds.ACCOUNTS === id || FieldIds.CATEGORIES === id;
