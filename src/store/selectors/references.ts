import { createSelector } from "@reduxjs/toolkit";
import type { LazyLoadedSlices } from "@/types/store";
import type { AccountType, AccountTypesObject, CostCategory, Currency, IncomeCategory } from "@/types/references";

export const selectCostCategories = ({ references }: LazyLoadedSlices): CostCategory[] | null => references?.costCategories || null;

export const selectAccountTypes = ({ references }: LazyLoadedSlices): AccountType[] | null => references?.accountTypes || null;

export const selectIncomeCategories = ({ references }: LazyLoadedSlices): IncomeCategory[] | null => references?.incomeCategories || null;

export const selectIncomeCategoriesObject = createSelector([selectIncomeCategories], (incomeCategories): Record<string, string> | null =>
  incomeCategories ? incomeCategories.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}) : null,
);

export const selectCostCategoriesObject = createSelector([selectCostCategories], (costCategories): Record<string, string> | null =>
  costCategories ? costCategories.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}) : null,
);

export const selectAccountTypesObject = createSelector([selectAccountTypes], (accountTypes): AccountTypesObject | null =>
  accountTypes ? accountTypes.reduce((acc, { id, user_id, name, general_name }) => ({ ...acc, [id]: { name: name || general_name, user_id } }), {}) : null,
);

export const selectCurrencies = ({ references }: LazyLoadedSlices): Currency[] | null => references?.currencies || null;
