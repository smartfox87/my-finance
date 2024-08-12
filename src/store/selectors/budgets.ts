import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_BUDGET_FIELDS, INITIAL_BUDGETS_FILTER_FIELDS } from "@/constants/budgets";
import { selectCostCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { selectAccountsList } from "@/store/selectors/accounts";
import { filterMultiItemsList, getOptionsFromItemsList, processFilterFields, sortItemsList } from "@/helpers/selectors";
import { LazyLoadedSlices } from "@/types/store";
import { FieldIds, FieldTypes } from "@/types/field";
import { BudgetItemField } from "@/types/budgets";

export const selectBudgetsList = ({ budgets }: LazyLoadedSlices) => budgets?.budgetsList || null;

export const selectBudgetItem = ({ budgets }: LazyLoadedSlices) => budgets?.budgetItem || null;

export const selectBudgetsFilterValues = ({ budgets }: LazyLoadedSlices) => budgets?.budgetsFilterValues || null;

export const selectBudgetsByFilter = createSelector([selectBudgetsList, selectBudgetsFilterValues], (allBudgets, budgetsFilterValues) =>
  allBudgets && budgetsFilterValues ? sortItemsList(budgetsFilterValues, filterMultiItemsList(budgetsFilterValues, allBudgets)) : null,
);

export const selectBudgetsAmount = createSelector([selectBudgetsByFilter], (filteredSortedBudgets) => filteredSortedBudgets?.reduce((acc, { amount }) => acc + amount, 0) || 0);

export const selectBudgetsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  processFilterFields(INITIAL_BUDGETS_FILTER_FIELDS, costCategories, accountsList),
);

export const selectBudgetFields = createSelector([selectAccountsList, selectCostCategories, selectCurrency, selectBudgetItem], (accountsList, costCategories, currency, budgetItem) =>
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
