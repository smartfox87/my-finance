import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectCostsFilterFields, selectCostsFilterValues } from "@/store/selectors/costs.js";
import { useTranslation } from "react-i18next";
import { setCostsFilterValues } from "@/store/costsSlice";
import { memo } from "react";
import { checkIsClearableFilter } from "@/helpers/filters.js";
import SvgCrossBold from "@/assets/sprite/cross-bold.svg";

export const ActiveCostsFilters = memo(function ActiveCostsFilters() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const costsFilterFields = useSelector(selectCostsFilterFields);
  const costsFilterValues = useSelector(selectCostsFilterValues);

  const activeFilters = costsFilterFields.reduce((acc, { id, label_translation, optionsObject }) => {
    if (id === "period")
      acc.push({
        id,
        label: t(`fields.${label_translation}`),
        value: costsFilterValues[id][0] === costsFilterValues[id][1] ? costsFilterValues[id][0] : costsFilterValues[id].join(" - "),
      });
    else if (Array.isArray(costsFilterValues[id])) acc.push(...costsFilterValues[id].map((value) => ({ id, label: t(`fields.${label_translation}`), value, textValue: optionsObject?.[value] })));
    else acc.push({ id, label: t(`fields.${label_translation}`), value: costsFilterValues[id], textValue: optionsObject?.[costsFilterValues[id]] });
    return acc;
  }, []);

  const handleClearFilter = ({ id, value }) => (checkIsClearableFilter({ id, value }) ? dispatch(setCostsFilterValues([{ id, value: costsFilterValues[id].filter((val) => val !== value) }])) : null);

  return (
    <ul className="flex flex-wrap gap-2">
      {activeFilters.map(({ id, label, value, textValue }) => (
        <li key={`${id}_${value}`}>
          <Button
            type="primary"
            size="small"
            data-cy={checkIsClearableFilter({ id, value }) ? `active-filter-${id}` : undefined}
            className="!flex items-center gap-1"
            onClick={() => handleClearFilter({ id, value })}
          >
            <span>{label}:</span>
            <span className="font-bold">{textValue || value}</span>
            {checkIsClearableFilter({ id, value }) && <SvgCrossBold className="ml-1 h-2.5 w-2.5" />}
          </Button>
        </li>
      ))}
    </ul>
  );
});
