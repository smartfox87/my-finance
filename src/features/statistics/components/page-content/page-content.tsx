import { Total } from "../total";
import { ExpensesIncomes } from "../expenses-incomes";
import { ExpensesBudgets } from "../expenses-budgets";
import { ExpensesCategories } from "../expenses-categories";
import { IncomesCategories } from "../incomes-categories";
import { Filter } from "../filter";
import { ActiveFilters } from "../active-filters";
import { FoundNothing } from "@/components/list/found-nothing";
import { selectCostCategories, selectIncomeCategories } from "@/store/selectors/references";
import { selectBudgetsListForChartsByFilter, selectCostsListForChartsByFilter, selectIncomesListForChartsByFilter, selectIsStatisticsFilterValuesChanged } from "../../selectors";
import { useAppSelector } from "@/hooks/store";
import { Empty } from "../empty";
import type { PageContentProps } from "@/types/common";

export const PageContent = ({ isFilterValuesFilled, onGetData }: PageContentProps & { isFilterValuesFilled: boolean }) => {
  const costCategories = useAppSelector(selectCostCategories);
  const incomeCategories = useAppSelector(selectIncomeCategories);
  const costsListForCharts = useAppSelector(selectCostsListForChartsByFilter);
  const budgetsListForCharts = useAppSelector(selectBudgetsListForChartsByFilter);
  const incomesListForCharts = useAppSelector(selectIncomesListForChartsByFilter);
  const isFilterValuesChanged = useAppSelector(selectIsStatisticsFilterValuesChanged);

  const charts = (
    <>
      <Total />
      <ExpensesBudgets />
      <ExpensesIncomes />
      <ExpensesCategories />
      <IncomesCategories />
    </>
  );

  let content = <Empty />;
  if (costCategories && incomeCategories) {
    content = (
      <>
        {isFilterValuesFilled && (
          <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
            <div className="grid grid-cols-2 gap-4">
              <Filter onSave={onGetData} />
            </div>
            <ActiveFilters />
          </div>
        )}
        {costsListForCharts?.length || incomesListForCharts?.length || budgetsListForCharts?.length ? charts : isFilterValuesChanged && <FoundNothing />}
      </>
    );
  }
  return content;
};
