"use client";

import { useSelector } from "react-redux";
import {
  selectBudgetsListForChartsByFilter,
  selectCostsListForCharts,
  selectCostsListForChartsByFilter,
  selectIncomesListForChartsByFilter,
  selectIsStatisticsFilterValuesChanged,
  selectStatisticsFilterValues,
} from "@/store/selectors/statistics";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { getBudgetsListForChartsThunk, getCostsListForChartsThunk, getIncomesListForChartsThunk, setStatisticsFilterValues } from "@/store/slices/statisticsSlice";
import { selectCostCategories, selectIncomeCategories } from "@/store/selectors/references";
import { useCallback, useEffect, useState } from "react";
import { INITIAL_STATISTICS_FILTER_FIELDS } from "@/constants/statistics";
import { getUserId } from "@/helpers/localStorage";
import { EmptyCosts } from "@/components/Costs/List/EmptyCosts";
import { StatisticsFilter } from "@/components/Statistics/Filter/StatisticsFilter";
import { ActiveStatisticsFilters } from "@/components/Statistics/Filter/ActiveStatisticsFilters";
import { Preloader } from "@/components/Layout/Preloader";
import { FoundNothing } from "@/components/Common/FoundNothing";
import { useAppDispatch } from "@/hooks/redux";
import { getFilterItemsFromFields } from "@/helpers/filters";
import { TotalStatistics } from "@/components/Statistics/TotalStatistics";
import { CostsBudgetsStatistics } from "@/components/Statistics/CostsBudgets/CostsBudgetsStatistics";
import { CostsCategoriesStatistics } from "@/components/Statistics/CostsCategories/CostsCategoriesStatistics";
import { CostsIncomesStatistics } from "@/components/Statistics/CostsIncomes/CostsIncomesStatistics";
import { IncomesCategoriesStatistics } from "@/components/Statistics/IncomesCategories/IncomesCategoriesStatistics";

export default function StatisticsContent() {
  const dispatch = useAppDispatch();

  const statisticsFilterValues = useSelector(selectStatisticsFilterValues);
  const [isNotEqualParamsToFilters, isFilterValuesFilled] = useFilterSearchParams(statisticsFilterValues, setStatisticsFilterValues);

  const costCategories = useSelector(selectCostCategories);
  const incomeCategories = useSelector(selectIncomeCategories);
  const costsList = useSelector(selectCostsListForCharts);
  const costsListForCharts = useSelector(selectCostsListForChartsByFilter);
  const budgetsListForCharts = useSelector(selectBudgetsListForChartsByFilter);
  const incomesListForCharts = useSelector(selectIncomesListForChartsByFilter);
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
        await import("@/store/slices/statisticsSlice");
        dispatch(setStatisticsFilterValues(getFilterItemsFromFields(INITIAL_STATISTICS_FILTER_FIELDS)));
      }
      if (!costsList) await handleGetData();
    };

    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  const charts = (
    <>
      <TotalStatistics />
      <CostsBudgetsStatistics />
      <CostsIncomesStatistics />
      <CostsCategoriesStatistics />
      <IncomesCategoriesStatistics />
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
