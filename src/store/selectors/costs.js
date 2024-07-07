import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_COSTS_FILTER_FIELDS, INITIAL_COST_FIELDS } from "@/constants/costs";
import { selectCostCategories } from "@/store/selectors/references.js";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { i18nRef } from "@/i18n";
import { selectAccountsList } from "@/store/selectors/accounts.js";
import { FieldValues } from "@/types/field";

export const selectCostsList = ({ costs }) => costs?.costsList || null;

export const selectCostItem = ({ costs }) => costs?.costItem || null;

export const selectCostsFilterValues = ({ costs }) => costs?.costsFilterValues || null;

const checkCategoryCondition = (filterCategory, costCategoryId) => filterCategory.includes(costCategoryId) || filterCategory.includes(FieldValues.ALL);
const checkPeriodCondition = ([fromDate, toDate], date) => date >= fromDate && date <= toDate;
const checkAccountCondition = (filterAccount, incomeAccountId) => filterAccount.includes(incomeAccountId) || filterAccount.includes(FieldValues.ALL);
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
        let difference = 0;
        if (prop === "amount") difference = first.amount - second.amount;
        else if (prop === "date") difference = first.date.localeCompare(second.date);
        else if (prop === "name") return first.name.localeCompare(second.name);
        return difference === 0 ? first.created_at.localeCompare(second.created_at) : difference;
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
