"use client";

import { useSelector } from "react-redux";
import { Preloader } from "@/components/Layout/Preloader";
import { selectCostsFilterValues, selectCostsList } from "@/store/selectors/costs";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { useLoading } from "@/hooks/loading";
import { useCallback, useEffect } from "react";
import { getCostsListThunk, setCostsFilterValues } from "@/store/slices/costsSlice";
import { INITIAL_COSTS_FILTER_FIELDS } from "@/constants/costs";
import { getUserId } from "@/helpers/localStorage";
import { useAppDispatch } from "@/hooks/redux";
import { getFilterItemsFromFields } from "@/helpers/filters";
import { ExpensesPageActions } from "@/components/Costs/page/ExpensesPageActions";
import { ExpensesPageContent } from "@/components/Costs/page/ExpensesPageContent";

export default function ExpensesContent() {
  const dispatch = useAppDispatch();

  const costsFilterValues = useSelector(selectCostsFilterValues);
  const [isNotEqualParamsToFilters] = useFilterSearchParams(costsFilterValues, setCostsFilterValues);

  const [isLoading, setIsLoading] = useLoading(false);
  const costsList = useSelector(selectCostsList);
  const handleGetData = useCallback(async () => {
    if (!costsFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await dispatch(getCostsListThunk(costsFilterValues));
    setIsLoading(false);
  }, [costsFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect(() => {
    const injectAndLoadData = async () => {
      if (!costsFilterValues) {
        await import("@/store/slices/costsSlice");
        dispatch(setCostsFilterValues(getFilterItemsFromFields(INITIAL_COSTS_FILTER_FIELDS)));
      }
      if (!costsList) await handleGetData();
    };

    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  return (
    <Preloader isLoading={isLoading}>
      <ExpensesPageActions />
      <ExpensesPageContent onGetData={handleGetData} />
    </Preloader>
  );
}
