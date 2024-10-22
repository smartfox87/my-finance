import { checkMultiItemCondition, checkPeriodsCondition } from "@/utils/selectors";
import { FieldIds } from "@/types/field";
import type { ProcessedBudgetItem } from "@/features/budgets";
import type { ProcessedStatisticsBudgetItem } from "@/features/statistics";
import type { FilterState } from "@/types/filter";

export const filterMultiItemsList = <T extends ProcessedBudgetItem | ProcessedStatisticsBudgetItem>(filterValues: FilterState, itemsList: T[]): T[] =>
  itemsList.filter(
    ({ period, categories, accounts }) =>
      checkMultiItemCondition(filterValues[FieldIds.CATEGORIES], categories) &&
      checkPeriodsCondition(filterValues[FieldIds.PERIOD], period) &&
      checkMultiItemCondition(filterValues[FieldIds.ACCOUNTS], accounts),
  );
