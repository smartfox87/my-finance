import { createSelector } from "@reduxjs/toolkit";
import { selectCostCategories } from "@/store/selectors/references.js";
import { i18n } from "@/i18n";
import { selectAccountsList } from "@/store/selectors/accounts.js";
import { INITIAL_STATISTICS_FILTER_FIELDS } from "@/initial-data/statistics.js";

export const selectCostsListForCharts = ({ statistics }) => statistics?.costsListForCharts || null;

export const selectBudgetsListForCharts = ({ statistics }) => statistics?.budgetsListForCharts || null;

export const selectIncomesListForCharts = ({ statistics }) => statistics?.incomesListForCharts || null;

export const selectStatisticsFilterValues = ({ statistics }) => statistics?.statisticsFilterValues || null;

const checkCategoryCondition = (filterCategory, costCategoryId) => filterCategory.includes(costCategoryId) || filterCategory.includes("all");
const checkPeriodCondition = ([fromDate, toDate], date) => date >= fromDate && date <= toDate;
const checkAccountCondition = (filterAccount, incomeAccountId) => filterAccount.includes(incomeAccountId) || filterAccount.includes("all");
export const selectCostsListForChartsByFilter = createSelector(
  [selectCostsListForCharts, selectStatisticsFilterValues],
  (costs, statisticsFilterValues) =>
    costs
      ?.slice()
      .filter(
        ({ date, category, account }) =>
          checkCategoryCondition(statisticsFilterValues.category, category) &&
          checkPeriodCondition(statisticsFilterValues.period, date) &&
          checkAccountCondition(statisticsFilterValues.account, account),
      ) || null,
);

export const selectIncomesListForChartsByFilter = createSelector(
  [selectIncomesListForCharts, selectStatisticsFilterValues],
  (incomes, statisticsFilterValues) =>
    incomes
      ?.slice()
      .filter(
        ({ date, category, account }) =>
          checkCategoryCondition(statisticsFilterValues.category, category) &&
          checkPeriodCondition(statisticsFilterValues.period, date) &&
          checkAccountCondition(statisticsFilterValues.account, account),
      ) || null,
);

const checkPeriodsCondition = ([filterFrom, filterTo], [itemFrom, itemTo]) => itemFrom >= filterFrom && itemTo <= filterTo;
const checkCategoriesCondition = (filterCategory, itemCategories) => filterCategory.includes("all") || filterCategory.some((categoryId) => itemCategories.includes(categoryId));
export const selectBudgetsListForChartsByFilter = createSelector(
  [selectBudgetsListForCharts, selectStatisticsFilterValues],
  (budgets, statisticsFilterValues) =>
    budgets
      ?.slice()
      .filter(
        ({ period, categories, account }) =>
          checkCategoriesCondition(statisticsFilterValues.category, categories) &&
          checkPeriodsCondition(statisticsFilterValues.period, period) &&
          checkAccountCondition(statisticsFilterValues.account, account),
      ) || null,
);

export const selectStatisticsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  INITIAL_STATISTICS_FILTER_FIELDS.map((field) => {
    if (field.id === "category" && costCategories?.length) {
      const options = field.options.concat(costCategories?.map(({ id, name }) => ({ value: id, label: name })));
      const optionsObject = options.reduce((acc, { value, label, label_translation }) => ({ ...acc, [value]: label_translation ? i18n.t(`fields.${label_translation}`) : label }), {});
      return { ...field, optionsObject, options };
    } else if (field.id === "account" && accountsList?.length) {
      const options = field.options.concat(accountsList?.map(({ id, name }) => ({ value: id, label: name })));
      const optionsObject = options.reduce((acc, { value, label, label_translation }) => ({ ...acc, [value]: label_translation ? i18n.t(`fields.${label_translation}`) : label }), {});
      return { ...field, optionsObject, options };
    } else {
      return field;
    }
  }),
);

export const selectIsStatisticsFilterValuesChanged = createSelector(
  [selectStatisticsFilterValues],
  (filterValues) => filterValues && Object.keys(filterValues).length && INITIAL_STATISTICS_FILTER_FIELDS.some(({ id, value }) => filterValues[id].toString() !== value.toString()),
);
