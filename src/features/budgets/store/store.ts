import { createBudgetItemApi, getBudgetsListApi, updateBudgetItemApi, deleteBudgetItemApi, getBudgetItemApi } from "../api";
import { handleRejectedReducerAction } from "@/utils/handle-rejected-reducer-action";
import { rootReducer } from "@/store";
import { processBudgetItem } from "../utils";
import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import { type FilterItem, type FilterState, isFilterPeriodStateItem, setFilterValue } from "@/features/filter";
import type { BudgetItem, BudgetItemData, BudgetsSliceState, ProcessedBudgetItem } from "../types";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

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
        if (!isFilterPeriodStateItem(params)) throw rejectWithValue("Period is required");
        const { data, error } = await getBudgetsListApi(params);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.budgetsList = payload.map(processBudgetItem);
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
        rejected: handleRejectedReducerAction,
      },
    ),
    getBudgetItemThunk: create.asyncThunk<BudgetItem, string, { rejectValue: string }>(
      async (budgetId, { rejectWithValue }) => {
        const { data, error } = await getBudgetItemApi(budgetId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.budgetItem = processBudgetItem(payload);
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
        rejected: handleRejectedReducerAction,
      },
    ),
    deleteBudgetItemThunk: create.asyncThunk<BudgetItem, number, { rejectValue: string }>(
      async (budgetId, { rejectWithValue }) => {
        const { data, error } = await deleteBudgetItemApi(budgetId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state) => {
          state.budgetItem = null;
        },
      },
    ),
    setBudgetsFilterValues: create.reducer<FilterItem[]>((state, { payload }) => {
      state.budgetsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.budgetsFilterValues);
    }),
    setBudgetItem: create.reducer<ProcessedBudgetItem | null>((state, { payload }) => {
      state.budgetItem = payload;
    }),
  }),
});

declare module "@/types/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof budgetsSlice> {}
}

rootReducer.inject(budgetsSlice);

export const { setBudgetsFilterValues, setBudgetItem, getBudgetsListThunk, createBudgetItemThunk, getBudgetItemThunk, updateBudgetItemThunk, deleteBudgetItemThunk } = budgetsSlice.actions;
