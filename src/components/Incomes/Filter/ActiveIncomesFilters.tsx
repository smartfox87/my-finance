import { useSelector } from "react-redux";
import { selectIncomesFilterFields, selectIncomesFilterValues } from "@/store/selectors/incomes";
import { memo, useMemo } from "react";
import { getActiveFilters } from "@/helpers/filters";
import { ActiveFiltersList } from "@/components/Common/Filter/ActiveFiltersList";
import { ClearActiveFilterItemHandler } from "@/types/filter";
import { isMultiSelectFormFieldId } from "@/predicates/form";
import { isNumber } from "@/predicates/common";
import { isMultiSelectValue } from "@/predicates/field";
import { setIncomesFilterValues } from "@/store/incomesSlice";
import { useAppDispatch } from "@/hooks/redux";

export const ActiveIncomesFilters = memo(function ActiveIncomesFilters() {
  const dispatch = useAppDispatch();

  const incomesFilterFields = useSelector(selectIncomesFilterFields);
  const incomesFilterValues = useSelector(selectIncomesFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(incomesFilterFields, incomesFilterValues), [incomesFilterFields, incomesFilterValues]);

  const handleClearFilter: ClearActiveFilterItemHandler = ({ id, value }) => {
    const filterStateItemValue = incomesFilterValues?.[id];
    if (isMultiSelectFormFieldId(id) && isNumber(value) && isMultiSelectValue(filterStateItemValue))
      dispatch(setIncomesFilterValues([{ id, value: filterStateItemValue.filter((val) => val !== value) }]));
  };

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
