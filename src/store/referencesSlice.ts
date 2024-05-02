import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import { handleRejected } from "@/helpers/processExtraReducersCases";
import { getAccountTypesApi, getCostCategoriesApi, getCurrenciesApi, getIncomeCategoriesApi } from "@/api/references";
import { rootReducer } from "@/store";
import { AccountTypes, CostCategories, Currencies, IncomeCategories } from "@/types/references";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

interface State {
  costCategories: CostCategories | null;
  accountTypes: AccountTypes | null;
  incomeCategories: IncomeCategories | null;
  currencies: Currencies | null;
}

const initialState: State = {
  costCategories: null,
  accountTypes: null,
  incomeCategories: null,
  currencies: null,
};

export const referencesSlice = createAppSlice({
  name: "references",
  initialState,
  reducers: (create) => ({
    getCostCategoriesThunk: create.asyncThunk<CostCategories, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getCostCategoriesApi();
        if (error) throw rejectWithValue(error.message);
        return data.map(({ id, cost_categories_translations }) => ({ id, name: cost_categories_translations[0].name }));
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.costCategories = payload;
        },
      },
    ),
    getAccountTypesThunk: create.asyncThunk<AccountTypes, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getAccountTypesApi();
        if (error) throw rejectWithValue(error.message);
        return data.map(({ id, user_id, general_name, account_types_translations }) => ({ id, user_id, name: account_types_translations?.[0]?.name || general_name }));
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.accountTypes = payload;
        },
      },
    ),
    getIncomeCategoriesThunk: create.asyncThunk<IncomeCategories, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getIncomeCategoriesApi();
        if (error) throw rejectWithValue(error.message);
        return data.map(({ id, user_id, general_name, income_categories_translations }) => ({ id, user_id, name: income_categories_translations?.[0]?.name || general_name }));
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.incomeCategories = payload;
        },
      },
    ),
    getCurrenciesThunk: create.asyncThunk<Currencies, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getCurrenciesApi();
        if (error) throw rejectWithValue(error.message);
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

declare module "@/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof referencesSlice> {}
}

const injectedReducers = rootReducer.inject(referencesSlice);

export const { getAccountTypesThunk, getCostCategoriesThunk, getCurrenciesThunk, getIncomeCategoriesThunk } = referencesSlice.actions;
