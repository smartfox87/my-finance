import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { createCostItemApi, getCostsListApi, updateCostItemApi, deleteCostItemApi, getCostItemApi } from "@/api/costs";
import { handleRejectedReducerAction } from "@/helpers/errors";
import { updateAccountBalanceThunk } from "@/features/accounts";
import { setFilterValue } from "@/helpers/filters";
import { rootReducer } from "@/store";
import { isFilterPeriodStateItem } from "@/predicates/filter";
import type { CostItem, CostItemData, CostsSliceState } from "@/types/costs";
import type { FilterItem, FilterState } from "@/types/filter";
import type { WithSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/types/store";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: CostsSliceState = {
  costsFilterValues: null,
  costsList: null,
  costItem: null,
};

export const costsSlice = createAppSlice({
  name: "costs",
  initialState,
  reducers: (create) => ({
    getCostsListThunk: create.asyncThunk<CostItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!isFilterPeriodStateItem(params)) throw rejectWithValue("Period is required");
        const { data, error } = await getCostsListApi(params);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.costsList = payload;
        },
      },
    ),
    createCostItemThunk: create.asyncThunk<CostItem, CostItemData, { rejectValue: string }>(
      async (costData, { rejectWithValue, dispatch }) => {
        const { data, error } = await createCostItemApi(costData);
        if (error) throw rejectWithValue(error.message);
        dispatch(updateAccountBalanceThunk({ accountId: costData.account, decrease: costData.amount }));
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
      },
    ),
    getCostItemThunk: create.asyncThunk<CostItem, string, { rejectValue: string }>(
      async (costId, { rejectWithValue }) => {
        const { data, error } = await getCostItemApi(costId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.costItem = payload;
        },
      },
    ),
    updateCostItemThunk: create.asyncThunk<CostItem, { costId: number; costData: CostItemData }, { rejectValue: string }>(
      async ({ costId, costData }, thunkApi) => {
        const { data, error } = await updateCostItemApi({ costId, costData });
        if (error) throw thunkApi.rejectWithValue(error.message);
        const state = thunkApi.getState() as RootState;
        const dispatch = thunkApi.dispatch as AppDispatch;
        const costItem = state.costs?.costItem;
        if (!costItem) throw thunkApi.rejectWithValue("Cost item not found");
        if (costItem.account !== costData.account) {
          dispatch(updateAccountBalanceThunk({ accountId: costItem.account, increase: costItem.amount }));
          dispatch(updateAccountBalanceThunk({ accountId: costData.account, decrease: costData.amount }));
        } else {
          if (costItem.amount > costData.amount) dispatch(updateAccountBalanceThunk({ accountId: costData.account, increase: costItem.amount - costData.amount }));
          else if (costItem.amount < costData.amount) dispatch(updateAccountBalanceThunk({ accountId: costData.account, decrease: costData.amount - costItem.amount }));
        }
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
      },
    ),
    deleteCostItemThunk: create.asyncThunk<CostItem, number, { rejectValue: string }>(
      async (costId, thunkApi) => {
        const { data, error } = await deleteCostItemApi(costId);
        if (error) throw thunkApi.rejectWithValue(error.message);
        const state = thunkApi.getState() as RootState;
        const dispatch = thunkApi.dispatch as AppDispatch;
        const costItem = state.costs?.costItem;
        if (!costItem) throw thunkApi.rejectWithValue("Cost item not found");
        dispatch(updateAccountBalanceThunk({ accountId: costItem.account, increase: costItem.amount }));
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state) => {
          state.costItem = null;
        },
      },
    ),
    setCostsFilterValues: create.reducer<FilterItem[]>((state, { payload }) => {
      state.costsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.costsFilterValues);
    }),
    setCostItem: create.reducer<CostItem | null>((state, { payload }) => {
      state.costItem = payload;
    }),
  }),
});

declare module "@/types/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof costsSlice> {}
}

rootReducer.inject(costsSlice);

export const { setCostsFilterValues, setCostItem, getCostsListThunk, createCostItemThunk, getCostItemThunk, updateCostItemThunk, deleteCostItemThunk } = costsSlice.actions;
