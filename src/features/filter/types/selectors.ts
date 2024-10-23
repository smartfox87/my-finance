import { type DatesPeriodFormField, type MultiSelectFormField, type SingleSelectFormField, FieldIds } from "@/features/fields";

export type BasedFilterField = {
  label: string;
  optionsObject: Record<string, string>;
};

type ProcessedMultiSelectFilterField = MultiSelectFormField & BasedFilterField;

type ProcessedSingleSelectFilterField = SingleSelectFormField<FieldIds.SORT, string> & BasedFilterField;

export type ProcessedFilterField = ProcessedMultiSelectFilterField | ProcessedSingleSelectFilterField | DatesPeriodFormField;
