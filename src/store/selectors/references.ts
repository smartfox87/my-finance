import { createSelector } from "@reduxjs/toolkit";
import { LazyLoadedSlices } from "@/store";

export const selectCostCategories = ({ references }: LazyLoadedSlices) => references?.costCategories || null;

export const selectAccountTypes = ({ references }: LazyLoadedSlices) => references?.accountTypes || null;

export const selectIncomeCategories = ({ references }: LazyLoadedSlices) => references?.incomeCategories || null;

export const selectIncomeCategoriesObject = createSelector([selectIncomeCategories], (incomeCategories) => incomeCategories?.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}) || {});

export const selectCostCategoriesObject = createSelector([selectCostCategories], (costCategories) => costCategories?.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}));

// notice: convert array to object with saving types
export const selectAccountTypesObject = createSelector([selectAccountTypes], (accountTypes) =>
  accountTypes ? Object.assign({}, ...accountTypes.map(({ id, user_id, name, general_name }) => ({ [id]: { name: name || general_name, user_id } }))) : null,
);

export const selectCurrencies = ({ references }: LazyLoadedSlices) => references?.currencies || null;
