import { selectIncomesFilterFields, selectIncomesFilterValues } from "@/store/selectors/incomes";
import { memo, useMemo } from "react";
import { getActiveFilters } from "@/helpers/filters";
import { ActiveFiltersList } from "@/components/common/filter/ActiveFiltersList";
import { isMultiSelectFormFieldId } from "@/predicates/form";
import { isNumber } from "@/predicates/common";
import { isMultiSelectValue } from "@/predicates/field";
import { setIncomesFilterValues } from "@/store/slices/incomesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import type { ClearActiveFilterItemHandler } from "@/types/filter";

export const ActiveIncomesFilters = memo(function ActiveIncomesFilters() {
  const dispatch = useAppDispatch();

  const incomesFilterFields = useAppSelector(selectIncomesFilterFields);
  const incomesFilterValues = useAppSelector(selectIncomesFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(incomesFilterFields, incomesFilterValues), [incomesFilterFields, incomesFilterValues]);

  const handleClearFilter: ClearActiveFilterItemHandler = ({ id, value }) => {
    const filterStateItemValue = incomesFilterValues?.[id];
    if (isMultiSelectFormFieldId(id) && isNumber(value) && isMultiSelectValue(filterStateItemValue))
      dispatch(setIncomesFilterValues([{ id, value: filterStateItemValue.filter((val) => val !== value) }]));
  };

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
