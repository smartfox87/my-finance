import { createSelector } from "@reduxjs/toolkit";
import { selectAccountTypesObject, selectCostCategories, selectCostCategoriesObject, selectIncomeCategoriesObject } from "@/store/selectors/references";
import { selectAccountsList } from "@/store/selectors/accounts";
import { INITIAL_STATISTICS_FILTER_FIELDS } from "@/constants/statistics";
import { LazyLoadedSlices } from "@/store";
import { processFilterFields, filterSingleItemsList, filterMultiItemsList } from "@/helpers/selectors";
import { isFilterStateKey } from "@/predicates/filter";
import {
  BudgetsListStatistics,
  CostIncomeStatisticsItem,
  CostsBudgetsStatisticsItem,
  CostsByMonthsStatistics,
  CostsCategoriesStatisticsItem,
  IncomesCategoriesStatisticsItem,
} from "@/types/statistics";
import { getLocalisedMonths } from "@/helpers/months";

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
  budgets && statisticsFilterValues
    ? filterMultiItemsList(statisticsFilterValues, budgets)?.map((budget) => ({
        ...budget,
        amount: budget.amount / (parseInt(budget.period[1].substring(5, 7)) - parseInt(budget.period[0].substring(5, 7)) + 1),
      }))
    : null,
);

export const selectStatisticsFilterFields = createSelector([selectCostCategories, selectAccountsList], (costCategories, accountsList) =>
  processFilterFields(INITIAL_STATISTICS_FILTER_FIELDS, costCategories, accountsList),
);

export const selectIsStatisticsFilterValuesChanged = createSelector(
  [selectStatisticsFilterValues],
  (filterValues) =>
    filterValues && Object.keys(filterValues).length && INITIAL_STATISTICS_FILTER_FIELDS.some(({ id, value }): boolean => isFilterStateKey(id) && filterValues[id]?.toString() !== value?.toString()),
);

export const selectCostsAmount = createSelector([selectCostsListForChartsByFilter], (costsListForCharts): number => costsListForCharts?.reduce((acc, { amount }) => acc + amount, 0) || 0);

export const selectIncomesAmount = createSelector([selectCostsListForChartsByFilter], (incomesListForCharts): number => incomesListForCharts?.reduce((acc, { amount }) => (acc += amount), 0) || 0);

export const selectBudgetsAmount = createSelector([selectBudgetsListForChartsByFilter], (budgetsListForCharts): number => budgetsListForCharts?.reduce((acc, { amount }) => (acc += amount), 0) || 0);

export const selectCostsByMonths = createSelector([selectCostCategoriesObject, selectCostsListForChartsByFilter], (costCategoriesObject, costsListForCharts) => {
  const months = getLocalisedMonths();
  return costCategoriesObject && costsListForCharts
    ? months.reduce((acc, monthName, index) => {
        const monthIndex = (index + 1).toString().padStart(2, "0");
        let costsAmount = 0;
        const costsList = costsListForCharts
          .filter(({ date }) => date.substring(5, 7) === monthIndex)
          .reduce(
            (acc, { amount, category }) => {
              acc[costCategoriesObject[category]] = (acc[costCategoriesObject[category]] || 0) + amount;
              costsAmount += amount;
              return acc;
            },
            {} as Record<string, number>,
          );
        acc[monthName] = { costsAmount, costsList };
        return acc;
      }, {} as CostsByMonthsStatistics)
    : null;
});

export const selectCostsIncomesChartItems = createSelector(
  [selectCostsByMonths, selectIncomeCategoriesObject, selectCostsListForChartsByFilter],
  (costsByMonths, incomeCategoriesObject, incomesListForCharts): CostIncomeStatisticsItem[] => {
    const months = getLocalisedMonths();
    return costsByMonths && incomeCategoriesObject && incomesListForCharts
      ? months.map((monthName, index) => {
          const monthIndex = (index + 1).toString().padStart(2, "0");
          const { costsAmount, costsList } = costsByMonths[monthName];
          let incomes = 0;
          const incomesList = incomesListForCharts
            .filter(({ date }) => date.substring(5, 7) === monthIndex)
            .reduce(
              (acc, { amount, category }) => {
                acc[incomeCategoriesObject[category]] = (acc[incomeCategoriesObject[category]] || 0) + amount;
                incomes += amount;
                return acc;
              },
              {} as Record<string, number>,
            );
          return { monthName, costs: costsAmount, costsList, incomes, incomesList };
        })
      : [];
  },
);

export const selectCostsBudgetsChartItems = createSelector(
  [selectCostCategoriesObject, selectCostsByMonths, selectBudgetsListForChartsByFilter],
  (costCategoriesObject, costsByMonths, budgetsListForCharts): CostsBudgetsStatisticsItem[] => {
    const months = getLocalisedMonths();
    return costCategoriesObject && costsByMonths && budgetsListForCharts
      ? months.map((monthName, index) => {
          const monthIndex = (index + 1).toString().padStart(2, "0");
          const { costsAmount, costsList } = costsByMonths[monthName];
          let budgets = 0;
          const budgetsList = budgetsListForCharts
            .filter(({ period: [from, to] }) => from.substring(5, 7) <= monthIndex && to.substring(5, 7) >= monthIndex)
            .reduce((acc, { name, amount, categories }) => {
              const costs = categories.length ? categories.reduce((acc, categoryId) => acc + (costsList[costCategoriesObject[categoryId]] || 0), 0) : costsAmount;
              acc[name] = { amount, costs };
              budgets += amount;
              return acc;
            }, {} as BudgetsListStatistics);
          return { name: monthName, costs: costsAmount, budgets, budgetsList };
        })
      : [];
  },
);

export const selectCostsCategoriesChartItems = createSelector(
  [selectCostCategoriesObject, selectCostsListForChartsByFilter, selectAccountTypesObject],
  (costCategoriesObject, costsListForCharts, accountTypesObject): CostsCategoriesStatisticsItem[] =>
    costCategoriesObject && costsListForCharts && accountTypesObject
      ? Object.values(
          costsListForCharts.reduce(
            (acc, { amount, category, account }) => {
              const costCategoryName = costCategoriesObject[category];
              if (!acc[costCategoryName]) acc[costCategoryName] = { name: costCategoryName, value: 0, accounts: {} };
              acc[costCategoryName].value += amount;

              const accountName = accountTypesObject[account].name;
              if (!acc[costCategoryName].accounts[accountName]) acc[costCategoryName].accounts[accountName] = 0;
              acc[costCategoryName].accounts[accountName] += amount;

              return acc;
            },
            {} as Record<string, CostsCategoriesStatisticsItem>,
          ),
        ).sort((a, b) => b.value - a.value)
      : [],
);

export const selectIncomesCategoriesChartItems = createSelector(
  [selectIncomeCategoriesObject, selectIncomesListForChartsByFilter, selectAccountTypesObject],
  (incomeCategoriesObject, incomesListForCharts, accountTypesObject): IncomesCategoriesStatisticsItem[] =>
    incomeCategoriesObject && incomesListForCharts && accountTypesObject
      ? Object.values(
          incomesListForCharts.reduce(
            (acc, { amount, category, account }) => {
              if (!acc[incomeCategoriesObject[category]]) acc[incomeCategoriesObject[category]] = { name: incomeCategoriesObject[category], value: 0, accounts: {} };
              acc[incomeCategoriesObject[category]].value += amount;
              const accountName = accountTypesObject[account].name;
              if (!acc[incomeCategoriesObject[category]].accounts[accountName]) acc[incomeCategoriesObject[category]].accounts[accountName] = 0;
              acc[incomeCategoriesObject[category]].accounts[accountName] += amount;
              return acc;
            },
            {} as Record<string, IncomesCategoriesStatisticsItem>,
          ),
        ).sort((a, b) => b.value - a.value)
      : [],
);
