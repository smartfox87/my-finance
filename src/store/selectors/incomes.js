import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_INCOMES_FILTER_FIELDS, INITIAL_INCOME_FIELDS } from "@/constants/incomes";
import { selectIncomeCategories } from "@/store/selectors/references.js";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { i18nRef } from "@/i18n";
import { selectAccountsList } from "@/store/selectors/accounts.js";
import { FieldValues } from "@/types/field.js";

export const selectIncomesList = ({ incomes }) => incomes?.incomesList || null;

export const selectIncomeItem = ({ incomes }) => incomes?.incomeItem || null;

export const selectIncomesFilterValues = ({ incomes }) => incomes?.incomesFilterValues || null;

const checkCategoryCondition = (filterCategory, incomeCategoryId) => filterCategory.includes(incomeCategoryId) || filterCategory.includes(FieldValues.ALL);
const checkAccountCondition = (filterAccount, incomeAccountId) => filterAccount.includes(incomeAccountId) || filterAccount.includes(FieldValues.ALL);
const checkPeriodCondition = ([fromDate, toDate], date) => date >= fromDate && date <= toDate;
export const selectIncomesByFilter = createSelector(
  [selectIncomesList, selectIncomesFilterValues],
  (allIncomes, incomesFilterValues) =>
    allIncomes
      ?.slice()
      .filter(
        ({ date, category, account }) =>
          checkCategoryCondition(incomesFilterValues.category, category) && checkPeriodCondition(incomesFilterValues.period, date) && checkAccountCondition(incomesFilterValues.account, account),
      )
      .sort((a, b) => {
        const [prop, order] = incomesFilterValues.sort.split("_");
        const [first, second] = order === "asc" ? [a, b] : [b, a];
        let difference = 0;
        if (prop === "amount") difference = first.amount - second.amount;
        else if (prop === "date") difference = first.date.localeCompare(second.date);
        else if (prop === "name") return first.name.localeCompare(second.name);
        return difference === 0 ? first.created_at.localeCompare(second.created_at) : difference;
      }) || null,
);

export const selectIncomesFilterFields = createSelector([selectIncomeCategories, selectAccountsList], (incomeCategories, accountsList) =>
  INITIAL_INCOMES_FILTER_FIELDS.map((field) => {
    if (field.id === "category" && incomeCategories?.length) {
      const options = field.options.concat(incomeCategories?.map(({ id, name }) => ({ value: id, label: name })));
      const optionsObject = options.reduce((acc, { value, label, label_translation }) => ({ ...acc, [value]: label_translation ? i18nRef.t(`fields.${label_translation}`) : label }), {});
      return { ...field, optionsObject, options };
    } else if (field.id === "account" && accountsList?.length) {
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

export const selectIncomeFields = createSelector([selectIncomeCategories, selectAccountsList, selectCurrency], (incomeCategories, accountsList, currency) =>
  INITIAL_INCOME_FIELDS.map((field) => {
    if (field.id === "category") return { ...field, options: field.options.concat(incomeCategories?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "account") return { ...field, options: field.options.concat(accountsList?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "amount") return { ...field, label_suffix: currency };
    else return field;
  }),
);
