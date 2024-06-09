import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_BUDGETS_FILTER_FIELDS, INITIAL_BUDGET_FIELDS } from "@/initial-data/budgets.js";
import { selectCostCategories } from "@/store/selectors/references.js";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { selectAccountsList } from "@/store/selectors/accounts.js";
import { i18nRef } from "@/i18n";

export const selectBudgetsList = ({ budgets }) => budgets?.budgetsList || null;

export const selectBudgetItem = ({ budgets }) => budgets?.budgetItem || null;

export const selectBudgetsFilterValues = ({ budgets }) => budgets?.budgetsFilterValues || null;

const checkCategoryCondition = (filterCategory, budgetCategoryIds) => !budgetCategoryIds?.length || filterCategory.some((id) => budgetCategoryIds.includes(id)) || filterCategory.includes("all");
const checkPeriodCondition = ([fromDate, toDate], [start_date, end_date]) => start_date >= fromDate && end_date <= toDate;
const checkAccountCondition = (filterAccount, incomeAccountId) => filterAccount.includes(incomeAccountId) || filterAccount.includes("all");
export const selectBudgetsByFilter = createSelector(
  [selectBudgetsList, selectBudgetsFilterValues],
  (allBudgets, budgetsFilterValues) =>
    allBudgets
      ?.slice()
      .filter(
        ({ period, categories, accounts }) =>
          checkCategoryCondition(
            budgetsFilterValues.categories,
            categories.map(({ id }) => id),
          ) &&
          checkPeriodCondition(budgetsFilterValues.period, period) &&
          checkAccountCondition(budgetsFilterValues.accounts, accounts),
      )
      .sort((a, b) => {
        const [prop, order] = budgetsFilterValues.sort.split("_");
        const [first, second] = order === "asc" ? [a, b] : [b, a];
        if (prop === "amount") return first.amount - second.amount;
        else if (prop === "date") {
          const difference = first.period[0] - second.period[0];
          return difference === 0 ? first.created_at - second.created_at : difference;
        } else if (prop === "name") return first.name.localeCompare(second.name);
      }) || null,
);

export const selectBudgetsFilterFields = createSelector([selectCostCategories, selectAccountsList], (budgetCategories, accountsList) =>
  INITIAL_BUDGETS_FILTER_FIELDS.map((field) => {
    if (field.id === "categories" && budgetCategories?.length) {
      const options = field.options.concat(budgetCategories?.map(({ id, name }) => ({ value: id, label: name })));
      const optionsObject = options.reduce((acc, { value, label, label_translation }) => ({ ...acc, [value]: label_translation ? i18nRef.t(`fields.${label_translation}`) : label }), {});
      return { ...field, optionsObject, options };
    } else if (field.id === "accounts" && accountsList?.length) {
      const options = field.options.concat(accountsList?.map(({ id, name }) => ({ value: id, label: name })));
      const optionsObject = options.reduce((acc, { value, label, label_translation }) => ({ ...acc, [value]: label_translation ? i18nRef.t(`fields.${label_translation}`) : label }), {});
      return { ...field, optionsObject, options };
    } else if (field.type === "select") {
      const optionsObject = field.options.reduce((acc, { value, label, label_translation }) => ({ ...acc, [value]: label_translation ? i18nRef.t(`fields.${label_translation}`) : label }), {});
      return { ...field, optionsObject };
    } else {
      return field;
    }
  }),
);

export const selectBudgetFields = createSelector([selectAccountsList, selectCostCategories, selectCurrency], (accounts, costCategories, currency) =>
  INITIAL_BUDGET_FIELDS.map((field) => {
    if (field.id === "categories") return { ...field, options: field.options.concat(costCategories?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "accounts") return { ...field, options: field.options.concat(accounts?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "amount") return { ...field, label_suffix: currency };
    else return field;
  }),
);
