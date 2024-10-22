import { checkSingleItemCondition } from "../check-single-item-condition";
import { checkPeriodCondition } from "../check-period-condition";
import { FieldIds } from "@/features/default-form";
import type { CostItem } from "@/features/expenses";
import type { IncomeItem } from "@/features/incomes";
import type { StatisticsCostItem, StatisticsIncomeItem } from "@/features/statistics";
import type { FilterState } from "@/features/filter";

export const filterSingleItemsList = <T extends CostItem | IncomeItem | StatisticsCostItem | StatisticsIncomeItem>(filterValues: FilterState, itemsList: T[]): T[] =>
  itemsList.filter(
    ({ date, category, account }) =>
      checkSingleItemCondition(filterValues[FieldIds.CATEGORIES], category) &&
      checkPeriodCondition(filterValues[FieldIds.PERIOD], date) &&
      checkSingleItemCondition(filterValues[FieldIds.ACCOUNTS], account),
  );
