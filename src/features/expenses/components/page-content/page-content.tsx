import { AddNew } from "../add-new";
import { Filter } from "../filter";
import { ActiveFilters } from "../active-filters";
import { LazyList } from "@/components/list/lazy-list";
import { Item } from "../item";
import { Detail } from "../detail";
import { Empty } from "../empty";
import { FoundNothing } from "@/components/list/found-nothing";
import { selectCostsByFilter, selectCostsList } from "../../selectors";
import { useAppSelector } from "@/hooks/store";
import type { PageContentProps } from "@/types/common";

export const PageContent = ({ onGetData }: PageContentProps) => {
  const costsList = useAppSelector(selectCostsList);
  const filteredSortedCosts = useAppSelector(selectCostsByFilter);

  let content;
  if (filteredSortedCosts?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNew isAdaptive onSave={onGetData} />
            <Filter onSave={onGetData} />
          </div>
          <ActiveFilters />
        </div>
        <LazyList items={filteredSortedCosts} Item={Item} />
        <Detail onSave={onGetData} />
      </>
    );
  else if (!costsList?.length) content = <Empty addNew={<AddNew onSave={onGetData} />} />;
  else if (costsList?.length && !filteredSortedCosts?.length)
    content = content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNew isAdaptive onSave={onGetData} />
            <Filter onSave={onGetData} />
          </div>
          <ActiveFilters />
        </div>
        <FoundNothing />
      </>
    );

  return content && <div className="flex flex-col gap-4 xl:gap-8">{content}</div>;
};
