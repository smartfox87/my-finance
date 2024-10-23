import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_BUDGET_FIELDS, INITIAL_BUDGETS_FILTER_FIELDS } from "../constants";
import { selectCostCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/features/profile";
import { selectAccountsList } from "@/store/selectors/accounts";
import { filterMultiItemsList, sortItemsList } from "@/utils/selectors";
import { FieldIds, FieldTypes } from "@/types/field";
import { type ProcessedFilterField, type FilterState, getOptionsFromItemsList, processFilterFields } from "@/features/filter";
import type { LazyLoadedSlices } from "@/types/store";
import type { BudgetItemField, ProcessedBudgetItem } from "../types";

export const selectBudgetsList = ({ budgets }: LazyLoadedSlices): ProcessedBudgetItem[] | null => budgets?.budgetsList || null;

export const selectBudgetItem = ({ budgets }: LazyLoadedSlices): ProcessedBudgetItem | null => budgets?.budgetItem || null;

export const selectBudgetsFilterValues = ({ budgets }: LazyLoadedSlices): FilterState | null => budgets?.budgetsFilterValues || null;

export const selectBudgetsByFilter = createSelector([selectBudgetsList, selectBudgetsFilterValues], (allBudgets, budgetsFilterValues): ProcessedBudgetItem[] | null =>
  allBudgets && budgetsFilterValues ? sortItemsList(budgetsFilterValues, filterMultiItemsList(budgetsFilterValues, allBudgets)) : null,
);

export const selectBudgetsAmount = createSelector([selectBudgetsByFilter], (filteredSortedBudgets): number => filteredSortedBudgets?.reduce((acc, { amount }) => acc + amount, 0) || 0);

export const selectBudgetsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList): ProcessedFilterField[] =>
  processFilterFields(INITIAL_BUDGETS_FILTER_FIELDS, costCategories, accountsList),
);

export const selectBudgetFields = createSelector(
  [selectAccountsList, selectCostCategories, selectCurrency, selectBudgetItem],
  (accountsList, costCategories, currency, budgetItem): BudgetItemField[] =>
    INITIAL_BUDGET_FIELDS.map((field): BudgetItemField => {
      if (field.type === FieldTypes.MULTISELECT) {
        const value = budgetItem?.[field.id] ? budgetItem[field.id] : field.value;
        if (field.id === FieldIds.CATEGORIES)
          return { ...field, value: Array.isArray(value) && value.length ? value : field.value, options: field.options.concat(getOptionsFromItemsList(costCategories || []) || []) };
        else return { ...field, value: Array.isArray(value) && value.length ? value : field.value, options: field.options.concat(getOptionsFromItemsList(accountsList || []) || []) };
      } else if (field.id === FieldIds.AMOUNT) {
        return { ...field, value: budgetItem?.[field.id] ? budgetItem[field.id] : field.value, label_suffix: currency };
      } else if (field.id === FieldIds.PERIOD) {
        return { ...field, value: budgetItem?.[field.id] ? budgetItem[field.id] : field.value };
      } else {
        return { ...field, value: budgetItem?.[field.id] ? budgetItem[field.id] : field.value };
      }
    }),
);
