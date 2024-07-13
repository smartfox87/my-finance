import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectCostsFilterFields, selectCostsFilterValues } from "@/store/selectors/costs";
import { setCostsFilterValues } from "@/store/costsSlice";
import { memo, useMemo } from "react";
import { checkIsClearableFilter, getActiveFilters } from "@/helpers/filters";
import SvgCrossBold from "@/assets/sprite/cross-bold.svg";
import { ActiveFilterItemValue } from "@/types/filter";
import { FieldIds } from "@/types/field";

export const ActiveCostsFilters = memo(function ActiveCostsFilters() {
  const dispatch = useDispatch();

  const costsFilterFields = useSelector(selectCostsFilterFields);
  const costsFilterValues = useSelector(selectCostsFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(costsFilterFields, costsFilterValues), [costsFilterFields, costsFilterValues]);

  const handleClearFilter = ({ id, value }: ActiveFilterItemValue) =>
    checkIsClearableFilter({ id, value }) && id !== FieldIds.SORT && id !== FieldIds.PERIOD && Array.isArray(costsFilterValues?.[id])
      ? dispatch(setCostsFilterValues([{ id, value: costsFilterValues?.[id]?.filter((val) => val !== value) }]))
      : null;

  return (
    <ul className="flex flex-wrap gap-2">
      {activeFilters.map((item) => (
        <li key={`${item.id}_${item.value}`}>
          <Button
            type="primary"
            size="small"
            data-cy={checkIsClearableFilter({ id: item.id, value: item.value }) ? `active-filter-${item.id}` : undefined}
            className="!flex items-center gap-1"
            onClick={() => handleClearFilter({ id: item.id, value: item.value })}
          >
            <span>{item.label}:</span>
            <span className="font-bold">{"textValue" in item ? item.textValue : item.value}</span>
            {checkIsClearableFilter({ id: item.id, value: item.value }) && <SvgCrossBold className="ml-1 h-2.5 w-2.5" />}
          </Button>
        </li>
      ))}
    </ul>
  );
});
