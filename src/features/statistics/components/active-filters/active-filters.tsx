import { selectStatisticsFilterFields, selectStatisticsFilterValues } from "../../selectors";
import { setStatisticsFilterValues } from "../../store";
import { memo, useMemo } from "react";
import { isNumber } from "@/predicates/common";
import { isMultiSelectValue, isMultiSelectFormFieldId } from "@/features/fields";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { type ClearActiveFilterItemHandler, ActiveFiltersList, getActiveFilters } from "@/features/filter";

export const ActiveFilters = memo(function ActiveStatisticsFilters() {
  const dispatch = useAppDispatch();

  const statisticsFilterFields = useAppSelector(selectStatisticsFilterFields);
  const statisticsFilterValues = useAppSelector(selectStatisticsFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(statisticsFilterFields, statisticsFilterValues), [statisticsFilterFields, statisticsFilterValues]);

  const handleClearFilter: ClearActiveFilterItemHandler = ({ id, value }) => {
    const filterStateItemValue = statisticsFilterValues?.[id];
    if (isMultiSelectFormFieldId(id) && isNumber(value) && isMultiSelectValue(filterStateItemValue))
      dispatch(setStatisticsFilterValues([{ id: id, value: filterStateItemValue.filter((val) => val !== value) }]));
  };

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
