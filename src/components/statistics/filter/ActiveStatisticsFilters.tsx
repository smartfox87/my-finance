import { selectStatisticsFilterFields, selectStatisticsFilterValues } from "@/store/selectors/statistics";
import { setStatisticsFilterValues } from "@/store/slices/statisticsSlice";
import { memo, useMemo } from "react";
import { getActiveFilters } from "@/helpers/filters";
import { ActiveFiltersList } from "@/components/common/filter/ActiveFiltersList";
import { isMultiSelectFormFieldId } from "@/predicates/form";
import { isNumber } from "@/predicates/common";
import { isMultiSelectValue } from "@/predicates/field";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import type { ClearActiveFilterItemHandler } from "@/types/filter";

export const ActiveStatisticsFilters = memo(function ActiveStatisticsFilters() {
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
