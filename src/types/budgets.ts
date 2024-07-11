import { DatesStrings } from "@/types/date";

export interface BudgetItemData {
  name: string;
  amount: number;
  period: string;
  accounts: number[];
  categories: number[];
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
