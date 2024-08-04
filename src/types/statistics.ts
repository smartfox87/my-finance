import { DatesStrings } from "@/types/date";

export enum StatisticsTypes {
  ACCOUNTS = "accounts",
  COSTS = "costs",
  INCOMES = "incomes",
  BUDGETS = "budgets",
}

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
  accounts: number[];
}

export interface ProcessedStatisticsBudgetItem {
  amount: number;
  name: string;
  period: DatesStrings;
  categories: number[];
  accounts: number[];
}

export type CostsByMonthsStatisticsItem = {
  costsAmount: number;
  costsList: Record<string, number>;
};

export type CostsByMonthsStatistics = Record<string, CostsByMonthsStatisticsItem>;

export type CostIncomeStatisticsItem = {
  monthName: string;
  costs: number;
  costsList: Record<string, number>;
  incomes: number;
  incomesList: Record<string, number>;
};

export type BudgetsListStatisticsItem = {
  amount: number;
  costs: number;
};

export type BudgetsListStatistics = Record<string, BudgetsListStatisticsItem>;

export type CostsBudgetsStatisticsItem = {
  name: string;
  costs: number;
  budgets: number;
  budgetsList: BudgetsListStatistics;
};

export type CostsBudgetsStatisticsTooltipProps = {
  active?: boolean;
  payload?: {
    value: number;
    name: StatisticsTypes.COSTS | StatisticsTypes.BUDGETS;
    payload: CostsBudgetsStatisticsItem;
  }[];
};

export type IncomesCategoriesStatisticsItem = {
  name: string;
  value: number;
  accounts: Record<string, number>;
};

export type IncomesCategoriesStatistics = Record<string, IncomesCategoriesStatisticsItem>;

export type CostsCategoriesStatisticsItem = {
  name: string;
  value: number;
  accounts: Record<string, number>;
};

export type CostsCategoriesStatisticsTooltipProps = {
  active?: boolean;
  payload?: {
    value: number;
    name: string;
    payload: CostsCategoriesStatisticsItem;
  }[];
};
