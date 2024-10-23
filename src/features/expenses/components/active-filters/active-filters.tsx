import { selectCostsFilterFields, selectCostsFilterValues } from "../../selectors";
import { setCostsFilterValues } from "../../store";
import { memo, useMemo } from "react";
import { isMultiSelectValue, isMultiSelectFormFieldId } from "@/features/fields";
import { isNumber } from "@/predicates/common";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { type ClearActiveFilterItemHandler, ActiveFiltersList, getActiveFilters } from "@/features/filter";

export const ActiveFilters = memo(function ActiveCostsFilters() {
  const dispatch = useAppDispatch();

  const costsFilterFields = useAppSelector(selectCostsFilterFields);
  const costsFilterValues = useAppSelector(selectCostsFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(costsFilterFields, costsFilterValues), [costsFilterFields, costsFilterValues]);

  const handleClearFilter: ClearActiveFilterItemHandler = ({ id, value }) => {
    const filterStateItemValue = costsFilterValues?.[id];
    if (isMultiSelectFormFieldId(id) && isNumber(value) && isMultiSelectValue(filterStateItemValue))
      dispatch(setCostsFilterValues([{ id: id, value: filterStateItemValue.filter((val) => val !== value) }]));
  };

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
