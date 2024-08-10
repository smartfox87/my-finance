import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import { handleRejectedReducerAction } from "@/helpers/errors";
import { getBudgetsListForChartsApi, getCostsListForChartsApi, getIncomesListForChartsApi } from "@/api/statistics";
import { setFilterValue } from "@/helpers/filters";
import { getPeriodDates } from "@/helpers/date";
import { rootReducer } from "@/store";
import { ProcessedStatisticsBudgetItem, StatisticsBudgetItem, StatisticsCostItem, StatisticsIncomeItem } from "@/types/statistics";
import { FilterItem, FilterPeriodStateItem, FilterState } from "@/types/filter";
import { FieldIds } from "@/types/field";
import { isDatesStrings } from "@/predicates/date";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export interface StatisticsSliceState {
  statisticsFilterValues: FilterState | null;
  costsListForCharts: StatisticsCostItem[] | null;
  incomesListForCharts: StatisticsIncomeItem[] | null;
  budgetsListForCharts: ProcessedStatisticsBudgetItem[] | null;
}

const initialState: StatisticsSliceState = {
  statisticsFilterValues: null,
  costsListForCharts: null,
  incomesListForCharts: null,
  budgetsListForCharts: null,
};

export const statisticsSlice = createAppSlice({
  name: "statistics",
  initialState,
  reducers: (create) => ({
    getCostsListForChartsThunk: create.asyncThunk<StatisticsCostItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!(FieldIds.PERIOD in params) || !isDatesStrings(params[FieldIds.PERIOD])) throw rejectWithValue("Period is required");
        const filter: FilterPeriodStateItem = { [FieldIds.PERIOD]: params[FieldIds.PERIOD] };
        const { data, error } = await getCostsListForChartsApi(filter);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.costsListForCharts = payload;
        },
      },
    ),
    getIncomesListForChartsThunk: create.asyncThunk<StatisticsIncomeItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!(FieldIds.PERIOD in params) || !isDatesStrings(params[FieldIds.PERIOD])) throw rejectWithValue("Period is required");
        const filter: FilterPeriodStateItem = { [FieldIds.PERIOD]: params[FieldIds.PERIOD] };
        const { data, error } = await getIncomesListForChartsApi(filter);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.incomesListForCharts = payload;
        },
      },
    ),
    getBudgetsListForChartsThunk: create.asyncThunk<StatisticsBudgetItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!(FieldIds.PERIOD in params) || !isDatesStrings(params[FieldIds.PERIOD])) throw rejectWithValue("Period is required");
        const filter: FilterPeriodStateItem = { [FieldIds.PERIOD]: params[FieldIds.PERIOD] };
        const { data, error } = await getBudgetsListForChartsApi(filter);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.budgetsListForCharts = payload.map((budget) => ({ ...budget, period: getPeriodDates(budget.period) }));
        },
      },
    ),
    setStatisticsFilterValues: create.reducer<FilterItem[]>((state, { payload }) => {
      state.statisticsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.statisticsFilterValues);
    }),
  }),
});

declare module "@/types/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof statisticsSlice> {}
}

const injectedReducers = rootReducer.inject(statisticsSlice);

export const { setStatisticsFilterValues, getCostsListForChartsThunk, getIncomesListForChartsThunk, getBudgetsListForChartsThunk } = statisticsSlice.actions;
