"use client";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBudgetsListForChartsByFilter,
  selectCostsListForCharts,
  selectCostsListForChartsByFilter,
  selectIncomesListForChartsByFilter,
  selectIsStatisticsFilterValuesChanged,
  selectStatisticsFilterValues,
} from "@/store/selectors/statistics";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { getBudgetsListForChartsThunk, getCostsListForChartsThunk, getIncomesListForChartsThunk, setStatisticsFilterValues } from "@/store/statisticsSlice";
import { useMonths } from "@/hooks/months";
import { selectAccountTypesObject, selectCostCategories, selectCostCategoriesObject, selectIncomeCategories, selectIncomeCategoriesObject } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { useCallback, useEffect, useState } from "react";
import { INITIAL_STATISTICS_FILTER_FIELDS } from "@/constants/statistics";
import { getUserId } from "@/helpers/localStorage";
import formatPrice from "@/helpers/formatPrice";
import { CostsBudgetsBarChart } from "@/components/Statistics/CostsBudgetsBarChart";
import { CostsIncomesBarChart } from "@/components/Statistics/CostsIncomesBarChart";
import { IncomesCategoriesBarChart } from "@/components/Statistics/IncomesCategoriesBarChart";
import { CostsCategoriesBarChart } from "@/components/Statistics/CostsCategoriesBarChart";
import { EmptyCosts } from "@/components/Costs/List/EmptyCosts";
import { StatisticsFilter } from "@/components/Statistics/Filter/StatisticsFilter";
import { ActiveStatisticsFilters } from "@/components/Statistics/Filter/ActiveStatisticsFilters";
import { Preloader } from "@/components/Layout/Preloader";
import { FoundNothing } from "@/components/Common/FoundNothing";

export default function StatisticsContent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const statisticsFilterValues = useSelector(selectStatisticsFilterValues);
  const [isNotEqualParamsToFilters, isFilterValuesFilled] = useFilterSearchParams(statisticsFilterValues, setStatisticsFilterValues);

  const months = useMonths();
  const costCategories = useSelector(selectCostCategories);
  const incomeCategories = useSelector(selectIncomeCategories);
  const costCategoriesObject = useSelector(selectCostCategoriesObject);
  const incomeCategoriesObject = useSelector(selectIncomeCategoriesObject);
  const accountTypesObject = useSelector(selectAccountTypesObject);
  const costsList = useSelector(selectCostsListForCharts);
  const costsListForCharts = useSelector(selectCostsListForChartsByFilter);
  const budgetsListForCharts = useSelector(selectBudgetsListForChartsByFilter)?.map((budget) => ({
    ...budget,
    amount: budget.amount / (parseInt(budget.period[1].substring(5, 7)) - parseInt(budget.period[0].substring(5, 7)) + 1),
  }));
  const incomesListForCharts = useSelector(selectIncomesListForChartsByFilter);
  const currency = useSelector(selectCurrency);
  const isFilterValuesChanged = useSelector(selectIsStatisticsFilterValuesChanged);

  const [isLoading, setIsLoading] = useState(false);
  const handleGetData = useCallback(async () => {
    if (!statisticsFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await Promise.all([
      dispatch(getCostsListForChartsThunk(statisticsFilterValues)),
      dispatch(getIncomesListForChartsThunk(statisticsFilterValues)),
      dispatch(getBudgetsListForChartsThunk(statisticsFilterValues)),
    ]).finally(() => setIsLoading(false));
  }, [statisticsFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect(() => {
    const injectAndLoadData = async () => {
      if (!statisticsFilterValues) {
        await import("@/store/statisticsSlice");
        dispatch(setStatisticsFilterValues(INITIAL_STATISTICS_FILTER_FIELDS.map(({ id, value }) => ({ id, value }))));
      }
      if (!costsList) await handleGetData();
    };

    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  let costsTotalAmount = 0;
  let incomesTotalAmount = 0;
  let budgetsTotalAmount = 0;

  const costsByMonths =
    costCategoriesObject && costsListForCharts && !isNotEqualParamsToFilters
      ? months.reduce((acc, monthName, index) => {
          const monthIndex = (index + 1).toString().padStart(2, "0");
          let costsAmount = 0;
          const costsList = costsListForCharts
            .filter(({ date }) => date.substring(5, 7) === monthIndex)
            .reduce((acc, { amount, category }) => {
              acc[costCategoriesObject[category]] = (acc[costCategoriesObject[category]] || 0) + amount;
              costsTotalAmount += amount;
              costsAmount += amount;
              return acc;
            }, {});
          acc[monthName] = { costsAmount, costsList };
          return acc;
        }, {})
      : null;

  const costsIncomesChartItems =
    costsByMonths && incomeCategoriesObject && incomesListForCharts && !isNotEqualParamsToFilters
      ? months.map((monthName, index) => {
          const monthIndex = (index + 1).toString().padStart(2, "0");
          const { costsAmount, costsList } = costsByMonths[monthName];
          let incomes = 0;
          const incomesList = incomesListForCharts
            .filter(({ date }) => date.substring(5, 7) === monthIndex)
            .reduce((acc, { amount, category }) => {
              acc[incomeCategoriesObject[category]] = (acc[incomeCategoriesObject[category]] || 0) + amount;
              incomesTotalAmount += amount;
              incomes += amount;
              return acc;
            }, {});
          return { monthName, costs: costsAmount, costsList, incomes, incomesList };
        })
      : [];

  const costsBudgetsChartItems =
    costCategoriesObject && costsByMonths && budgetsListForCharts && !isNotEqualParamsToFilters
      ? months.map((monthName, index) => {
          const monthIndex = (index + 1).toString().padStart(2, "0");
          const { costsAmount, costsList } = costsByMonths[monthName];
          let budgets = 0;
          const budgetsList = budgetsListForCharts
            .filter(({ period: [from, to] }) => from.substring(5, 7) <= monthIndex && to.substring(5, 7) >= monthIndex)
            .reduce((acc, { name, amount, categories }) => {
              acc[name] = { amount };
              acc[name].costs = categories.length ? categories.reduce((acc, categoryId) => acc + (costsList[costCategoriesObject[categoryId]] || 0), 0) : costsAmount;
              budgets += amount;
              budgetsTotalAmount += amount;
              return acc;
            }, {});
          return { name: monthName, costs: costsAmount, budgets, budgetsList };
        })
      : [];

  const costsCategoriesChartItems =
    costCategoriesObject && costsListForCharts && accountTypesObject
      ? Object.values(
          costsListForCharts.reduce((acc, { amount, category, account }) => {
            if (!acc[costCategoriesObject[category]]) acc[costCategoriesObject[category]] = { name: costCategoriesObject[category], value: 0, accounts: {} };
            acc[costCategoriesObject[category]].value += amount;
            const accountName = accountTypesObject[account].name;
            if (!acc[costCategoriesObject[category]].accounts[accountName]) acc[costCategoriesObject[category]].accounts[accountName] = 0;
            acc[costCategoriesObject[category]].accounts[accountName] += amount;
            return acc;
          }, {}),
        ).sort((a, b) => b.value - a.value)
      : [];

  const incomesCategoriesChartItems =
    incomeCategoriesObject && incomesListForCharts && accountTypesObject
      ? Object.values(
          incomesListForCharts.reduce((acc, { amount, category, account }) => {
            if (!acc[incomeCategoriesObject[category]]) acc[incomeCategoriesObject[category]] = { name: incomeCategoriesObject[category], value: 0, accounts: {} };
            acc[incomeCategoriesObject[category]].value += amount;
            const accountName = accountTypesObject[account].name;
            if (!acc[incomeCategoriesObject[category]].accounts[accountName]) acc[incomeCategoriesObject[category]].accounts[accountName] = 0;
            acc[incomeCategoriesObject[category]].accounts[accountName] += amount;
            return acc;
          }, {}),
        ).sort((a, b) => b.value - a.value)
      : [];

  const charts = (
    <>
      <ul className="flex flex-col gap-x-6 gap-y-1 text-xl empty:hidden md:flex-row">
        <li>
          {t("statistics.incomes")}: {formatPrice(incomesTotalAmount)} {currency}
        </li>
        <li>
          {t("statistics.costs")}: {formatPrice(costsTotalAmount)} {currency}
        </li>
        <li>
          {t("statistics.budgets")}: {formatPrice(budgetsTotalAmount)} {currency}
        </li>
        <li className="font-bold">
          {t("common.total")}: {formatPrice(incomesTotalAmount - costsTotalAmount)} {currency}
        </li>
      </ul>
      {!!costsBudgetsChartItems.length && (
        <section className="flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold">
            {t("statistics.budgets")} & {t("statistics.costs")}
          </h2>
          <CostsBudgetsBarChart items={costsBudgetsChartItems} />
        </section>
      )}
      {!!costsIncomesChartItems.length && (
        <section className="flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold">
            {t("statistics.incomes")} & {t("statistics.costs")}
          </h2>
          <CostsIncomesBarChart items={costsIncomesChartItems} />
        </section>
      )}
      {!!incomesCategoriesChartItems.length && (
        <section className="flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold">{t("statistics.incomes_by_categories")}</h2>
          <IncomesCategoriesBarChart items={incomesCategoriesChartItems} />
        </section>
      )}
      {!!costsCategoriesChartItems.length && (
        <section className="flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold">{t("statistics.expenses_by_categories")}</h2>
          <CostsCategoriesBarChart items={costsCategoriesChartItems} />
        </section>
      )}
    </>
  );
  let content = <EmptyCosts />;
  if (costCategories && incomeCategories) {
    content = (
      <>
        {isFilterValuesFilled && (
          <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
            <div className="grid grid-cols-2 gap-4">
              <StatisticsFilter onSave={handleGetData} />
            </div>
            <ActiveStatisticsFilters />
          </div>
        )}
        {costsListForCharts?.length || incomesListForCharts?.length || budgetsListForCharts?.length ? charts : isFilterValuesChanged && <FoundNothing />}
      </>
    );
  }

  return <Preloader isLoading={isLoading}>{content}</Preloader>;
}
