import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { createBudgetItemApi, getBudgetsListApi, updateBudgetItemApi, deleteBudgetItemApi, getBudgetItemApi } from "@/api/budgets.js";
import { handleRejected } from "@/helpers/processExtraReducersCases.js";
import { setFilterValue } from "@/helpers/filters.js";
import { getPeriodDates } from "@/helpers/date";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const budgetsSlice = createAppSlice({
  name: "budgets",
  initialState: {
    budgetsFilterValues: {},
    budgetsList: null,
    budgetItem: null,
  },
  reducers: (create) => ({
    getBudgetsListThunk: create.asyncThunk(
      async (params, { rejectWithValue }) => {
        const { data, error } = await getBudgetsListApi(params);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.budgetsList = payload.map((budget) => ({ ...budget, period: getPeriodDates(budget.period) }));
        },
      },
    ),
    createBudgetItemThunk: create.asyncThunk(
      async (budgetData, { rejectWithValue }) => {
        const { data, error } = await createBudgetItemApi(budgetData);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
      },
    ),
    getBudgetItemThunk: create.asyncThunk(
      async (budgetId, { rejectWithValue }) => {
        const { data, error } = await getBudgetItemApi(budgetId);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.budgetItem = { ...payload, period: getPeriodDates(payload.period) };
        },
      },
    ),
    updateBudgetItemThunk: create.asyncThunk(
      async ({ budgetId, budgetData }, { rejectWithValue }) => {
        const { data, error } = await updateBudgetItemApi({ budgetId, budgetData });
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
      },
    ),
    deleteBudgetItemThunk: create.asyncThunk(
      async (budgetId, { rejectWithValue }) => {
        const { data, error } = await deleteBudgetItemApi(budgetId);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
      },
    ),
    setBudgetsFilterValues(state, { payload }) {
      state.budgetsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.budgetsFilterValues);
    },
    setBudgetItem(state, { payload }) {
      state.budgetItem = payload;
    },
  }),
});

export const { setBudgetsFilterValues, setBudgetItem, getBudgetsListThunk, createBudgetItemThunk, getBudgetItemThunk, updateBudgetItemThunk, deleteBudgetItemThunk } = budgetsSlice.actions;
