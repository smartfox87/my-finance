import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import { createIncomeItemApi, getIncomesListApi, updateIncomeItemApi, deleteIncomeItemApi, getIncomeItemApi } from "@/api/incomes";
import { handleRejectedReducerAction } from "@/helpers/errors";
import { updateAccountBalanceThunk } from "@/store/slices/accountsSlice";
import { setFilterValue } from "@/helpers/filters";
import { rootReducer } from "@/store";
import { IncomeItem, IncomeItemData } from "@/types/incomes";
import { AppDispatch, RootState } from "@/types/store";
import { AccountItemBalanceData } from "@/types/accounts";
import { FilterItem, FilterPeriodStateItem, FilterState } from "@/types/filter";
import { FieldIds } from "@/types/field";
import { isDatesStrings } from "@/predicates/date";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export interface IncomesSliceState {
  incomesFilterValues: FilterState | null;
  incomesList: IncomeItem[] | null;
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
    getIncomesListThunk: create.asyncThunk<IncomeItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!params[FieldIds.PERIOD] || !isDatesStrings(params[FieldIds.PERIOD])) throw rejectWithValue("Period is required");
        const filter: FilterPeriodStateItem = { [FieldIds.PERIOD]: params[FieldIds.PERIOD] };
        const { data, error } = await getIncomesListApi(filter);
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
