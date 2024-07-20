import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_COST_FIELDS, INITIAL_COSTS_FILTER_FIELDS } from "@/constants/costs";
import { selectCostCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { selectAccountsList } from "@/store/selectors/accounts";
import { FieldIds, FieldTypes } from "@/types/field";
import { LazyLoadedSlices } from "@/store";
import { filterSingleItemsList, getOptionsFromItemsList, processFilterFields, sortItemsList } from "@/helpers/selectors";
import { CostItemField } from "@/types/costs";
import dayjs from "dayjs";

export const selectCostsList = ({ costs }: LazyLoadedSlices) => costs?.costsList || null;

export const selectCostItem = ({ costs }: LazyLoadedSlices) => costs?.costItem || null;

export const selectCostsFilterValues = ({ costs }: LazyLoadedSlices) => costs?.costsFilterValues || null;

export const selectCostsByFilter = createSelector([selectCostsList, selectCostsFilterValues], (allCosts, costsFilterValues) =>
  costsFilterValues && allCosts ? sortItemsList(costsFilterValues, filterSingleItemsList(costsFilterValues, allCosts)) : null,
);

export const selectCostsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  processFilterFields(INITIAL_COSTS_FILTER_FIELDS, costCategories, accountsList),
);

export const selectCostFields = createSelector([selectCostCategories, selectAccountsList, selectCurrency, selectCostItem], (costCategories, accountsList, currency, costItem) =>
  INITIAL_COST_FIELDS.map((field): CostItemField => {
    if (field.type === FieldTypes.SELECT) {
      const value = costItem?.[field.id] ? costItem[field.id] : field.value;
      if (field.id === FieldIds.CATEGORY) return { ...field, value, options: field.options.concat(getOptionsFromItemsList(costCategories || [])) };
      else return { ...field, value, options: field.options.concat(getOptionsFromItemsList(accountsList || [])) };
    } else if (field.id === FieldIds.AMOUNT) {
      return { ...field, value: costItem?.[field.id] ? costItem[field.id] : field.value, label_suffix: currency };
    } else if (field.id === FieldIds.DATE) {
      return { ...field, value: costItem?.[field.id] ? dayjs(costItem[field.id]) : field.value };
    } else {
      return { ...field, value: costItem?.[field.id] ? costItem[field.id] : field.value };
    }
  }),
);
