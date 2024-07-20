import { useDispatch, useSelector } from "react-redux";
import { selectIncomesFilterFields, selectIncomesFilterValues } from "@/store/selectors/incomes";
import { memo, useMemo } from "react";
import { checkIsClearableFilter, getActiveFilters } from "@/helpers/filters";
import { ActiveFiltersList } from "@/components/Common/Filter/ActiveFiltersList";
import { ClearActiveFilterItemHandler } from "@/types/filter";
import { FieldIds } from "@/types/field";
import { setCostsFilterValues } from "@/store/costsSlice";

export const ActiveIncomesFilters = memo(function ActiveIncomesFilters() {
  const dispatch = useDispatch();

  const incomesFilterFields = useSelector(selectIncomesFilterFields);
  const incomesFilterValues = useSelector(selectIncomesFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(incomesFilterFields, incomesFilterValues), [incomesFilterFields, incomesFilterValues]);

  const handleClearFilter: ClearActiveFilterItemHandler = ({ id, value }) => {
    if (checkIsClearableFilter({ id, value }) && id !== FieldIds.SORT && id !== FieldIds.PERIOD && Array.isArray(incomesFilterValues?.[id]))
      dispatch(setCostsFilterValues([{ id, value: incomesFilterValues?.[id]?.filter((val) => val !== value) }]));
  };

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
