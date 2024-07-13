import { DatesPeriodFormField, MultiSelectFormField, SingleSelectFormField } from "@/types/form";
import { FieldIds } from "@/types/field";

export interface OptionsObject {
  [key: string]: string;
}

type ProcessedMultiSelectFilterField = MultiSelectFormField & {
  optionsObject: OptionsObject;
};

type ProcessedSingleSelectFilterField = SingleSelectFormField & {
  id: FieldIds.SORT;
  optionsObject: OptionsObject;
};

export type ProcessedFilterField = ProcessedMultiSelectFilterField | ProcessedSingleSelectFilterField | DatesPeriodFormField;
