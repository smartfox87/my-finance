import { useDispatch, useSelector } from "react-redux";
import { selectBudgetsFilterFields, selectBudgetsFilterValues } from "@/store/selectors/budgets";
import { setBudgetsFilterValues } from "@/store/budgetsSlice";
import { memo, useMemo } from "react";
import { checkIsClearableFilter, getActiveFilters } from "@/helpers/filters";
import { FieldIds } from "@/types/field";
import { ActiveFilterItemValue } from "@/types/filter";
import { ActiveFiltersList } from "@/components/Common/ActiveFiltersList";

export const ActiveBudgetsFilters = memo(function ActiveBudgetsFilters() {
  const dispatch = useDispatch();

  const budgetsFilterFields = useSelector(selectBudgetsFilterFields);
  const budgetsFilterValues = useSelector(selectBudgetsFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(budgetsFilterFields, budgetsFilterValues), [budgetsFilterFields, budgetsFilterValues]);

  const handleClearFilter = ({ id, value }: ActiveFilterItemValue) =>
    checkIsClearableFilter({ id, value }) && id !== FieldIds.SORT && id !== FieldIds.PERIOD && Array.isArray(budgetsFilterValues?.[id])
      ? dispatch(setBudgetsFilterValues([{ id, value: budgetsFilterValues?.[id]?.filter((val) => val !== value) }]))
      : null;

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
