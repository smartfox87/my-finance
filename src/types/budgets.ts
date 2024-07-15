import { DatesStrings } from "@/types/date";
import { FieldIds } from "@/types/field";

export interface BudgetItemData {
  [FieldIds.NAME]: string;
  [FieldIds.AMOUNT]: number;
  [FieldIds.PERIOD]: string;
  [FieldIds.ACCOUNTS]: number[];
  [FieldIds.CATEGORIES]: number[];
}

export interface BudgetItem {
  id: number;
  name: string;
  amount: number;
  period: string;
  accounts: { id: number }[];
  categories: { id: number }[];
  created_at: string;
}

export interface ProcessedBudgetItem {
  id: number;
  name: string;
  amount: number;
  period: DatesStrings;
  accounts: number[];
  categories: number[];
  created_at: string;
}
