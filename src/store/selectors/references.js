import { createSelector } from "@reduxjs/toolkit";

export const selectCostCategories = ({ references }) => references?.costCategories || null;

export const selectAccountTypes = ({ references }) => references?.accountTypes || null;

export const selectIncomeCategories = ({ references }) => references?.incomeCategories || null;

export const selectIncomeCategoriesObject = createSelector([selectIncomeCategories], (incomeCategories) => incomeCategories?.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}) || {});

export const selectCostCategoriesObject = createSelector([selectCostCategories], (costCategories) => costCategories?.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}));

export const selectAccountTypesObject = createSelector([selectAccountTypes], (accountTypes) =>
  accountTypes?.reduce((acc, { id, user_id, name, general_name }) => ({ ...acc, [id]: { name: name || general_name, user_id } }), {}),
);

export const selectCurrencies = ({ references }) => references?.currencies || null;
