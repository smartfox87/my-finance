export interface StatisticsCostItem {
  amount: number;
  date: string;
  account: number;
  category: number;
}

export interface StatisticsIncomeItem {
  amount: number;
  date: string;
  account: number;
  category: number;
}

export interface StatisticsBudgetItem {
  amount: number;
  name: string;
  period: string;
  categories: number[];
}
