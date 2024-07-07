import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import { createBudgetItemApi, getBudgetsListApi, updateBudgetItemApi, deleteBudgetItemApi, getBudgetItemApi } from "@/api/budgets";
import { handleRejected } from "@/helpers/processExtraReducersCases";
import { setFilterValue } from "@/helpers/filters.js";
import { getPeriodDates } from "@/helpers/date";
import { rootReducer } from "@/store";
import { BudgetItem, BudgetItemData } from "@/types/budgets";
import { FilterItem, FilterPeriodStateItem, FilterState } from "@/types/filter";
import { FieldIds } from "@/types/field";
import { isDatesStrings } from "@/types/date";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export interface BudgetsSliceState {
  budgetsFilterValues: FilterState | null;
  budgetsList: BudgetItem[] | null;
  budgetItem: BudgetItem | null;
}

const initialState: BudgetsSliceState = {
  budgetsFilterValues: null,
  budgetsList: null,
  budgetItem: null,
};

export const budgetsSlice = createAppSlice({
  name: "budgets",
  initialState,
  reducers: (create) => ({
    getBudgetsListThunk: create.asyncThunk<BudgetItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!params[FieldIds.PERIOD] || !isDatesStrings(params[FieldIds.PERIOD])) throw rejectWithValue("Period is required");
        const filter: FilterPeriodStateItem = { [FieldIds.PERIOD]: params[FieldIds.PERIOD] };
        const { data, error } = await getBudgetsListApi(filter);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.budgetsList = payload.map((budget) => ({ ...budget, period: getPeriodDates(budget.period) }));
        },
      },
    ),
    createBudgetItemThunk: create.asyncThunk<BudgetItem, BudgetItemData, { rejectValue: string }>(
      async (budgetData, { rejectWithValue }) => {
        const { data, error } = await createBudgetItemApi(budgetData);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
      },
    ),
    getBudgetItemThunk: create.asyncThunk<BudgetItem, string, { rejectValue: string }>(
      async (budgetId, { rejectWithValue }) => {
        const { data, error } = await getBudgetItemApi(budgetId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.budgetItem = { ...payload, period: getPeriodDates(payload.period) };
        },
      },
    ),
    updateBudgetItemThunk: create.asyncThunk<BudgetItem, { budgetId: number; budgetData: BudgetItemData }, { rejectValue: string }>(
      async ({ budgetId, budgetData }, { rejectWithValue }) => {
        const { data, error } = await updateBudgetItemApi({ budgetId, budgetData });
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
      },
    ),
    deleteBudgetItemThunk: create.asyncThunk<BudgetItem, number, { rejectValue: string }>(
      async (budgetId, { rejectWithValue }) => {
        const { data, error } = await deleteBudgetItemApi(budgetId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state) => {
          state.budgetItem = null;
        },
      },
    ),
    setBudgetsFilterValues: create.reducer<FilterItem[]>((state, { payload }) => {
      state.budgetsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.budgetsFilterValues);
    }),
    setBudgetItem: create.reducer<BudgetItem>((state, { payload }) => {
      state.budgetItem = payload;
    }),
  }),
});

declare module "@/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof budgetsSlice> {}
}

const injectedReducers = rootReducer.inject(budgetsSlice);

export const { setBudgetsFilterValues, setBudgetItem, getBudgetsListThunk, createBudgetItemThunk, getBudgetItemThunk, updateBudgetItemThunk, deleteBudgetItemThunk } = budgetsSlice.actions;
