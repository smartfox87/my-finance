import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import { handleRejected } from "@/helpers/processExtraReducersCases";
import { getBudgetsListForChartsApi, getCostsListForChartsApi, getIncomesListForChartsApi } from "@/api/statistics";
import { setFilterValue } from "@/helpers/filters.js";
import { getPeriodDates } from "@/helpers/date";
import { rootReducer } from "@/store/index";
import { StatisticsBudgetsList, StatisticsCostsList, StatisticsFilterValues, StatisticsIncomesList } from "@/types/statistics";
import { FilterValues } from "@/types/filter";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export interface StatisticsSliceState {
  statisticsFilterValues: StatisticsFilterValues | {};
  costsListForCharts: StatisticsCostsList | null;
  incomesListForCharts: StatisticsIncomesList | null;
  budgetsListForCharts: StatisticsBudgetsList | null;
}

const initialState: StatisticsSliceState = {
  statisticsFilterValues: {},
  costsListForCharts: null,
  incomesListForCharts: null,
  budgetsListForCharts: null,
};

export const statisticsSlice = createAppSlice({
  name: "statistics",
  initialState,
  reducers: (create) => ({
    getCostsListForChartsThunk: create.asyncThunk<StatisticsCostsList, StatisticsFilterValues, { rejectValue: string }>(
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
    getIncomesListForChartsThunk: create.asyncThunk<StatisticsIncomesList, StatisticsFilterValues, { rejectValue: string }>(
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
    getBudgetsListForChartsThunk: create.asyncThunk<StatisticsBudgetsList, StatisticsFilterValues, { rejectValue: string }>(
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
    setStatisticsFilterValues: create.reducer<FilterValues>((state, { payload }) => {
      state.statisticsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.statisticsFilterValues);
    }),
  }),
});

declare module "@/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof statisticsSlice> {}
}

const injectedReducers = rootReducer.inject(statisticsSlice);

export const { setStatisticsFilterValues, getCostsListForChartsThunk, getIncomesListForChartsThunk, getBudgetsListForChartsThunk } = statisticsSlice.actions;
