import { AddNewCost } from "@/components/costs/AddNewCost";
import { CostsFilter } from "@/components/costs/filter/CostsFilter";
import { ActiveCostsFilters } from "@/components/costs/filter/ActiveCostsFilters";
import { LazyList } from "@/components/common/list/LazyList";
import { CostListItem } from "@/components/costs/list/CostListItem";
import { Suspense } from "react";
import { CostDetail } from "@/components/costs/CostDetail";
import { EmptyCosts } from "@/components/costs/list/EmptyCosts";
import { FoundNothing } from "@/components/common/list/FoundNothing";
import { useSelector } from "react-redux";
import { selectCostsByFilter, selectCostsList } from "@/store/selectors/costs";
import type { PageContentProps } from "@/types/common";

export const ExpensesPageContent = ({ onGetData }: PageContentProps) => {
  const costsList = useSelector(selectCostsList);
  const filteredSortedCosts = useSelector(selectCostsByFilter);

  let content;
  if (filteredSortedCosts?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewCost isAdaptive onSave={onGetData} />
            <CostsFilter onSave={onGetData} />
          </div>
          <ActiveCostsFilters />
        </div>
        <LazyList items={filteredSortedCosts} Item={CostListItem} />
        <Suspense fallback={<div />}>
          <CostDetail onSave={onGetData} />
        </Suspense>
      </>
    );
  else if (!costsList?.length) content = <EmptyCosts addNew={<AddNewCost onSave={onGetData} />} />;
  else if (costsList?.length && !filteredSortedCosts?.length)
    content = content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewCost isAdaptive onSave={onGetData} />
            <CostsFilter onSave={onGetData} />
          </div>
          <ActiveCostsFilters />
        </div>
        <FoundNothing />
      </>
    );

  return content && <div className="flex flex-col gap-4 lg:gap-8">{content}</div>;
};
