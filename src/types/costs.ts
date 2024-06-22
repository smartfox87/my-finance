import { DatesStrings } from "@/types/date";

export interface CostItem {
  id: number;
  amount: number;
  date: string;
  account: number;
  category: number;
  name: string;
  created_at?: string;
}

export interface CostItemData {
  amount: number;
  date: string;
  account: number;
  category: number;
  name: string;
}

export type CostsList = CostItem[];

export interface CostsFilterValues {
  period: DatesStrings;
}
