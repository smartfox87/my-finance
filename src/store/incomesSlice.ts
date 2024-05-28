import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import { createIncomeItemApi, getIncomesListApi, updateIncomeItemApi, deleteIncomeItemApi, getIncomeItemApi } from "@/api/incomes";
import { handleRejected } from "@/helpers/processExtraReducersCases";
import { updateAccountBalanceThunk } from "@/store/accountsSlice";
import { setFilterValue } from "@/helpers/filters.js";
import { rootReducer } from "@/store";
import { IncomeItem, IncomeItemData, IncomesFilterValues, IncomesList } from "@/types/incomes";
import { AppDispatch, RootState } from "@/store";
import { AccountItemBalanceData } from "@/types/accounts";
import { FilterValues } from "@/types/filter";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export interface IncomesSliceState {
  incomesFilterValues: IncomesFilterValues | null;
  incomesList: IncomesList | null;
  incomeItem: IncomeItem | null;
}

const initialState: IncomesSliceState = {
  incomesFilterValues: null,
  incomesList: null,
  incomeItem: null,
};

export const incomesSlice = createAppSlice({
  name: "incomes",
  initialState,
  reducers: (create) => ({
    getIncomesListThunk: create.asyncThunk<IncomesList, IncomesFilterValues, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        const { data, error } = await getIncomesListApi(params);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
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
        rejected: handleRejected,
      },
    ),
    getIncomeItemThunk: create.asyncThunk<IncomeItem, string, { rejectValue: string }>(
      async (incomeId, { rejectWithValue }) => {
        const { data, error } = await getIncomeItemApi(incomeId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
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
        rejected: handleRejected,
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
        rejected: handleRejected,
      },
    ),
    setIncomesFilterValues: create.reducer<FilterValues>((state, { payload }) => {
      state.incomesFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.incomesFilterValues);
    }),
    setIncomeItem: create.reducer<IncomeItem>((state, { payload }) => {
      state.incomeItem = payload;
    }),
  }),
});

declare module "@/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof incomesSlice> {}
}

const injectedReducers = rootReducer.inject(incomesSlice);

export const { setIncomeItem, setIncomesFilterValues, getIncomesListThunk, createIncomeItemThunk, getIncomeItemThunk, updateIncomeItemThunk, deleteIncomeItemThunk } = incomesSlice.actions;
