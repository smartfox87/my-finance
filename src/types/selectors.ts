import { FieldIds } from "@/features/default-form";
import type { DatesPeriodFormField, MultiSelectFormField, SingleSelectFormField } from "@/features/default-form";

export type BasedFilterField = {
  label: string;
  optionsObject: Record<string, string>;
};

type ProcessedMultiSelectFilterField = MultiSelectFormField & BasedFilterField;

type ProcessedSingleSelectFilterField = SingleSelectFormField<FieldIds.SORT, string> & BasedFilterField;

export type ProcessedFilterField = ProcessedMultiSelectFilterField | ProcessedSingleSelectFilterField | DatesPeriodFormField;
