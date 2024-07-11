import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_COST_FIELDS, INITIAL_COSTS_FILTER_FIELDS } from "@/constants/costs";
import { selectCostCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { i18nRef } from "@/i18n";
import { selectAccountsList } from "@/store/selectors/accounts";
import { FieldIds, FieldTypes } from "@/types/field";
import { LazyLoadedSlices } from "@/store";
import { getOptionsFromItemsList, getOptionsObjectFromOptions } from "@/helpers/selectors";
import { checkSingleItemCondition, checkPeriodCondition } from "@/helpers/selectors";

export const selectCostsList = ({ costs }: LazyLoadedSlices) => costs?.costsList || null;

export const selectCostItem = ({ costs }: LazyLoadedSlices) => costs?.costItem || null;

export const selectCostsFilterValues = ({ costs }: LazyLoadedSlices) => costs?.costsFilterValues || null;

export const selectCostsByFilter = createSelector([selectCostsList, selectCostsFilterValues], (allCosts, costsFilterValues) =>
  costsFilterValues && allCosts
    ? allCosts
        .slice()
        .filter(
          ({ date, category, account }) =>
            checkSingleItemCondition(costsFilterValues[FieldIds.CATEGORIES], category) &&
            checkPeriodCondition(costsFilterValues[FieldIds.PERIOD], date) &&
            checkSingleItemCondition(costsFilterValues[FieldIds.ACCOUNTS], account),
        )
        .sort((a, b) => {
          if (!costsFilterValues[FieldIds.SORT]) return a.created_at.localeCompare(b.created_at);
          const [prop, order] = costsFilterValues[FieldIds.SORT].split("_");
          const [first, second] = order === "asc" ? [a, b] : [b, a];
          let difference = 0;
          if (prop === FieldIds.AMOUNT) difference = first.amount - second.amount;
          else if (prop === FieldIds.DATE) difference = first.date.localeCompare(second.date);
          else if (prop === FieldIds.NAME) return first.name.localeCompare(second.name);
          return difference === 0 ? first.created_at.localeCompare(second.created_at) : difference;
        })
    : null,
);

export const selectCostsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  INITIAL_COSTS_FILTER_FIELDS.map((field) => {
    if (field.id === FieldIds.CATEGORIES && costCategories?.length) {
      const options = field.options.concat(getOptionsFromItemsList(costCategories));
      const optionsObject = getOptionsObjectFromOptions(options);
      return { ...field, optionsObject, options };
    } else if (field.id === FieldIds.ACCOUNTS && accountsList?.length) {
      const options = field.options.concat(getOptionsFromItemsList(accountsList));
      const optionsObject = getOptionsObjectFromOptions(options);
      return { ...field, optionsObject, options };
    } else if (field.type === FieldTypes.SELECT) {
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
    if (field.id === FieldIds.CATEGORY) return { ...field, options: field.options.concat(getOptionsFromItemsList(costCategories || [])) };
    else if (field.id === FieldIds.ACCOUNT) return { ...field, options: field.options.concat(getOptionsFromItemsList(accountsList || [])) };
    else if (field.id === FieldIds.AMOUNT) return { ...field, label_suffix: currency };
    else return field;
  }),
);
