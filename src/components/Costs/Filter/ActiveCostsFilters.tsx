import { useSelector } from "react-redux";
import { selectCostsFilterFields, selectCostsFilterValues } from "@/store/selectors/costs";
import { setCostsFilterValues } from "@/store/costsSlice";
import { memo, useMemo } from "react";
import { getActiveFilters } from "@/helpers/filters";
import { ClearActiveFilterItemHandler } from "@/types/filter";
import { ActiveFiltersList } from "@/components/Common/Filter/ActiveFiltersList";
import { isMultiSelectFormFieldId } from "@/predicates/form";
import { isMultiSelectValue } from "@/predicates/field";
import { isNumber } from "@/predicates/common";
import { useAppDispatch } from "@/hooks/redux";

export const ActiveCostsFilters = memo(function ActiveCostsFilters() {
  const dispatch = useAppDispatch();

  const costsFilterFields = useSelector(selectCostsFilterFields);
  const costsFilterValues = useSelector(selectCostsFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(costsFilterFields, costsFilterValues), [costsFilterFields, costsFilterValues]);

  const handleClearFilter: ClearActiveFilterItemHandler = ({ id, value }) => {
    const filterStateItemValue = costsFilterValues?.[id];
    if (isMultiSelectFormFieldId(id) && isNumber(value) && isMultiSelectValue(filterStateItemValue))
      dispatch(setCostsFilterValues([{ id: id, value: filterStateItemValue.filter((val) => val !== value) }]));
  };

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
