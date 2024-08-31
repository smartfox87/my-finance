"use client";

import { Preloader } from "@/components/loading/preloader";
import { selectCostsFilterValues, selectCostsList } from "../../selectors";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { useLoading } from "@/hooks/loading";
import { useCallback, useEffect } from "react";
import { getCostsListThunk, setCostsFilterValues } from "../../store";
import { INITIAL_COSTS_FILTER_FIELDS } from "../../constants";
import { getUserId } from "@/helpers/localStorage";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getFilterItemsFromFields } from "@/helpers/filters";
import { HeaderAside } from "../../components";
import { PageContent } from "../../components";

export default function Page() {
  const dispatch = useAppDispatch();

  const costsFilterValues = useAppSelector(selectCostsFilterValues);
  const [isNotEqualParamsToFilters] = useFilterSearchParams(costsFilterValues, setCostsFilterValues);

  const [isLoading, setIsLoading] = useLoading(false);
  const costsList = useAppSelector(selectCostsList);

  const handleGetData = useCallback(async (): Promise<void> => {
    if (!costsFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await dispatch(getCostsListThunk(costsFilterValues));
    setIsLoading(false);
  }, [costsFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect((): void => {
    const injectAndLoadData = async () => {
      if (!costsFilterValues) {
        await import("../../store");
        dispatch(setCostsFilterValues(getFilterItemsFromFields(INITIAL_COSTS_FILTER_FIELDS)));
      }
      if (!costsList) await handleGetData();
    };

    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  return (
    <Preloader isLoading={isLoading}>
      <HeaderAside />
      <PageContent onGetData={handleGetData} />
    </Preloader>
  );
}
