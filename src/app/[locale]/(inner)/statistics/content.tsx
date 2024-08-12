"use client";

import { useSelector } from "react-redux";
import { selectCostsListForCharts, selectStatisticsFilterValues } from "@/store/selectors/statistics";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { getBudgetsListForChartsThunk, getCostsListForChartsThunk, getIncomesListForChartsThunk, setStatisticsFilterValues } from "@/store/slices/statisticsSlice";
import { useCallback, useEffect, useState } from "react";
import { INITIAL_STATISTICS_FILTER_FIELDS } from "@/constants/statistics";
import { getUserId } from "@/helpers/localStorage";
import { Preloader } from "@/components/Layout/preloader/Preloader";
import { useAppDispatch } from "@/hooks/redux";
import { getFilterItemsFromFields } from "@/helpers/filters";
import { StatisticsPageContent } from "@/components/Statistics/page/StatisticsPageContent";

export default function StatisticsContent() {
  const dispatch = useAppDispatch();

  const statisticsFilterValues = useSelector(selectStatisticsFilterValues);
  const [isNotEqualParamsToFilters, isFilterValuesFilled] = useFilterSearchParams(statisticsFilterValues, setStatisticsFilterValues);

  const costsList = useSelector(selectCostsListForCharts);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetData = useCallback(async (): Promise<void> => {
    if (!statisticsFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await Promise.all([
      dispatch(getCostsListForChartsThunk(statisticsFilterValues)),
      dispatch(getIncomesListForChartsThunk(statisticsFilterValues)),
      dispatch(getBudgetsListForChartsThunk(statisticsFilterValues)),
    ]).finally(() => setIsLoading(false));
  }, [statisticsFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect((): void => {
    const injectAndLoadData = async () => {
      if (!statisticsFilterValues) {
        await import("@/store/slices/statisticsSlice");
        dispatch(setStatisticsFilterValues(getFilterItemsFromFields(INITIAL_STATISTICS_FILTER_FIELDS)));
      }
      if (!costsList) await handleGetData();
    };

    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  return (
    <Preloader isLoading={isLoading}>
      <StatisticsPageContent isFilterValuesFilled={isFilterValuesFilled} onGetData={handleGetData} />
    </Preloader>
  );
}
