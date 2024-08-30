import { getPeriodDates } from "@/helpers/date";
import type { BudgetItem, ProcessedBudgetItem } from "../types";

export const processBudgetItem = (budgetItem: BudgetItem): ProcessedBudgetItem => ({
  ...budgetItem,
  accounts: budgetItem.accounts.map(({ id }) => id),
  categories: budgetItem.categories.map(({ id }) => id),
  period: getPeriodDates(budgetItem.period),
});
