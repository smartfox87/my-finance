import { selectIncomesFilterFields, selectIncomesFilterValues } from "../../selectors";
import { memo, useMemo } from "react";
import { isNumber } from "@/predicates/common";
import { isMultiSelectValue, isMultiSelectFormFieldId } from "@/features/fields";
import { setIncomesFilterValues } from "../../store";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { type ClearActiveFilterItemHandler, ActiveFiltersList, getActiveFilters } from "@/features/filter";

export const ActiveFilters = memo(function ActiveIncomesFilters() {
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
