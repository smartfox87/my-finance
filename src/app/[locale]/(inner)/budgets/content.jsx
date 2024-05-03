"use client";

import { selectCurrency } from "@/store/selectors/profile";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLoading } from "@/hooks/loading";
import { Suspense, useCallback, useEffect } from "react";
import { Preloader } from "@/components/Layout/Preloader";
import formatPrice from "@/helpers/formatPrice";
import { selectBudgetsByFilter, selectBudgetsFilterValues, selectBudgetsList } from "@/store/selectors/budgets";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { getBudgetsListThunk, setBudgetsFilterValues } from "@/store/budgetsSlice";
import { INITIAL_BUDGETS_FILTER_FIELDS } from "@/initial-data/budgets";
import { getUserId } from "@/helpers/localStorage";
import { AddNewBudget } from "@/components/Budgets/New/AddNewBudget";
import { BudgetsFilter } from "@/components/Budgets/Filter/BudgetsFilter";
import { ActiveBudgetsFilters } from "@/components/Budgets/Filter/ActiveBudgetsFilters";
import { LazyList } from "@/components/Common/LazyList";
import { BudgetItem } from "@/components/Budgets/List/BudgetItem";
import { BudgetDetail } from "@/components/Budgets/Detail/BudgetDetail";
import { EmptyBudgets } from "@/components/Budgets/List/EmptyBudgets";
import { FoundNothing } from "@/components/Common/FoundNothing";
import { createPortal } from "react-dom";
import { useAppDispatch } from "@/hooks/redux";

export default function BudgetsContent() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const budgetsFilterValues = useSelector(selectBudgetsFilterValues);
  const [isNotEqualParamsToFilters] = useFilterSearchParams(budgetsFilterValues, setBudgetsFilterValues);

  const [isLoading, setIsLoading] = useLoading(false);
  const budgetsList = useSelector(selectBudgetsList);
  const filteredSortedBudgets = useSelector(selectBudgetsByFilter);
  const handleGetData = useCallback(async () => {
    if (!budgetsFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await dispatch(getBudgetsListThunk(budgetsFilterValues));
    setIsLoading(false);
  }, [budgetsFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect(() => {
    const injectAndLoadData = async () => {
      if (!budgetsFilterValues) {
        await import("@/store/budgetsSlice");
        await dispatch(setBudgetsFilterValues(INITIAL_BUDGETS_FILTER_FIELDS.map(({ id, value }) => ({ id, value }))));
      }
      if (!budgetsList?.length) await handleGetData();
    };
    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  let content = null;
  if (filteredSortedBudgets?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewBudget isAdaptive onSave={handleGetData} />
            <BudgetsFilter onSave={handleGetData} />
          </div>
          <ActiveBudgetsFilters />
        </div>
        <LazyList items={filteredSortedBudgets} Item={BudgetItem} />
        <Suspense fallback={<div />}>
          <BudgetDetail onSave={handleGetData} />
        </Suspense>
      </>
    );
  else if (!budgetsList?.length) content = <EmptyBudgets addNew={<AddNewBudget onSave={handleGetData} />} />;
  else if (budgetsList?.length && !filteredSortedBudgets?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewBudget isAdaptive onSave={handleGetData} />
            <BudgetsFilter onSave={handleGetData} />
          </div>
        </div>
        <ActiveBudgetsFilters />
        <FoundNothing />
      </>
    );

  const totalAmount = filteredSortedBudgets?.reduce((acc, { amount }) => acc + amount, 0);
  const currency = useSelector(selectCurrency);
  const headerActions = filteredSortedBudgets?.length && (
    <>
      <div className="mr-auto flex gap-3">
        {filteredSortedBudgets?.length} {t("common.items")}
      </div>
      <div className="font-black lg:text-lg">
        <span className="mr-1">{t("common.total")}: </span>
        {formatPrice(totalAmount)}
        {currency}
      </div>
    </>
  );

  return (
    <Preloader isLoading={isLoading}>
      {createPortal(headerActions, document.getElementById("layout-header"))}
      {content && <div className="flex flex-col gap-4 lg:gap-8">{content}</div>}
    </Preloader>
  );
}
