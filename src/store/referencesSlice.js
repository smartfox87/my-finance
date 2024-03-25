import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { handleRejected } from "@/helpers/processExtraReducersCases.js";
import { getAccountTypesApi, getBudgetYearsApi, getCostCategoriesApi, getCostYearsApi, getCurrenciesApi, getIncomeCategoriesApi } from "@/api/references.js";
import { setCostsFilterValues } from "@/store/costsSlice.js";
import { setBudgetsFilterValues } from "@/store/budgetsSlice.js";
import { findYearInResponseData } from "@/helpers/processData.js";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const referencesSlice = createAppSlice({
  name: "references",
  initialState: {
    costCategories: null,
    accountTypes: null,
    incomeCategories: null,
    costYears: null,
    budgetYears: null,
    currencies: null,
  },
  reducers: (create) => ({
    getCostCategoriesThunk: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getCostCategoriesApi();
        if (error) return rejectWithValue(error.message);
        return data.map(({ id, cost_categories_translations }) => ({ id, name: cost_categories_translations[0].name }));
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.costCategories = payload;
        },
      },
    ),
    getAccountTypesThunk: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getAccountTypesApi();
        if (error) return rejectWithValue(error.message);
        return data.map(({ id, user_id, general_name, account_types_translations }) => ({ id, user_id, name: account_types_translations?.[0]?.name || general_name }));
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.accountTypes = payload;
        },
      },
    ),
    getIncomeCategoriesThunk: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getIncomeCategoriesApi();
        if (error) return rejectWithValue(error.message);
        return data.map(({ id, user_id, general_name, income_categories_translations }) => ({ id, user_id, name: income_categories_translations?.[0]?.name || general_name }));
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.incomeCategories = payload;
        },
      },
    ),
    getCostYearsThunk: create.asyncThunk(
      async (_, { rejectWithValue, getState, dispatch }) => {
        const { data, error } = await getCostYearsApi();
        if (error) return rejectWithValue(error.message);
        const {
          costs: { costsFilterValues },
        } = getState();
        if (data?.length && (!costsFilterValues.year || !findYearInResponseData(data, costsFilterValues.year))) dispatch(setCostsFilterValues([{ id: "year", value: data[0].year }]));
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.costYears = payload;
        },
      },
    ),
    getBudgetYearsThunk: create.asyncThunk(
      async (_, { rejectWithValue, getState, dispatch }) => {
        const { data, error } = await getBudgetYearsApi();
        if (error) return rejectWithValue(error.message);
        const {
          budgets: { budgetsFilterValues },
        } = getState();
        if (data?.length && (!budgetsFilterValues.year || !findYearInResponseData(data, budgetsFilterValues.year))) dispatch(setBudgetsFilterValues([{ id: "year", value: data[0].year }]));
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.budgetYears = payload;
        },
      },
    ),
    getCurrenciesThunk: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getCurrenciesApi();
        if (error) return rejectWithValue(error.message);
        return data.sort(({ code }) => (["USD", "EUR", "RUB", "CAD"].includes(code) ? -1 : 1));
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.currencies = payload;
        },
      },
    ),
  }),
});

export const { getCostYearsThunk, getBudgetYearsThunk, getAccountTypesThunk, getIncomeCategoriesThunk } = referencesSlice.actions;
