import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_COSTS_FILTER_FIELDS, INITIAL_COST_FIELDS } from "@/initial-data/costs.js";
import { selectCostCategories } from "@/store/selectors/references.js";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { i18nRef } from "@/i18n";
import { selectAccountsList } from "@/store/selectors/accounts.js";

export const selectCostsList = ({ costs }) => costs?.costsList || null;

export const selectCostItem = ({ costs }) => costs?.costItem || null;

export const selectCostsFilterValues = ({ costs }) => costs?.costsFilterValues || null;

const checkCategoryCondition = (filterCategory, costCategoryId) => filterCategory.includes(costCategoryId) || filterCategory.includes("all");
const checkPeriodCondition = ([fromDate, toDate], date) => date >= fromDate && date <= toDate;
const checkAccountCondition = (filterAccount, incomeAccountId) => filterAccount.includes(incomeAccountId) || filterAccount.includes("all");
export const selectCostsByFilter = createSelector(
  [selectCostsList, selectCostsFilterValues],
  (allCosts, costsFilterValues) =>
    allCosts
      ?.slice()
      .filter(
        ({ date, category, account }) =>
          checkCategoryCondition(costsFilterValues.category, category) && checkPeriodCondition(costsFilterValues.period, date) && checkAccountCondition(costsFilterValues.account, account),
      )
      .sort((a, b) => {
        const [prop, order] = costsFilterValues.sort.split("_");
        const [first, second] = order === "asc" ? [a, b] : [b, a];
        if (prop === "amount") return first.amount - second.amount;
        else if (prop === "date") {
          const difference = first.date - second.date;
          return difference === 0 ? first.created_at - second.created_at : difference;
        } else if (prop === "name") return first.name.toLowerCase().localeCompare(second.name.toLowerCase());
      }) || null,
);

export const selectCostsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  INITIAL_COSTS_FILTER_FIELDS.map((field) => {
    if (field.id === "category" && costCategories?.length) {
      const options = field.options.concat(costCategories?.map(({ id, name }) => ({ value: id, label: name })));
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

export const selectCostFields = createSelector([selectCostCategories, selectAccountsList, selectCurrency], (costCategories, accountsList, currency) =>
  INITIAL_COST_FIELDS.map((field) => {
    if (field.id === "category") return { ...field, options: field.options.concat(costCategories?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "account") return { ...field, options: field.options.concat(accountsList?.map(({ id, name }) => ({ value: id, label: name })) || []) };
    else if (field.id === "amount") return { ...field, label_suffix: currency };
    else return field;
  }),
);
