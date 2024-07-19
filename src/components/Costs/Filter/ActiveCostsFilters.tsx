import { useDispatch, useSelector } from "react-redux";
import { selectCostsFilterFields, selectCostsFilterValues } from "@/store/selectors/costs";
import { setCostsFilterValues } from "@/store/costsSlice";
import { memo, useMemo } from "react";
import { checkIsClearableFilter, getActiveFilters } from "@/helpers/filters";
import { HandleClearActiveFilterItem } from "@/types/filter";
import { FieldIds } from "@/types/field";
import { ActiveFiltersList } from "@/components/Common/Filter/ActiveFiltersList";

export const ActiveCostsFilters = memo(function ActiveCostsFilters() {
  const dispatch = useDispatch();

  const costsFilterFields = useSelector(selectCostsFilterFields);
  const costsFilterValues = useSelector(selectCostsFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(costsFilterFields, costsFilterValues), [costsFilterFields, costsFilterValues]);

  const handleClearFilter: HandleClearActiveFilterItem = ({ id, value }) => {
    if (checkIsClearableFilter({ id, value }) && id !== FieldIds.SORT && id !== FieldIds.PERIOD && Array.isArray(costsFilterValues?.[id]))
      dispatch(setCostsFilterValues([{ id, value: costsFilterValues?.[id]?.filter((val) => val !== value) }]));
  };

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
