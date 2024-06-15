"use client";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AddNewCost } from "@/components/Costs/New/AddNewCost";
import { CostsFilter } from "@/components/Costs/Filter/CostsFilter";
import { ActiveCostsFilters } from "@/components/Costs/Filter/ActiveCostsFilters";
import { LazyList } from "@/components/Common/LazyList";
import { CostDetail } from "@/components/Costs/Detail/CostDetail";
import { EmptyCosts } from "@/components/Costs/List/EmptyCosts";
import { FoundNothing } from "@/components/Common/FoundNothing";
import { Preloader } from "@/components/Layout/Preloader";
import { selectCostsByFilter, selectCostsFilterValues, selectCostsList } from "@/store/selectors/costs";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { useLoading } from "@/hooks/loading";
import { Suspense, useCallback, useEffect } from "react";
import { getCostsListThunk, setCostsFilterValues } from "@/store/costsSlice";
import { INITIAL_COSTS_FILTER_FIELDS } from "@/constants/costs";
import { getUserId } from "@/helpers/localStorage";
import { selectCurrency } from "@/store/selectors/profile";
import { CostItem } from "@/components/Costs/List/CostItem";
import formatPrice from "@/helpers/formatPrice";
import { createPortal } from "react-dom";

export default function ExpensesContent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const costsFilterValues = useSelector(selectCostsFilterValues);
  const [isNotEqualParamsToFilters] = useFilterSearchParams(costsFilterValues, setCostsFilterValues);

  const [isLoading, setIsLoading] = useLoading(false);
  const costsList = useSelector(selectCostsList);
  const filteredSortedCosts = useSelector(selectCostsByFilter);
  const handleGetData = useCallback(async () => {
    if (!costsFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await dispatch(getCostsListThunk(costsFilterValues));
    setIsLoading(false);
  }, [costsFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect(() => {
    const injectAndLoadData = async () => {
      if (!costsFilterValues) {
        await import("@/store/costsSlice");
        await dispatch(setCostsFilterValues(INITIAL_COSTS_FILTER_FIELDS.map(({ id, value }) => ({ id, value }))));
      }
      if (!costsList) await handleGetData();
    };

    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  const totalAmount = filteredSortedCosts?.reduce((acc, { amount }) => acc + amount, 0);
  const currency = useSelector(selectCurrency);
  const headerActions = Array.isArray(filteredSortedCosts) && (
    <>
      <div className="mr-auto flex gap-1">
        <span data-cy="expenses-items-count">{filteredSortedCosts?.length}</span>
        {t("common.items")}
      </div>
      <div className="font-black lg:text-lg">
        <span className="mr-1">{t("common.total")}: </span>
        {formatPrice(totalAmount)}
        {currency}
      </div>
    </>
  );

  let content;
  if (filteredSortedCosts?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewCost isAdaptive onSave={handleGetData} />
            <CostsFilter onSave={handleGetData} />
          </div>
          <ActiveCostsFilters />
        </div>
        <LazyList items={filteredSortedCosts} Item={CostItem} />
        <Suspense fallback={<div />}>
          <CostDetail onSave={handleGetData} />
        </Suspense>
      </>
    );
  else if (!costsList?.length) content = <EmptyCosts addNew={<AddNewCost onSave={handleGetData} />} />;
  else if (costsList?.length && !filteredSortedCosts?.length)
    content = content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewCost isAdaptive onSave={handleGetData} />
            <CostsFilter onSave={handleGetData} />
          </div>
          <ActiveCostsFilters />
        </div>
        <FoundNothing />
      </>
    );

  return (
    <Preloader isLoading={isLoading}>
      {createPortal(headerActions, document.getElementById("layout-header"))}
      {content && <div className="flex flex-col gap-4 lg:gap-8">{content}</div>}
    </Preloader>
  );
}
