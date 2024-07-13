import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_BUDGETS_FILTER_FIELDS, INITIAL_BUDGET_FIELDS } from "@/constants/budgets";
import { selectCostCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { selectAccountsList } from "@/store/selectors/accounts";
import { filterMultiItemsList, processFilterFields, sortItemsList } from "@/helpers/selectors";
import { LazyLoadedSlices } from "@/store";

export const selectBudgetsList = ({ budgets }: LazyLoadedSlices) => budgets?.budgetsList || null;

export const selectBudgetItem = ({ budgets }: LazyLoadedSlices) => budgets?.budgetItem || null;

export const selectBudgetsFilterValues = ({ budgets }: LazyLoadedSlices) => budgets?.budgetsFilterValues || null;

export const selectBudgetsByFilter = createSelector([selectBudgetsList, selectBudgetsFilterValues], (allBudgets, budgetsFilterValues) =>
  allBudgets && budgetsFilterValues ? sortItemsList(budgetsFilterValues, filterMultiItemsList(budgetsFilterValues, allBudgets)) : null,
);

export const selectBudgetsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  processFilterFields(INITIAL_BUDGETS_FILTER_FIELDS, costCategories, accountsList),
);

export const selectBudgetFields = createSelector([selectAccountsList, selectCostCategories, selectCurrency], (accounts, costCategories, currency) =>
  INITIAL_BUDGET_FIELDS.map((field) => {
    if (field.id === "categories") return { ...field, options: field.options.concat(costCategories?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "accounts") return { ...field, options: field.options.concat(accounts?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "amount") return { ...field, label_suffix: currency };
    else return field;
  }),
);
