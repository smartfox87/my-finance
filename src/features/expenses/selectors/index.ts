import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_COST_FIELDS, INITIAL_COSTS_FILTER_FIELDS } from "../constants";
import { selectCostCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { selectAccountsList } from "@/features/accounts";
import { filterSingleItemsList, getOptionsFromItemsList, processFilterFields, sortItemsList } from "@/helpers/selectors";
import dayjs from "dayjs";
import { FieldIds, FieldTypes } from "@/types/field";
import type { CostItem, CostItemField } from "../types";
import type { LazyLoadedSlices } from "@/types/store";
import type { FilterState } from "@/types/filter";
import type { ProcessedFilterField } from "@/types/selectors";

export const selectCostsList = ({ costs }: LazyLoadedSlices): CostItem[] | null => costs?.costsList || null;

export const selectCostItem = ({ costs }: LazyLoadedSlices): CostItem | null => costs?.costItem || null;

export const selectCostsFilterValues = ({ costs }: LazyLoadedSlices): FilterState | null => costs?.costsFilterValues || null;

export const selectCostsByFilter = createSelector([selectCostsList, selectCostsFilterValues], (allCosts, costsFilterValues) =>
  costsFilterValues && allCosts ? sortItemsList(costsFilterValues, filterSingleItemsList(costsFilterValues, allCosts)) : null,
);

export const selectExpensesTotal = createSelector([selectCostsByFilter], (filteredSortedCosts): number => filteredSortedCosts?.reduce((acc, { amount }) => acc + amount, 0) || 0);

export const selectCostsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList): ProcessedFilterField[] =>
  processFilterFields(INITIAL_COSTS_FILTER_FIELDS, costCategories, accountsList),
);

export const selectCostFields = createSelector([selectCostCategories, selectAccountsList, selectCurrency, selectCostItem], (costCategories, accountsList, currency, costItem): CostItemField[] =>
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
