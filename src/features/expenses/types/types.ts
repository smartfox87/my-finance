import { FieldIds, FieldTypes } from "@/types/field";
import type { FilterState } from "@/features/filter";
import type { DateFormField, NumberFormField, SingleSelectFormField, TextFormField } from "@/types/form";

export interface CostItem {
  id: number;
  created_at: string;
  [FieldIds.AMOUNT]: number;
  [FieldIds.DATE]: string;
  [FieldIds.ACCOUNT]: number;
  [FieldIds.CATEGORY]: number;
  [FieldIds.NAME]: string;
}

export interface CostItemData {
  [FieldIds.AMOUNT]: number;
  [FieldIds.DATE]: string;
  [FieldIds.ACCOUNT]: number;
  [FieldIds.CATEGORY]: number;
  [FieldIds.NAME]: string;
}

export type CostItemField =
  | TextFormField<FieldIds.NAME, FieldTypes.TEXTAREA>
  | NumberFormField<FieldIds.AMOUNT>
  | DateFormField<FieldIds.DATE>
  | SingleSelectFormField<FieldIds.ACCOUNT | FieldIds.CATEGORY>;

export interface CostsSliceState {
  costsFilterValues: FilterState | null;
  costsList: CostItem[] | null;
  costItem: CostItem | null;
}
