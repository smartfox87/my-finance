import { DatesStrings } from "@/types/date";
import { FieldIds, FieldTypes } from "@/types/field";
import { DatesPeriodFormField, MultiSelectFormField, NumberFormField, TextFormField } from "@/types/form";

export interface BudgetItemData {
  [FieldIds.NAME]: string;
  [FieldIds.AMOUNT]: number;
  [FieldIds.PERIOD]: string;
  [FieldIds.ACCOUNTS]: number[];
  [FieldIds.CATEGORIES]: number[];
}

export interface BudgetItem {
  id: number;
  [FieldIds.NAME]: string;
  [FieldIds.AMOUNT]: number;
  [FieldIds.PERIOD]: string;
  [FieldIds.ACCOUNTS]: { id: number }[];
  [FieldIds.CATEGORIES]: { id: number }[];
  created_at: string;
}

export type ProcessedBudgetItem = {
  id: number;
  [FieldIds.NAME]: string;
  [FieldIds.AMOUNT]: number;
  [FieldIds.PERIOD]: DatesStrings;
  [FieldIds.ACCOUNTS]: number[];
  [FieldIds.CATEGORIES]: number[];
  created_at: string;
};

export type BudgetItemField = TextFormField<FieldIds.NAME, FieldTypes.TEXTAREA> | NumberFormField<FieldIds.AMOUNT> | DatesPeriodFormField | MultiSelectFormField;
