import { createSelector } from "@reduxjs/toolkit";
import { LazyLoadedSlices } from "@/store";
import { AccountTypesObject } from "@/types/references";

export const selectCostCategories = ({ references }: LazyLoadedSlices) => references?.costCategories || null;

export const selectAccountTypes = ({ references }: LazyLoadedSlices) => references?.accountTypes || null;

export const selectIncomeCategories = ({ references }: LazyLoadedSlices) => references?.incomeCategories || null;

export const selectIncomeCategoriesObject = createSelector([selectIncomeCategories], (incomeCategories): Record<string, string> | null =>
  incomeCategories ? incomeCategories.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}) : null,
);

export const selectCostCategoriesObject = createSelector([selectCostCategories], (costCategories): Record<string, string> | null =>
  costCategories ? costCategories.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}) : null,
);

// notice: convert array to object with saving types
export const selectAccountTypesObject = createSelector([selectAccountTypes], (accountTypes): AccountTypesObject | null =>
  accountTypes ? accountTypes.reduce((acc, { id, user_id, name, general_name }) => ({ ...acc, [id]: { name: name || general_name, user_id } }), {}) : null,
);
// accountTypes ? Object.assign({}, ...accountTypes.map(({ id, user_id, name, general_name }) => ({ [id]: { name: name || general_name, user_id } }))) : null,

export const selectCurrencies = ({ references }: LazyLoadedSlices) => references?.currencies || null;
