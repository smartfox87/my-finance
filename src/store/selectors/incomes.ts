import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_INCOME_FIELDS, INITIAL_INCOMES_FILTER_FIELDS } from "@/constants/incomes";
import { selectIncomeCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { selectAccountsList } from "@/store/selectors/accounts";
import { LazyLoadedSlices } from "@/store";
import { sortItemsList, filterSingleItemsList, processFilterFields } from "@/helpers/selectors";

export const selectIncomesList = ({ incomes }: LazyLoadedSlices) => incomes?.incomesList || null;

export const selectIncomeItem = ({ incomes }: LazyLoadedSlices) => incomes?.incomeItem || null;

export const selectIncomesFilterValues = ({ incomes }: LazyLoadedSlices) => incomes?.incomesFilterValues || null;

export const selectIncomesByFilter = createSelector([selectIncomesList, selectIncomesFilterValues], (allIncomes, incomesFilterValues) =>
  allIncomes && incomesFilterValues ? sortItemsList(incomesFilterValues, filterSingleItemsList(incomesFilterValues, allIncomes)) : null,
);

export const selectIncomesFilterFields = createSelector([selectIncomeCategories, selectAccountsList], (incomeCategories, accountsList) =>
  processFilterFields(INITIAL_INCOMES_FILTER_FIELDS, incomeCategories, accountsList),
);

export const selectIncomeFields = createSelector([selectIncomeCategories, selectAccountsList, selectCurrency], (incomeCategories, accountsList, currency) =>
  INITIAL_INCOME_FIELDS.map((field) => {
    if (field.id === "category") return { ...field, options: field.options.concat(incomeCategories?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "account") return { ...field, options: field.options.concat(accountsList?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "amount") return { ...field, label_suffix: currency };
    else return field;
  }),
);
