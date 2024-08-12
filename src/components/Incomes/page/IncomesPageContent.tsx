import { AddNewIncome } from "@/components/Incomes/AddNewIncome";
import { IncomesFilter } from "@/components/Incomes/filter/IncomesFilter";
import { ActiveIncomesFilters } from "@/components/Incomes/filter/ActiveIncomesFilters";
import { LazyList } from "@/components/Common/LazyList";
import { IncomeListItem } from "@/components/Incomes/list/IncomeListItem";
import { Suspense } from "react";
import { IncomeDetail } from "@/components/Incomes/IncomeDetail";
import { EmptyIncomes } from "@/components/Incomes/list/EmptyIncomes";
import { FoundNothing } from "@/components/Common/FoundNothing";
import { useSelector } from "react-redux";
import { selectIncomesByFilter, selectIncomesList } from "@/store/selectors/incomes";
import type { PageContentProps } from "@/types/common";

export const IncomesPageContent = ({ onGetData }: PageContentProps) => {
  const incomesList = useSelector(selectIncomesList);
  const filteredSortedIncomes = useSelector(selectIncomesByFilter);

  let content;
  if (filteredSortedIncomes?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewIncome isAdaptive onSave={onGetData} />
            <IncomesFilter onSave={onGetData} />
          </div>
          <ActiveIncomesFilters />
        </div>
        <LazyList items={filteredSortedIncomes} Item={IncomeListItem} />
        <Suspense fallback={<div />}>
          <IncomeDetail onSave={onGetData} />
        </Suspense>
      </>
    );
  else if (!incomesList?.length) content = <EmptyIncomes addNew={<AddNewIncome onSave={onGetData} />} />;
  else if (incomesList?.length && !filteredSortedIncomes?.length)
    content = content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewIncome isAdaptive onSave={onGetData} />
            <IncomesFilter onSave={onGetData} />
          </div>
          <ActiveIncomesFilters />
        </div>
        <FoundNothing />
      </>
    );

  return content && <div className="flex flex-col gap-4 lg:gap-8">{content}</div>;
};
