import { AddNewCost } from "@/components/Costs/AddNewCost";
import { CostsFilter } from "@/components/Costs/filter/CostsFilter";
import { ActiveCostsFilters } from "@/components/Costs/filter/ActiveCostsFilters";
import { LazyList } from "@/components/Common/LazyList";
import { CostListItem } from "@/components/Costs/list/CostListItem";
import { Suspense } from "react";
import { CostDetail } from "@/components/Costs/CostDetail";
import { EmptyCosts } from "@/components/Costs/list/EmptyCosts";
import { FoundNothing } from "@/components/Common/FoundNothing";
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
