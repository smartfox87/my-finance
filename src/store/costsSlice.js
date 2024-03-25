import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { createCostItemApi, getCostsListApi, updateCostItemApi, deleteCostItemApi, getCostItemApi } from "@/api/costs.js";
import { handleRejected } from "@/helpers/processExtraReducersCases.js";
import { updateAccountBalanceThunk } from "@/store/accountsSlice.js";
import { setFilterValue } from "@/helpers/filters.js";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const costsSlice = createAppSlice({
  name: "costs",
  initialState: {
    costsFilterValues: {},
    costsList: null,
    costItem: null,
  },
  reducers: (create) => ({
    getCostsListThunk: create.asyncThunk(
      async (params, { rejectWithValue }) => {
        const { data, error } = await getCostsListApi(params);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.costsList = payload;
        },
      },
    ),
    createCostItemThunk: create.asyncThunk(
      async (costData, { rejectWithValue, dispatch }) => {
        const { data, error } = await createCostItemApi(costData);
        if (error) return rejectWithValue(error.message);
        dispatch(updateAccountBalanceThunk({ accountId: costData.account, decrease: costData.amount }));
        return data;
      },
      {
        rejected: handleRejected,
      },
    ),
    getCostItemThunk: create.asyncThunk(
      async (costId, { rejectWithValue }) => {
        const { data, error } = await getCostItemApi(costId);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.costItem = payload;
        },
      },
    ),
    updateCostItemThunk: create.asyncThunk(
      async ({ costId, costData }, { rejectWithValue, getState, dispatch }) => {
        const { data, error } = await updateCostItemApi({ costId, costData });
        if (error) return rejectWithValue(error.message);
        const { costItem } = getState().costs;
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
    deleteCostItemThunk: create.asyncThunk(
      async (costId, { rejectWithValue, getState, dispatch }) => {
        try {
          const { data, error } = await deleteCostItemApi(costId);
          if (error) return rejectWithValue(error.message);
          const { costItem } = getState().costs;
          dispatch(updateAccountBalanceThunk({ accountId: costItem.account, increase: costItem.amount }));
          return data;
        } catch (e) {
          return rejectWithValue(e.message);
        }
      },
      {
        rejected: handleRejected,
      },
    ),
    setCostsFilterValues(state, { payload }) {
      state.costsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.costsFilterValues);
    },
    setCostItem(state, { payload }) {
      state.costItem = payload;
    },
  }),
});

export const { setCostsFilterValues, setCostItem, getCostsListThunk, createCostItemThunk, getCostItemThunk, updateCostItemThunk, deleteCostItemThunk } = costsSlice.actions;
