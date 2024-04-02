import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { handleRejected } from "@/helpers/processExtraReducersCases.js";
import { getBudgetsListForChartsApi, getCostsListForChartsApi, getIncomesListForChartsApi } from "@/api/statistics.js";
import { setFilterValue } from "@/helpers/filters.js";
import { getPeriodDates } from "@/helpers/date";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const statisticsSlice = createAppSlice({
  name: "statistics",
  initialState: {
    statisticsFilterValues: {},
    costsListForCharts: null,
    incomesListForCharts: null,
    budgetsListForCharts: null,
  },
  reducers: (create) => ({
    getCostsListForChartsThunk: create.asyncThunk(
      async (params, { rejectWithValue }) => {
        const { data, error } = await getCostsListForChartsApi(params);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.costsListForCharts = payload;
        },
      },
    ),
    getIncomesListForChartsThunk: create.asyncThunk(
      async (params, { rejectWithValue }) => {
        const { data, error } = await getIncomesListForChartsApi(params);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.incomesListForCharts = payload;
        },
      },
    ),
    getBudgetsListForChartsThunk: create.asyncThunk(
      async (params, { rejectWithValue }) => {
        const { data, error } = await getBudgetsListForChartsApi(params);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.budgetsListForCharts = payload.map((budget) => ({ ...budget, period: getPeriodDates(budget.period) }));
        },
      },
    ),
    setStatisticsFilterValues(state, { payload }) {
      state.statisticsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.statisticsFilterValues);
    },
    init() {},
  }),
});

export const { setStatisticsFilterValues, getCostsListForChartsThunk, getIncomesListForChartsThunk, getBudgetsListForChartsThunk } = statisticsSlice.actions;
