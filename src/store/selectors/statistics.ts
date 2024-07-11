import { createSelector } from "@reduxjs/toolkit";
import { selectCostCategories } from "@/store/selectors/references";
import { selectAccountsList } from "@/store/selectors/accounts";
import { INITIAL_STATISTICS_FILTER_FIELDS } from "@/constants/statistics";
import { FieldIds } from "@/types/field";
import { LazyLoadedSlices } from "@/store";
import { isFilterStateKey } from "@/types/filter";
import { checkAccountCondition, checkAccountsCondition, checkCategoriesCondition, checkCategoryCondition, checkPeriodCondition, checkPeriodsCondition } from "@/helpers/selectors";
import { getOptionsFromItemsList, getOptionsObjectFromOptions } from "@/helpers/selectors";

export const selectCostsListForCharts = ({ statistics }: LazyLoadedSlices) => statistics?.costsListForCharts || null;

export const selectBudgetsListForCharts = ({ statistics }: LazyLoadedSlices) => statistics?.budgetsListForCharts || null;

export const selectIncomesListForCharts = ({ statistics }: LazyLoadedSlices) => statistics?.incomesListForCharts || null;

export const selectStatisticsFilterValues = ({ statistics }: LazyLoadedSlices) => statistics?.statisticsFilterValues || null;

export const selectCostsListForChartsByFilter = createSelector([selectCostsListForCharts, selectStatisticsFilterValues], (costs, statisticsFilterValues) =>
  costs && statisticsFilterValues
    ? costs
        .slice()
        .filter(
          ({ date, category, account }) =>
            checkCategoryCondition(statisticsFilterValues[FieldIds.CATEGORIES], category) &&
            checkPeriodCondition(statisticsFilterValues[FieldIds.PERIOD], date) &&
            checkAccountCondition(statisticsFilterValues[FieldIds.ACCOUNTS], account),
        )
    : null,
);

export const selectIncomesListForChartsByFilter = createSelector([selectIncomesListForCharts, selectStatisticsFilterValues], (incomes, statisticsFilterValues) =>
  incomes && statisticsFilterValues
    ? incomes
        .slice()
        .filter(
          ({ date, category, account }) =>
            checkCategoryCondition(statisticsFilterValues[FieldIds.CATEGORIES], category) &&
            checkPeriodCondition(statisticsFilterValues[FieldIds.PERIOD], date) &&
            checkAccountCondition(statisticsFilterValues[FieldIds.ACCOUNTS], account),
        )
    : null,
);

export const selectBudgetsListForChartsByFilter = createSelector([selectBudgetsListForCharts, selectStatisticsFilterValues], (budgets, statisticsFilterValues) =>
  budgets && statisticsFilterValues
    ? budgets
        .slice()
        .filter(
          ({ period, categories, accounts }) =>
            checkCategoriesCondition(statisticsFilterValues[FieldIds.CATEGORIES], categories) &&
            checkPeriodsCondition(statisticsFilterValues[FieldIds.PERIOD], period) &&
            checkAccountsCondition(statisticsFilterValues[FieldIds.ACCOUNTS], accounts),
        )
    : null,
);

export const selectStatisticsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  INITIAL_STATISTICS_FILTER_FIELDS.map((field) => {
    if (field.id === FieldIds.CATEGORIES && costCategories?.length) {
      const options = field.options.concat(getOptionsFromItemsList(costCategories));
      const optionsObject = getOptionsObjectFromOptions(options);
      return { ...field, optionsObject, options };
    } else if (field.id === FieldIds.ACCOUNTS && accountsList?.length) {
      const options = field.options.concat(getOptionsFromItemsList(accountsList));
      const optionsObject = getOptionsObjectFromOptions(options);
      return { ...field, optionsObject, options };
    } else {
      return field;
    }
  }),
);

export const selectIsStatisticsFilterValuesChanged = createSelector(
  [selectStatisticsFilterValues],
  (filterValues) =>
    filterValues && Object.keys(filterValues).length && INITIAL_STATISTICS_FILTER_FIELDS.some(({ id, value }): boolean => isFilterStateKey(id) && filterValues[id]?.toString() !== value?.toString()),
);
