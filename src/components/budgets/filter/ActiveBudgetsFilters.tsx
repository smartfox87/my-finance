import { useSelector } from "react-redux";
import { selectBudgetsFilterFields, selectBudgetsFilterValues } from "@/store/selectors/budgets";
import { setBudgetsFilterValues } from "@/store/slices/budgetsSlice";
import { memo, useMemo } from "react";
import { getActiveFilters } from "@/helpers/filters";
import { ActiveFiltersList } from "@/components/common/filter/ActiveFiltersList";
import { isMultiSelectFormFieldId } from "@/predicates/form";
import { isNumber } from "@/predicates/common";
import { isMultiSelectValue } from "@/predicates/field";
import { useAppDispatch } from "@/types/store";
import type { ActiveFilterItemValue } from "@/types/filter";

export const ActiveBudgetsFilters = memo(function ActiveBudgetsFilters() {
  const dispatch = useAppDispatch();

  const budgetsFilterFields = useSelector(selectBudgetsFilterFields);
  const budgetsFilterValues = useSelector(selectBudgetsFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(budgetsFilterFields, budgetsFilterValues), [budgetsFilterFields, budgetsFilterValues]);

  const handleClearFilter = ({ id, value }: ActiveFilterItemValue): void => {
    const filterStateItemValue = budgetsFilterValues?.[id];
    if (isMultiSelectFormFieldId(id) && isNumber(value) && isMultiSelectValue(filterStateItemValue))
      dispatch(setBudgetsFilterValues([{ id, value: filterStateItemValue.filter((val) => val !== value) }]));
  };

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
