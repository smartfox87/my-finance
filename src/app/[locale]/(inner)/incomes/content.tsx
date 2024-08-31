"use client";

import { selectIncomesFilterValues, selectIncomesList } from "@/store/selectors/incomes";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { getIncomesListThunk, setIncomesFilterValues } from "@/store/slices/incomesSlice";
import { useLoading } from "@/hooks/loading";
import { useCallback, useEffect } from "react";
import { INITIAL_INCOMES_FILTER_FIELDS } from "@/constants/incomes";
import { getUserId } from "@/helpers/localStorage";
import { Preloader } from "@/components/layout/preloader/Preloader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getFilterItemsFromFields } from "@/helpers/filters";
import { IncomesPageActions } from "@/components/Incomes/page/IncomesPageActions";
import { IncomesPageContent } from "@/components/Incomes/page/IncomesPageContent";

export default function IncomesContent() {
  const dispatch = useAppDispatch();

  const incomesFilterValues = useAppSelector(selectIncomesFilterValues);
  const [isNotEqualParamsToFilters] = useFilterSearchParams(incomesFilterValues, setIncomesFilterValues);

  const [isLoading, setIsLoading] = useLoading(false);
  const incomesList = useAppSelector(selectIncomesList);

  const handleGetData = useCallback(async (): Promise<void> => {
    if (!incomesFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await dispatch(getIncomesListThunk(incomesFilterValues));
    setIsLoading(false);
  }, [incomesFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect((): void => {
    const injectAndLoadData = async () => {
      if (!incomesFilterValues) {
        await import("@/store/slices/incomesSlice");
        dispatch(setIncomesFilterValues(getFilterItemsFromFields(INITIAL_INCOMES_FILTER_FIELDS)));
      }
      if (!incomesList) await handleGetData();
    };

    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  return (
    <Preloader isLoading={isLoading}>
      <IncomesPageActions />
      <IncomesPageContent onGetData={handleGetData} />
    </Preloader>
  );
}