import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { createCostItemApi, getCostsListApi, updateCostItemApi, deleteCostItemApi, getCostItemApi } from "@/api/costs";
import { handleRejected } from "@/helpers/processExtraReducersCases";
import { updateAccountBalanceThunk } from "@/store/accountsSlice";
import { setFilterValue } from "@/helpers/filters.js";
import type { WithSlice } from "@reduxjs/toolkit";
import { AppDispatch, rootReducer, RootState } from "@/store";
import { CostItem, CostItemData, CostsFilterValues, CostsList } from "@/types/costs";
import { FilterValues } from "@/types/filter";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export interface CostsSliceState {
  costsFilterValues: CostsFilterValues | null;
  costsList: CostsList | null;
  costItem: CostItem | null;
}

const initialState: CostsSliceState = {
  costsFilterValues: null,
  costsList: null,
  costItem: null,
};

export const costsSlice = createAppSlice({
  name: "costs",
  initialState,
  reducers: (create) => ({
    getCostsListThunk: create.asyncThunk<CostsList, CostsFilterValues, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        const { data, error } = await getCostsListApi(params);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
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
        rejected: handleRejected,
      },
    ),
    getCostItemThunk: create.asyncThunk<CostItem, string, { rejectValue: string }>(
      async (costId, { rejectWithValue }) => {
        const { data, error } = await getCostItemApi(costId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
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
        rejected: handleRejected,
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
        rejected: handleRejected,
      },
    ),
    setCostsFilterValues: create.reducer<FilterValues>((state, { payload }) => {
      state.costsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.costsFilterValues);
    }),
    setCostItem: create.reducer<CostItem>((state, { payload }) => {
      state.costItem = payload;
    }),
  }),
});

declare module "@/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof costsSlice> {}
}

const injectedReducers = rootReducer.inject(costsSlice);

export const { setCostsFilterValues, setCostItem, getCostsListThunk, createCostItemThunk, getCostItemThunk, updateCostItemThunk, deleteCostItemThunk } = costsSlice.actions;
