import { createSelector } from "@reduxjs/toolkit";
import { selectCostCategories } from "@/store/selectors/references";
import { i18nRef } from "@/i18n";
import { selectAccountsList } from "@/store/selectors/accounts";
import { INITIAL_STATISTICS_FILTER_FIELDS } from "@/constants/statistics";
import { FieldIds, FieldValues, SelectFieldOption } from "@/types/field";
import { LazyLoadedSlices } from "@/store";
import { DatesStrings, isDatesStrings } from "@/types/date";
import { isFilterStateKey } from "@/types/filter";
import { MultiSelectValue } from "@/types/field";

export const selectCostsListForCharts = ({ statistics }: LazyLoadedSlices) => statistics?.costsListForCharts || null;

export const selectBudgetsListForCharts = ({ statistics }: LazyLoadedSlices) => statistics?.budgetsListForCharts || null;

export const selectIncomesListForCharts = ({ statistics }: LazyLoadedSlices) => statistics?.incomesListForCharts || null;

export const selectStatisticsFilterValues = ({ statistics }: LazyLoadedSlices) => statistics?.statisticsFilterValues || null;

const checkCategoryCondition = (filterCategory: (number | FieldValues.ALL)[], costCategoryId: number): boolean => filterCategory.includes(costCategoryId) || filterCategory.includes(FieldValues.ALL);
const checkPeriodCondition = ([fromDate, toDate]: DatesStrings, date: string): boolean => date >= fromDate && date <= toDate;
const checkAccountCondition = (filterAccount: (number | FieldValues.ALL)[], incomeAccountId: number): boolean => filterAccount.includes(incomeAccountId) || filterAccount.includes(FieldValues.ALL);
export const selectCostsListForChartsByFilter = createSelector([selectCostsListForCharts, selectStatisticsFilterValues], (costs, statisticsFilterValues) =>
  costs && statisticsFilterValues
    ? costs
        .slice()
        .filter(
          ({ date, category, account }) =>
            FieldIds.CATEGORY in statisticsFilterValues &&
            checkCategoryCondition(statisticsFilterValues[FieldIds.CATEGORY]!, category) &&
            FieldIds.PERIOD in statisticsFilterValues &&
            isDatesStrings(statisticsFilterValues[FieldIds.PERIOD]) &&
            checkPeriodCondition(statisticsFilterValues[FieldIds.PERIOD]!, date) &&
            FieldIds.ACCOUNT in statisticsFilterValues &&
            checkAccountCondition(statisticsFilterValues[FieldIds.ACCOUNT]!, account),
        )
    : null,
);

export const selectIncomesListForChartsByFilter = createSelector([selectIncomesListForCharts, selectStatisticsFilterValues], (incomes, statisticsFilterValues) =>
  incomes && statisticsFilterValues
    ? incomes
        .slice()
        .filter(
          ({ date, category, account }) =>
            FieldIds.CATEGORY in statisticsFilterValues &&
            checkCategoryCondition(statisticsFilterValues[FieldIds.CATEGORY]!, category) &&
            FieldIds.PERIOD in statisticsFilterValues &&
            isDatesStrings(statisticsFilterValues[FieldIds.PERIOD]) &&
            checkPeriodCondition(statisticsFilterValues[FieldIds.PERIOD]!, date) &&
            FieldIds.ACCOUNT in statisticsFilterValues &&
            checkAccountCondition(statisticsFilterValues[FieldIds.ACCOUNT]!, account),
        )
    : null,
);

const checkPeriodsCondition = ([filterFrom, filterTo]: DatesStrings, [itemFrom, itemTo]: DatesStrings) => itemFrom >= filterFrom && itemTo <= filterTo;
const checkCategoriesCondition = (filterCategory: MultiSelectValue, itemCategories: MultiSelectValue) =>
  filterCategory.includes(FieldValues.ALL) || filterCategory.some((categoryId) => itemCategories.includes(categoryId));
const checkAccountsCondition = (filterAccount: MultiSelectValue, itemAccounts: MultiSelectValue) =>
  filterAccount.includes(FieldValues.ALL) || filterAccount.some((accountId) => itemAccounts.includes(accountId));
export const selectBudgetsListForChartsByFilter = createSelector([selectBudgetsListForCharts, selectStatisticsFilterValues], (budgets, statisticsFilterValues) =>
  budgets && statisticsFilterValues
    ? budgets
        .slice()
        .filter(
          ({ period, categories, accounts }) =>
            FieldIds.CATEGORY in statisticsFilterValues &&
            checkCategoriesCondition(statisticsFilterValues[FieldIds.CATEGORY]!, categories) &&
            FieldIds.PERIOD in statisticsFilterValues &&
            isDatesStrings(statisticsFilterValues[FieldIds.PERIOD]) &&
            checkPeriodsCondition(statisticsFilterValues[FieldIds.PERIOD]!, period) &&
            FieldIds.ACCOUNT in statisticsFilterValues &&
            checkAccountsCondition(statisticsFilterValues[FieldIds.ACCOUNT]!, accounts),
        )
    : null,
);

export const selectStatisticsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  INITIAL_STATISTICS_FILTER_FIELDS.map((field) => {
    if (field.id === FieldIds.CATEGORY && costCategories?.length) {
      const options = field.options.concat(costCategories?.map(({ id, name }): SelectFieldOption => ({ value: id, label: name })));
      const optionsObject = options.reduce((acc, { value, label, label_translation }) => ({ ...acc, [value]: label_translation && i18nRef.t ? i18nRef.t(`fields.${label_translation}`) : label }), {});
      return { ...field, optionsObject, options };
    } else if (field.id === FieldIds.ACCOUNT && accountsList?.length) {
      const options = field.options.concat(accountsList?.map(({ id, name }): SelectFieldOption => ({ value: id, label: name })));
      const optionsObject = options.reduce((acc, { value, label, label_translation }) => ({ ...acc, [value]: label_translation && i18nRef.t ? i18nRef.t(`fields.${label_translation}`) : label }), {});
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
