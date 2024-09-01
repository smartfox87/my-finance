import { handleRejectedReducerAction } from "@/utils/errors";
import { getAccountTypesApi, getCostCategoriesApi, getCurrenciesApi, getIncomeCategoriesApi } from "@/api/references";
import { rootReducer } from "@/store";
import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import type { AccountType, CostCategory, Currency, IncomeCategory, ReferencesSliceState } from "@/types/references";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: ReferencesSliceState = {
  costCategories: null,
  accountTypes: null,
  incomeCategories: null,
  currencies: null,
};

export const referencesSlice = createAppSlice({
  name: "references",
  initialState,
  reducers: (create) => ({
    getCostCategoriesThunk: create.asyncThunk<CostCategory[], void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getCostCategoriesApi();
        if (error) throw rejectWithValue(error.message);
        return data.map(({ id, cost_categories_translations }) => ({ id, name: cost_categories_translations[0].name }));
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.costCategories = payload;
        },
      },
    ),
    getAccountTypesThunk: create.asyncThunk<AccountType[], void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getAccountTypesApi();
        if (error) throw rejectWithValue(error.message);
        return data.map(({ id, user_id, general_name, account_types_translations }) => ({ id, user_id, name: account_types_translations?.[0]?.name || general_name }));
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.accountTypes = payload;
        },
      },
    ),
    getIncomeCategoriesThunk: create.asyncThunk<IncomeCategory[], void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getIncomeCategoriesApi();
        if (error) throw rejectWithValue(error.message);
        return data.map(({ id, user_id, general_name, income_categories_translations }) => ({ id, user_id, name: income_categories_translations?.[0]?.name || general_name }));
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.incomeCategories = payload;
        },
      },
    ),
    getCurrenciesThunk: create.asyncThunk<Currency[], void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getCurrenciesApi();
        if (error) throw rejectWithValue(error.message);
        return data.sort(({ code }) => (["USD", "EUR", "RUB", "CAD"].includes(code) ? -1 : 1));
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.currencies = payload;
        },
      },
    ),
  }),
});

declare module "@/types/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof referencesSlice> {}
}

rootReducer.inject(referencesSlice);

export const { getAccountTypesThunk, getCostCategoriesThunk, getCurrenciesThunk, getIncomeCategoriesThunk } = referencesSlice.actions;
