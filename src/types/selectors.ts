import { DatesPeriodFormField, MultiSelectFormField, SingleSelectFormField } from "@/types/form";
import { FieldIds } from "@/types/field";

export type BasedFilterField = {
  label: string;
  optionsObject: Record<string, string>;
};

type ProcessedMultiSelectFilterField = MultiSelectFormField & BasedFilterField;

type ProcessedSingleSelectFilterField = SingleSelectFormField<FieldIds.SORT, string> & BasedFilterField;

export type ProcessedFilterField = ProcessedMultiSelectFilterField | ProcessedSingleSelectFilterField | DatesPeriodFormField;
