import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_BUDGET_FIELDS, INITIAL_BUDGETS_FILTER_FIELDS } from "@/constants/budgets";
import { selectCostCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { selectAccountsList } from "@/store/selectors/accounts";
import { filterMultiItemsList, getOptionsFromItemsList, processFilterFields, sortItemsList } from "@/helpers/selectors";
import { LazyLoadedSlices } from "@/store";
import { FieldIds } from "@/types/field";

export const selectBudgetsList = ({ budgets }: LazyLoadedSlices) => budgets?.budgetsList || null;

export const selectBudgetItem = ({ budgets }: LazyLoadedSlices) => budgets?.budgetItem || null;

export const selectBudgetsFilterValues = ({ budgets }: LazyLoadedSlices) => budgets?.budgetsFilterValues || null;

export const selectBudgetsByFilter = createSelector([selectBudgetsList, selectBudgetsFilterValues], (allBudgets, budgetsFilterValues) =>
  allBudgets && budgetsFilterValues ? sortItemsList(budgetsFilterValues, filterMultiItemsList(budgetsFilterValues, allBudgets)) : null,
);

export const selectBudgetsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  processFilterFields(INITIAL_BUDGETS_FILTER_FIELDS, costCategories, accountsList),
);

export const selectBudgetFields = createSelector([selectAccountsList, selectCostCategories, selectCurrency], (accountsList, costCategories, currency) =>
  INITIAL_BUDGET_FIELDS.map((field) => {
    if (field.id === FieldIds.CATEGORIES) return { ...field, options: field.options.concat(getOptionsFromItemsList(costCategories || []) || []) };
    else if (field.id === FieldIds.ACCOUNTS) return { ...field, options: field.options.concat(getOptionsFromItemsList(accountsList || []) || []) };
    else if (field.id === FieldIds.AMOUNT) return { ...field, label_suffix: currency };
    else return field;
  }),
);
