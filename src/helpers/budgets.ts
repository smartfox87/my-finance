import { BudgetItem, ProcessedBudgetItem } from "@/types/budgets";
import { getPeriodDates } from "@/helpers/date";

export const processBudgetItem = (budgetItem: BudgetItem): ProcessedBudgetItem => ({
  ...budgetItem,
  accounts: budgetItem.accounts.map(({ id }) => id),
  categories: budgetItem.categories.map(({ id }) => id),
  period: getPeriodDates(budgetItem.period),
});
