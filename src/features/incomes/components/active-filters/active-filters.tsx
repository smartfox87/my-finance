import { selectIncomesFilterFields, selectIncomesFilterValues } from "../../selectors";
import { memo, useMemo } from "react";
import { getActiveFilters } from "@/features/filter";
import { ActiveFiltersList } from "@/features/filter";
import { isMultiSelectFormFieldId } from "@/features/default-form";
import { isNumber } from "@/predicates/common";
import { isMultiSelectValue } from "@/features/default-form";
import { setIncomesFilterValues } from "../../store";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import type { ClearActiveFilterItemHandler } from "@/features/filter";

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
