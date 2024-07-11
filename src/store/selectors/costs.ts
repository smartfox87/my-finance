import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_COST_FIELDS, INITIAL_COSTS_FILTER_FIELDS } from "@/constants/costs";
import { selectCostCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { selectAccountsList } from "@/store/selectors/accounts";
import { FieldIds } from "@/types/field";
import { LazyLoadedSlices } from "@/store";
import { filterSingleItemsList, getOptionsFromItemsList, processFilterFields, sortItemsList } from "@/helpers/selectors";

export const selectCostsList = ({ costs }: LazyLoadedSlices) => costs?.costsList || null;

export const selectCostItem = ({ costs }: LazyLoadedSlices) => costs?.costItem || null;

export const selectCostsFilterValues = ({ costs }: LazyLoadedSlices) => costs?.costsFilterValues || null;

export const selectCostsByFilter = createSelector([selectCostsList, selectCostsFilterValues], (allCosts, costsFilterValues) =>
  costsFilterValues && allCosts ? sortItemsList(costsFilterValues, filterSingleItemsList(costsFilterValues, allCosts)) : null,
);

export const selectCostsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  processFilterFields(INITIAL_COSTS_FILTER_FIELDS, costCategories, accountsList),
);

export const selectCostFields = createSelector([selectCostCategories, selectAccountsList, selectCurrency], (costCategories, accountsList, currency) =>
  INITIAL_COST_FIELDS.map((field) => {
    if (field.id === FieldIds.CATEGORY) return { ...field, options: field.options.concat(getOptionsFromItemsList(costCategories || [])) };
    else if (field.id === FieldIds.ACCOUNT) return { ...field, options: field.options.concat(getOptionsFromItemsList(accountsList || [])) };
    else if (field.id === FieldIds.AMOUNT) return { ...field, label_suffix: currency };
    else return field;
  }),
);
