export interface StatisticsCostItem {
  amount: number;
  date: string;
  account: number;
  category: number;
}

export type StatisticsCostsList = StatisticsCostItem[];

export interface StatisticsIncomeItem {
  amount: number;
  date: string;
  account: number;
  category: number;
}

export type StatisticsIncomesList = StatisticsIncomeItem[];

export interface StatisticsBudgetItem {
  amount: number;
  name: string;
  period: string;
  categories: number[];
}

export type StatisticsBudgetsList = StatisticsBudgetItem[];

export interface StatisticsFilterValues {
  period: [string, string];
}
