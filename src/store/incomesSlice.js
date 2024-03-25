import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { createIncomeItemApi, getIncomesListApi, updateIncomeItemApi, deleteIncomeItemApi, getIncomeItemApi } from "@/api/incomes.js";
import { handleRejected } from "@/helpers/processExtraReducersCases.js";
import { updateAccountBalanceThunk } from "@/store/accountsSlice.js";
import { setFilterValue } from "@/helpers/filters.js";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const incomesSlice = createAppSlice({
  name: "incomes",
  initialState: {
    incomesFilterValues: {},
    incomesList: null,
    incomeItem: null,
  },
  reducers: (create) => ({
    getIncomesListThunk: create.asyncThunk(
      async (params, { rejectWithValue }) => {
        const { data, error } = await getIncomesListApi(params);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.incomesList = payload;
        },
      },
    ),
    createIncomeItemThunk: create.asyncThunk(
      async (incomeData, { rejectWithValue, dispatch }) => {
        const { data, error } = await createIncomeItemApi(incomeData);
        if (error) return rejectWithValue(error.message);
        if (data) {
          const { error } = await dispatch(updateAccountBalanceThunk({ accountId: incomeData.account, increase: incomeData.amount }));
          if (error) return rejectWithValue(error.message);
        }
        return data;
      },
      {
        rejected: handleRejected,
      },
    ),
    getIncomeItemThunk: create.asyncThunk(
      async (incomeId, { rejectWithValue }) => {
        const { data, error } = await getIncomeItemApi(incomeId);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.incomeItem = payload;
        },
      },
    ),
    updateIncomeItemThunk: create.asyncThunk(
      async ({ incomeId, incomeData }, { rejectWithValue, getState, dispatch }) => {
        const { data, error } = await updateIncomeItemApi({ incomeId, incomeData });
        if (error) return rejectWithValue(error.message);
        if (data) {
          const amountDifference = incomeData.amount - getState().incomes.incomesList.find(({ id }) => id === incomeId).amount;
          const newAccountData = { accountId: incomeData.account };
          if (amountDifference > 0) newAccountData.increase = amountDifference;
          else if (amountDifference < 0) newAccountData.decrease = -amountDifference;
          else return data;
          const { error } = await dispatch(updateAccountBalanceThunk(newAccountData));
          if (error) return rejectWithValue(error.message);
        }
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.incomesList = state.incomesList.map((income) => (income.id === payload.id ? payload : income));
        },
      },
    ),
    deleteIncomeItemThunk: create.asyncThunk(
      async (incomeId, { rejectWithValue, getState, dispatch }) => {
        try {
          const { data, error } = await deleteIncomeItemApi(incomeId);
          if (error) return rejectWithValue(error.message);
          if (data) {
            const incomeData = getState().incomes.incomesList.find(({ id }) => id === incomeId);
            const { error } = await dispatch(updateAccountBalanceThunk({ accountId: incomeData.account, decrease: incomeData.amount }));
            if (error) return rejectWithValue(error.message);
          }
          return data;
        } catch (e) {
          return rejectWithValue(e.message);
        }
      },
      {
        rejected: handleRejected,
      },
    ),
    setIncomesFilterValues(state, { payload }) {
      state.incomesFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.incomesFilterValues);
    },
    setIncomeItem(state, { payload }) {
      state.incomeItem = payload;
    },
  }),
});

export const { setIncomeItem, setIncomesFilterValues, getIncomesListThunk, createIncomeItemThunk, getIncomeItemThunk, updateIncomeItemThunk, deleteIncomeItemThunk } = incomesSlice.actions;
