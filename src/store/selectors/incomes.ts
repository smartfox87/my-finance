import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_INCOME_FIELDS, INITIAL_INCOMES_FILTER_FIELDS } from "@/constants/incomes";
import { selectIncomeCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { selectAccountsList } from "@/store/selectors/accounts";
import { FieldIds, FieldTypes } from "@/types/field";
import { LazyLoadedSlices } from "@/store";
import { checkAccountCondition, checkCategoryCondition, checkPeriodCondition } from "@/helpers/selectors";
import { getOptionsFromItemsList, getOptionsObjectFromOptions } from "@/helpers/selectors";

export const selectIncomesList = ({ incomes }: LazyLoadedSlices) => incomes?.incomesList || null;

export const selectIncomeItem = ({ incomes }: LazyLoadedSlices) => incomes?.incomeItem || null;

export const selectIncomesFilterValues = ({ incomes }: LazyLoadedSlices) => incomes?.incomesFilterValues || null;

export const selectIncomesByFilter = createSelector([selectIncomesList, selectIncomesFilterValues], (allIncomes, incomesFilterValues) =>
  allIncomes && incomesFilterValues
    ? allIncomes
        .slice()
        .filter(
          ({ date, category, account }) =>
            checkCategoryCondition(incomesFilterValues[FieldIds.CATEGORIES], category) &&
            checkPeriodCondition(incomesFilterValues[FieldIds.PERIOD], date) &&
            checkAccountCondition(incomesFilterValues[FieldIds.ACCOUNTS], account),
        )
        .sort((a, b) => {
          if (!incomesFilterValues[FieldIds.SORT]) return a.created_at.localeCompare(b.created_at);
          const [prop, order] = incomesFilterValues.sort.split("_");
          const [first, second] = order === "asc" ? [a, b] : [b, a];
          let difference = 0;
          if (prop === "amount") difference = first.amount - second.amount;
          else if (prop === "date") difference = first.date.localeCompare(second.date);
          else if (prop === "name") return first.name.localeCompare(second.name);
          return difference === 0 ? first.created_at.localeCompare(second.created_at) : difference;
        })
    : null,
);

export const selectIncomesFilterFields = createSelector([selectIncomeCategories, selectAccountsList], (incomeCategories, accountsList) =>
  INITIAL_INCOMES_FILTER_FIELDS.map((field) => {
    if (field.id === FieldIds.CATEGORIES && incomeCategories?.length) {
      const options = field.options.concat(getOptionsFromItemsList(incomeCategories));
      const optionsObject = getOptionsObjectFromOptions(options);
      return { ...field, optionsObject, options };
    } else if (field.id === FieldIds.ACCOUNTS && accountsList?.length) {
      const options = field.options.concat(getOptionsFromItemsList(accountsList));
      const optionsObject = getOptionsObjectFromOptions(options);
      return { ...field, optionsObject, options };
    } else if (field.type === FieldTypes.SELECT) {
      const optionsObject = getOptionsObjectFromOptions(field.options);
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
