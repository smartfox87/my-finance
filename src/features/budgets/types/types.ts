import { FieldIds, FieldTypes } from "@/features/default-form";
import type { DatesStrings } from "@/features/default-form";
import type { DatesPeriodFormField, MultiSelectFormField, NumberFormField, TextFormField } from "@/features/default-form";
import type { FilterState } from "@/features/filter";

export interface BudgetItemData {
  [FieldIds.NAME]: string;
  [FieldIds.AMOUNT]: number;
  [FieldIds.PERIOD]: string;
  [FieldIds.ACCOUNTS]: number[];
  [FieldIds.CATEGORIES]: number[];
}

export interface BudgetItem {
  id: number;
  created_at: string;
  [FieldIds.NAME]: string;
  [FieldIds.AMOUNT]: number;
  [FieldIds.PERIOD]: string;
  [FieldIds.ACCOUNTS]: { id: number }[];
  [FieldIds.CATEGORIES]: { id: number }[];
}

export type ProcessedBudgetItem = {
  id: number;
  created_at: string;
  [FieldIds.NAME]: string;
  [FieldIds.AMOUNT]: number;
  [FieldIds.PERIOD]: DatesStrings;
  [FieldIds.ACCOUNTS]: number[];
  [FieldIds.CATEGORIES]: number[];
};

export type BudgetItemField = TextFormField<FieldIds.NAME, FieldTypes.TEXTAREA> | NumberFormField<FieldIds.AMOUNT> | DatesPeriodFormField | MultiSelectFormField;

export interface BudgetsSliceState {
  budgetsFilterValues: FilterState | null;
  budgetsList: ProcessedBudgetItem[] | null;
  budgetItem: ProcessedBudgetItem | null;
}
