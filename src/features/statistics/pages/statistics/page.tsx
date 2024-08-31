"use client";

import { selectCostsListForCharts, selectStatisticsFilterValues } from "../../selectors";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { getBudgetsListForChartsThunk, getCostsListForChartsThunk, getIncomesListForChartsThunk, setStatisticsFilterValues } from "../../store";
import { useCallback, useEffect, useState } from "react";
import { INITIAL_STATISTICS_FILTER_FIELDS } from "../../constants";
import { getUserId } from "@/utils/local-storage";
import { Preloader } from "@/components/loading/preloader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getFilterItemsFromFields } from "@/utils/filters";
import { PageContent } from "../../components";

export default function StatisticsContent() {
  const dispatch = useAppDispatch();

  const statisticsFilterValues = useAppSelector(selectStatisticsFilterValues);
  const [isNotEqualParamsToFilters, isFilterValuesFilled] = useFilterSearchParams(statisticsFilterValues, setStatisticsFilterValues);

  const costsList = useAppSelector(selectCostsListForCharts);
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
        await import("../../store");
        dispatch(setStatisticsFilterValues(getFilterItemsFromFields(INITIAL_STATISTICS_FILTER_FIELDS)));
      }
      if (!costsList) await handleGetData();
    };

    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  return (
    <Preloader isLoading={isLoading}>
      <PageContent isFilterValuesFilled={isFilterValuesFilled} onGetData={handleGetData} />
    </Preloader>
  );
}
