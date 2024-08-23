"use client";

import { useLoading } from "@/hooks/loading";
import { useCallback, useEffect } from "react";
import { Preloader } from "@/components/layout/preloader/Preloader";
import { selectBudgetsFilterValues, selectBudgetsList } from "@/store/selectors/budgets";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { getBudgetsListThunk, setBudgetsFilterValues } from "@/store/slices/budgetsSlice";
import { INITIAL_BUDGETS_FILTER_FIELDS } from "@/constants/budgets";
import { getUserId } from "@/helpers/localStorage";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getFilterItemsFromFields } from "@/helpers/filters";
import BudgetsPageContent from "@/components/budgets/page/BudgetsPageContent";
import { BudgetsPageActions } from "@/components/budgets/page/BudgetsPageActions";

export default function BudgetsContent() {
  const dispatch = useAppDispatch();

  const budgetsFilterValues = useAppSelector(selectBudgetsFilterValues);
  const [isNotEqualParamsToFilters] = useFilterSearchParams(budgetsFilterValues, setBudgetsFilterValues);

  const [isLoading, setIsLoading] = useLoading(false);
  const budgetsList = useAppSelector(selectBudgetsList);

  const handleGetData = useCallback(async (): Promise<void> => {
    if (!budgetsFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await dispatch(getBudgetsListThunk(budgetsFilterValues));
    setIsLoading(false);
  }, [budgetsFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect((): void => {
    const injectAndLoadData = async (): Promise<void> => {
      if (!budgetsFilterValues) {
        await import("@/store/slices/budgetsSlice");
        dispatch(setBudgetsFilterValues(getFilterItemsFromFields(INITIAL_BUDGETS_FILTER_FIELDS)));
      }
      if (!budgetsList?.length) await handleGetData();
    };
    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  return (
    <Preloader isLoading={isLoading}>
      <BudgetsPageActions />
      <BudgetsPageContent onGetData={handleGetData} />
    </Preloader>
  );
}
