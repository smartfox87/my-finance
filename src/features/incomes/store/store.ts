import { createIncomeItemApi, getIncomesListApi, updateIncomeItemApi, deleteIncomeItemApi, getIncomeItemApi } from "../api";
import { handleRejectedReducerAction } from "@/utils/handle-rejected-reducer-action";
import { updateAccountBalanceThunk } from "@/store/slices/accounts";
import { setFilterValue } from "@/utils/filters";
import { rootReducer } from "@/store";
import { isFilterPeriodStateItem } from "@/predicates/filter";
import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import type { AccountItemBalanceData } from "@/types/accounts";
import type { AppDispatch, RootState } from "@/types/store";
import type { IncomeItem, IncomeItemData, IncomesSliceState } from "../types";
import type { FilterItem, FilterState } from "@/types/filter";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: IncomesSliceState = {
  incomesFilterValues: null,
  incomesList: null,
  incomeItem: null,
};

export const incomesSlice = createAppSlice({
  name: "incomes",
  initialState,
  reducers: (create) => ({
    getIncomesListThunk: create.asyncThunk<IncomeItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!isFilterPeriodStateItem(params)) throw rejectWithValue("Period is required");
        const { data, error } = await getIncomesListApi(params);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.incomesList = payload;
        },
      },
    ),
    createIncomeItemThunk: create.asyncThunk<IncomeItem, IncomeItemData, { rejectValue: string }>(
      async (incomeData, thunkApi) => {
        const { data, error } = await createIncomeItemApi(incomeData);
        if (error) throw thunkApi.rejectWithValue(error.message);
        if (data) {
          const dispatch = thunkApi.dispatch as AppDispatch;
          await dispatch(updateAccountBalanceThunk({ accountId: incomeData.account, increase: incomeData.amount }));
        }
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
      },
    ),
    getIncomeItemThunk: create.asyncThunk<IncomeItem, string, { rejectValue: string }>(
      async (incomeId, { rejectWithValue }) => {
        const { data, error } = await getIncomeItemApi(incomeId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.incomeItem = payload;
        },
      },
    ),
    updateIncomeItemThunk: create.asyncThunk<IncomeItem, { incomeId: number; incomeData: IncomeItemData }, { rejectValue: string }>(
      async ({ incomeId, incomeData }, thunkApi) => {
        const { data, error } = await updateIncomeItemApi({ incomeId, incomeData });
        if (error) throw thunkApi.rejectWithValue(error.message);
        if (data) {
          const state = thunkApi.getState() as RootState;
          const amountDifference = incomeData.amount - (state.incomes?.incomesList?.find(({ id }) => id === incomeId)?.amount || 0);
          const newAccountData: AccountItemBalanceData = { accountId: incomeData.account };
          if (amountDifference > 0) newAccountData.increase = amountDifference;
          else if (amountDifference < 0) newAccountData.decrease = -amountDifference;
          else return data;
          const dispatch = thunkApi.dispatch as AppDispatch;
          await dispatch(updateAccountBalanceThunk(newAccountData));
        }
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          if (Array.isArray(state.incomesList)) state.incomesList = state.incomesList.map((income) => (income.id === payload.id ? payload : income));
        },
      },
    ),
    deleteIncomeItemThunk: create.asyncThunk<IncomeItem | null, number, { rejectValue: string }>(
      async (incomeId, thunkApi) => {
        const { data, error } = await deleteIncomeItemApi(incomeId);
        if (error) throw thunkApi.rejectWithValue(error.message);
        if (data) {
          const state = thunkApi.getState() as RootState;
          const dispatch = thunkApi.dispatch as AppDispatch;
          const incomeData = state.incomes?.incomesList?.find(({ id }) => id === incomeId);
          if (incomeData) await dispatch(updateAccountBalanceThunk({ accountId: incomeData.account, decrease: incomeData.amount }));
        }
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state) => {
          state.incomeItem = null;
        },
      },
    ),
    setIncomesFilterValues: create.reducer<FilterItem[]>((state, { payload }) => {
      state.incomesFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.incomesFilterValues);
    }),
    setIncomeItem: create.reducer<IncomeItem | null>((state, { payload }) => {
      state.incomeItem = payload;
    }),
  }),
});

declare module "@/types/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof incomesSlice> {}
}

rootReducer.inject(incomesSlice);

export const { setIncomeItem, setIncomesFilterValues, getIncomesListThunk, createIncomeItemThunk, getIncomeItemThunk, updateIncomeItemThunk, deleteIncomeItemThunk } = incomesSlice.actions;
