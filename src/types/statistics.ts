import type { DatesStrings } from "@/types/date";
import type { FilterState } from "@/types/filter";

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

export type IncomesCategoriesStatisticsItem = {
  name: string;
  value: number;
  accounts: Record<string, number>;
};

export type CostsCategoriesStatisticsItem = {
  name: string;
  value: number;
  accounts: Record<string, number>;
};

export type ChartTooltipProps<
  N extends StatisticsTypes.COSTS | StatisticsTypes.INCOMES | StatisticsTypes.BUDGETS,
  P extends CostIncomeStatisticsItem | IncomesCategoriesStatisticsItem | CostsBudgetsStatisticsItem | CostsCategoriesStatisticsItem,
> = {
  active?: boolean;
  payload?: {
    value: number;
    name: N;
    payload: P;
  }[];
};

export type CostsIncomesStatisticsTooltipProps = ChartTooltipProps<StatisticsTypes.COSTS | StatisticsTypes.INCOMES, CostIncomeStatisticsItem>;

export type IncomesCategoriesStatisticsTooltipProps = ChartTooltipProps<StatisticsTypes.INCOMES, IncomesCategoriesStatisticsItem>;

export type CostsBudgetsStatisticsTooltipProps = ChartTooltipProps<StatisticsTypes.COSTS | StatisticsTypes.BUDGETS, CostsBudgetsStatisticsItem>;

export type CostsCategoriesStatisticsTooltipProps = ChartTooltipProps<StatisticsTypes.COSTS, CostsCategoriesStatisticsItem>;

export interface StatisticsSliceState {
  statisticsFilterValues: FilterState | null;
  costsListForCharts: StatisticsCostItem[] | null;
  incomesListForCharts: StatisticsIncomeItem[] | null;
  budgetsListForCharts: ProcessedStatisticsBudgetItem[] | null;
}
