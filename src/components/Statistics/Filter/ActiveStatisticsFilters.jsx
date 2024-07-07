import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectStatisticsFilterFields, selectStatisticsFilterValues } from "@/store/selectors/statistics.js";
import { useTranslation } from "react-i18next";
import { setStatisticsFilterValues } from "@/store/statisticsSlice";
import { memo } from "react";
import { checkIsClearableFilter } from "@/helpers/filters";
import SvgCrossBold from "@/assets/sprite/cross-bold.svg";
import { FieldIds } from "@/types/field";

export const ActiveStatisticsFilters = memo(function ActiveStatisticsFilters() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const statisticsFilterFields = useSelector(selectStatisticsFilterFields);
  const statisticsFilterValues = useSelector(selectStatisticsFilterValues);

  const activeFilters = statisticsFilterFields.reduce((acc, { id, label, optionsObject }) => {
    if (id === FieldIds.PERIOD)
      acc.push({
        id,
        label: t(`fields.${label}`),
        value: statisticsFilterValues[id][0] === statisticsFilterValues[id][1] ? statisticsFilterValues[id][0] : statisticsFilterValues[id].join(" - "),
      });
    else if (Array.isArray(statisticsFilterValues[id])) acc.push(...statisticsFilterValues[id].map((value) => ({ id, label: t(`fields.${label}`), value, textValue: optionsObject?.[value] })));
    else acc.push({ id, label: t(`fields.${label}`), value: statisticsFilterValues[id], textValue: optionsObject?.[statisticsFilterValues[id]] });
    return acc;
  }, []);

  const handleClearFilter = ({ id, value }) =>
    checkIsClearableFilter({ id, value }) ? dispatch(setStatisticsFilterValues([{ id, value: statisticsFilterValues[id].filter((val) => val !== value) }])) : null;

  return (
    <ul className="flex flex-wrap gap-2">
      {activeFilters.map(({ id, label, value, textValue }) => (
        <li key={`${id}_${value}`}>
          <Button type="primary" size="small" className="!flex items-center gap-1" onClick={() => handleClearFilter({ id, value })}>
            <span>{label}:</span>
            <span className="font-bold">{textValue || value}</span>
            {checkIsClearableFilter({ id, value }) && <SvgCrossBold className="ml-1 h-2.5 w-2.5" />}
          </Button>
        </li>
      ))}
    </ul>
  );
});
