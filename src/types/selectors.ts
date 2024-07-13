import { DatesPeriodFormField, MultiSelectFormField, SingleSelectFormField } from "@/types/form";
import { FieldIds } from "@/types/field";

export interface OptionsObject {
  [key: string]: string;
}

interface ProcessedMultiSelectFilterField extends MultiSelectFormField {
  optionsObject: OptionsObject;
}

interface ProcessedSingleSelectFilterField extends SingleSelectFormField {
  id: FieldIds.SORT;
  optionsObject: OptionsObject;
}

// type ProcessedMultiSelectFilterField = MultiSelectFormField & {
//   optionsObject: OptionsObject;
// };

// type ProcessedSingleSelectFilterField = SingleSelectFormField & {
//   optionsObject: OptionsObject;
// };

export type ProcessedFilterField = ProcessedMultiSelectFilterField | ProcessedSingleSelectFilterField | DatesPeriodFormField;
