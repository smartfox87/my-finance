"use client";

import { selectIncomesFilterValues, selectIncomesList } from "../../selectors";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { getIncomesListThunk, setIncomesFilterValues } from "../../store";
import { useLoading } from "@/hooks/loading";
import { useCallback, useEffect } from "react";
import { INITIAL_INCOMES_FILTER_FIELDS } from "../../constants";
import { getUserId } from "@/helpers/localStorage";
import { Preloader } from "@/components/loading/preloader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getFilterItemsFromFields } from "@/helpers/filters";
import { HeaderAside } from "../../components";
import { PageContent } from "../../components";

export default function Page() {
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
        await import("../../store");
        dispatch(setIncomesFilterValues(getFilterItemsFromFields(INITIAL_INCOMES_FILTER_FIELDS)));
      }
      if (!incomesList) await handleGetData();
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
