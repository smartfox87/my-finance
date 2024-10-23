import { getPeriodValuesFromJSON } from "@/features/fields";
import type { BudgetItem, ProcessedBudgetItem } from "../../types";

export const processBudgetItem = (budgetItem: BudgetItem): ProcessedBudgetItem => ({
  ...budgetItem,
  accounts: budgetItem.accounts.map(({ id }) => id),
  categories: budgetItem.categories.map(({ id }) => id),
  period: getPeriodValuesFromJSON(budgetItem.period),
});
