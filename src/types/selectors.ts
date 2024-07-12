import { DatesPeriodFormField, FormField, MultiSelectFormField, SingleSelectFormField } from "@/types/form";

export type FilterField = MultiSelectFormField | SingleSelectFormField | DatesPeriodFormField;

export interface OptionsObject {
  [key: number]: string;
}

type ProcessedMultiSelectFilterField = MultiSelectFormField & {
  optionsObject: OptionsObject;
};

type ProcessedSingleSelectFilterField = SingleSelectFormField & {
  optionsObject: OptionsObject;
};

export type ProcessedFilterField = ProcessedMultiSelectFilterField | ProcessedSingleSelectFilterField | DatesPeriodFormField;
