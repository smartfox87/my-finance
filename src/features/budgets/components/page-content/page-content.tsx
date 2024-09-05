import { Suspense } from "react";
import { selectBudgetsByFilter, selectBudgetsList } from "../../selectors";
import { AddNew } from "../add-new";
import { Filter } from "../filter";
import { ActiveFilters } from "../active-filters";
import { LazyList } from "@/components/list/lazy-list";
import { Item } from "../item";
import { Detail } from "../detail";
import { Empty } from "../empty";
import { FoundNothing } from "@/components/list/found-nothing";
import { useAppSelector } from "@/hooks/store";
import type { PageContentProps } from "@/types/common";

export function PageContent({ onGetData }: PageContentProps) {
  const budgetsList = useAppSelector(selectBudgetsList);
  const filteredSortedBudgets = useAppSelector(selectBudgetsByFilter);

  let content = null;
  if (filteredSortedBudgets?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNew isAdaptive onSave={onGetData} />
            <Filter onSave={onGetData} />
          </div>
          <ActiveFilters />
        </div>
        <LazyList items={filteredSortedBudgets} Item={Item} />
        <Suspense fallback={<div />}>
          <Detail onSave={onGetData} />
        </Suspense>
      </>
    );
  else if (!budgetsList?.length) content = <Empty addNew={<AddNew onSave={onGetData} />} />;
  else if (budgetsList?.length && !filteredSortedBudgets?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNew isAdaptive onSave={onGetData} />
            <Filter onSave={onGetData} />
          </div>
        </div>
        <ActiveFilters />
        <FoundNothing />
      </>
    );

  return content && <div className="flex flex-col gap-4 lg:gap-8">{content}</div>;
}
