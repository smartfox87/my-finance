import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_COSTS_FILTER_FIELDS, INITIAL_COST_FIELDS } from "@/constants/costs";
import { selectCostCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { i18nRef } from "@/i18n";
import { selectAccountsList } from "@/store/selectors/accounts";
import { FieldIds, FieldValues, MultiSelectValue, SelectFieldOption } from "@/types/field";
import { LazyLoadedSlices } from "@/store";
import { DatesStrings } from "@/types/date";
import { getOptionsFromAccountsList, getOptionsFromCostCategories, getOptionsObjectFromOptions } from "@/helpers/filters";

export const selectCostsList = ({ costs }: LazyLoadedSlices) => costs?.costsList || null;

export const selectCostItem = ({ costs }: LazyLoadedSlices) => costs?.costItem || null;

export const selectCostsFilterValues = ({ costs }: LazyLoadedSlices) => costs?.costsFilterValues || null;

const checkCategoryCondition = (filterCategory: MultiSelectValue, costCategoryId: number): boolean => filterCategory.includes(costCategoryId) || filterCategory.includes(FieldValues.ALL);
const checkPeriodCondition = ([fromDate, toDate]: DatesStrings, date: string): boolean => date >= fromDate && date <= toDate;
const checkAccountCondition = (filterAccount: MultiSelectValue, costAccountId: number): boolean => filterAccount.includes(costAccountId) || filterAccount.includes(FieldValues.ALL);
export const selectCostsByFilter = createSelector([selectCostsList, selectCostsFilterValues], (allCosts, costsFilterValues) =>
  costsFilterValues && allCosts
    ? allCosts
        .slice()
        .filter(
          ({ date, category, account }) =>
            FieldIds.CATEGORIES in costsFilterValues &&
            checkCategoryCondition(costsFilterValues[FieldIds.CATEGORIES]!, category) &&
            FieldIds.PERIOD in costsFilterValues &&
            checkPeriodCondition(costsFilterValues[FieldIds.PERIOD]!, date) &&
            FieldIds.ACCOUNTS in costsFilterValues &&
            checkAccountCondition(costsFilterValues[FieldIds.ACCOUNTS]!, account),
        )
        .sort((a, b) => {
          const [prop, order] = costsFilterValues[FieldIds.SORT].split("_");
          const [first, second] = order === "asc" ? [a, b] : [b, a];
          let difference = 0;
          if (prop === "amount") difference = first.amount - second.amount;
          else if (prop === "date") difference = first.date.localeCompare(second.date);
          else if (prop === "name") return first.name.localeCompare(second.name);
          return difference === 0 ? first.created_at.localeCompare(second.created_at) : difference;
        })
    : null,
);

export const selectCostsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  INITIAL_COSTS_FILTER_FIELDS.map((field) => {
    if (field.id === FieldIds.CATEGORIES && costCategories?.length) {
      const options = field.options.concat(getOptionsFromCostCategories(costCategories));
      const optionsObject = getOptionsObjectFromOptions(options);
      return { ...field, optionsObject, options };
    } else if (field.id === FieldIds.ACCOUNTS && accountsList?.length) {
      const options = field.options.concat(getOptionsFromAccountsList(accountsList));
      const optionsObject = getOptionsObjectFromOptions(options);
      return { ...field, optionsObject, options };
    } else if (field.type === "select") {
      const optionsObject = field.options.reduce(
        (acc, { value, label, label_translation }) => ({ ...acc, [value]: label_translation && i18nRef.t ? i18nRef.t(`fields.${label_translation}`) : label }),
        {},
      );
      return { ...field, optionsObject };
    } else {
      return field;
    }
  }),
);

export const selectCostFields = createSelector([selectCostCategories, selectAccountsList, selectCurrency], (costCategories, accountsList, currency) =>
  INITIAL_COST_FIELDS.map((field) => {
    if (field.id === "category") return { ...field, options: field.options.concat(costCategories?.map(({ id, name }): SelectFieldOption => ({ value: id, label: name })) || []) };
    else if (field.id === "account") return { ...field, options: field.options.concat(accountsList?.map(({ id, name }): SelectFieldOption => ({ value: id, label: name })) || []) };
    else if (field.id === "amount") return { ...field, label_suffix: currency };
    else return field;
  }),
);
