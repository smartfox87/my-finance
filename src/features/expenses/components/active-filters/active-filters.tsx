import { selectCostsFilterFields, selectCostsFilterValues } from "../../selectors";
import { setCostsFilterValues } from "../../store";
import { memo, useMemo } from "react";
import { getActiveFilters } from "@/helpers/filters";
import { ActiveFiltersList } from "@/components/common/filter/ActiveFiltersList";
import { isMultiSelectFormFieldId } from "@/predicates/form";
import { isMultiSelectValue } from "@/predicates/field";
import { isNumber } from "@/predicates/common";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import type { ClearActiveFilterItemHandler } from "@/types/filter";

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
