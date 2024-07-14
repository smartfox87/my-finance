import { createSelector } from "@reduxjs/toolkit";
import { selectCostCategories } from "@/store/selectors/references";
import { selectAccountsList } from "@/store/selectors/accounts";
import { INITIAL_STATISTICS_FILTER_FIELDS } from "@/constants/statistics";
import { LazyLoadedSlices } from "@/store";
import { processFilterFields, filterSingleItemsList, filterMultiItemsList } from "@/helpers/selectors";
import { isFilterStateKey } from "@/predicates/filter";

export const selectCostsListForCharts = ({ statistics }: LazyLoadedSlices) => statistics?.costsListForCharts || null;

export const selectBudgetsListForCharts = ({ statistics }: LazyLoadedSlices) => statistics?.budgetsListForCharts || null;

export const selectIncomesListForCharts = ({ statistics }: LazyLoadedSlices) => statistics?.incomesListForCharts || null;

export const selectStatisticsFilterValues = ({ statistics }: LazyLoadedSlices) => statistics?.statisticsFilterValues || null;

export const selectCostsListForChartsByFilter = createSelector([selectCostsListForCharts, selectStatisticsFilterValues], (costs, statisticsFilterValues) =>
  costs && statisticsFilterValues ? filterSingleItemsList(statisticsFilterValues, costs) : null,
);

export const selectIncomesListForChartsByFilter = createSelector([selectIncomesListForCharts, selectStatisticsFilterValues], (incomes, statisticsFilterValues) =>
  incomes && statisticsFilterValues ? filterSingleItemsList(statisticsFilterValues, incomes) : null,
);

export const selectBudgetsListForChartsByFilter = createSelector([selectBudgetsListForCharts, selectStatisticsFilterValues], (budgets, statisticsFilterValues) =>
  budgets && statisticsFilterValues ? filterMultiItemsList(statisticsFilterValues, budgets) : null,
);

export const selectStatisticsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  processFilterFields(INITIAL_STATISTICS_FILTER_FIELDS, costCategories, accountsList),
);

export const selectIsStatisticsFilterValuesChanged = createSelector(
  [selectStatisticsFilterValues],
  (filterValues) =>
    filterValues && Object.keys(filterValues).length && INITIAL_STATISTICS_FILTER_FIELDS.some(({ id, value }): boolean => isFilterStateKey(id) && filterValues[id]?.toString() !== value?.toString()),
);
