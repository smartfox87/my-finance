import { useSelector } from "react-redux";
import { Suspense } from "react";
import { selectBudgetsByFilter, selectBudgetsList } from "@/store/selectors/budgets";
import { AddNewBudget } from "@/components/Budgets/New/AddNewBudget";
import { BudgetsFilter } from "@/components/Budgets/Filter/BudgetsFilter";
import { ActiveBudgetsFilters } from "@/components/Budgets/Filter/ActiveBudgetsFilters";
import { LazyList } from "@/components/Common/LazyList";
import { BudgetItem } from "@/components/Budgets/List/BudgetItem";
import { BudgetDetail } from "@/components/Budgets/Detail/BudgetDetail";
import { EmptyBudgets } from "@/components/Budgets/List/EmptyBudgets";
import { FoundNothing } from "@/components/Common/FoundNothing";

export default function BudgetsPageContent({ onGetData }: { onGetData: () => Promise<void> }) {
  const budgetsList = useSelector(selectBudgetsList);
  const filteredSortedBudgets = useSelector(selectBudgetsByFilter);

  let content = null;
  if (filteredSortedBudgets?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewBudget isAdaptive onSave={onGetData} />
            <BudgetsFilter onSave={onGetData} />
          </div>
          <ActiveBudgetsFilters />
        </div>
        <LazyList items={filteredSortedBudgets} Item={BudgetItem} />
        <Suspense fallback={<div />}>
          <BudgetDetail onSave={onGetData} />
        </Suspense>
      </>
    );
  else if (!budgetsList?.length) content = <EmptyBudgets addNew={<AddNewBudget onSave={onGetData} />} />;
  else if (budgetsList?.length && !filteredSortedBudgets?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewBudget isAdaptive onSave={onGetData} />
            <BudgetsFilter onSave={onGetData} />
          </div>
        </div>
        <ActiveBudgetsFilters />
        <FoundNothing />
      </>
    );

  return content && <div className="flex flex-col gap-4 lg:gap-8">{content}</div>;
}
