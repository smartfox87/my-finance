export interface IncomeItem {
  id: number;
  amount: number;
  date: string;
  account: number;
  category: number;
  name: string;
  created_at: string;
}

export interface IncomeItemData {
  amount: number;
  date: string;
  account: number;
  category: number;
  name: string;
}

export type IncomesList = IncomeItem[];

export interface IncomesFilterValues {
  period: [string, string];
}
