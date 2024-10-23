import { FieldIds } from "@/features/fields";
import type { CostItem } from "@/features/expenses";
import type { IncomeItem } from "@/features/incomes";
import type { ProcessedBudgetItem } from "@/features/budgets";
import type { FilterState } from "@/features/filter";

export const sortItemsList = <T extends CostItem | IncomeItem | ProcessedBudgetItem>(filterValues: FilterState, itemsList: T[]): T[] =>
  itemsList.sort((a, b) => {
    if (!filterValues[FieldIds.SORT]) return a.created_at.localeCompare(b.created_at);
    const [prop, order] = filterValues[FieldIds.SORT].split("_");
    const [first, second] = order === "asc" ? [a, b] : [b, a];
    let difference = 0;
    if (prop === FieldIds.AMOUNT) difference = first.amount - second.amount;
    else if (prop === FieldIds.DATE) {
      if (FieldIds.PERIOD in first && FieldIds.PERIOD in second) difference = first[FieldIds.PERIOD][0].localeCompare(second[FieldIds.PERIOD][0]);
      else if (FieldIds.DATE in first && FieldIds.DATE in second) difference = first.date.localeCompare(second.date);
    } else if (prop === FieldIds.NAME) return first.name.localeCompare(second.name);
    return difference === 0 ? first.created_at.localeCompare(second.created_at) : difference;
  });
