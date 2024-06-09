import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectIncomesFilterFields, selectIncomesFilterValues } from "@/store/selectors/incomes.js";
import { useTranslation } from "react-i18next";
import { setIncomesFilterValues } from "@/store/incomesSlice";
import { memo } from "react";
import { checkIsClearableFilter } from "@/helpers/filters.js";
import SvgCrossBold from "@/assets/sprite/cross-bold.svg";

export const ActiveIncomesFilters = memo(function ActiveIncomesFilters() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const incomesFilterFields = useSelector(selectIncomesFilterFields);
  const incomesFilterValues = useSelector(selectIncomesFilterValues);

  const activeFilters = incomesFilterFields.reduce((acc, { id, label_translation, optionsObject }) => {
    if (id === "period")
      acc.push({
        id,
        label: t(`fields.${label_translation}`),
        value: incomesFilterValues[id][0] === incomesFilterValues[id][1] ? incomesFilterValues[id][0] : incomesFilterValues[id].join(" - "),
      });
    else if (Array.isArray(incomesFilterValues[id])) acc.push(...incomesFilterValues[id].map((value) => ({ id, label: t(`fields.${label_translation}`), value, textValue: optionsObject?.[value] })));
    else acc.push({ id, label: t(`fields.${label_translation}`), value: incomesFilterValues[id], textValue: optionsObject?.[incomesFilterValues[id]] });
    return acc;
  }, []);

  const handleClearFilter = ({ id, value }) =>
    checkIsClearableFilter({ id, value }) ? dispatch(setIncomesFilterValues([{ id, value: incomesFilterValues[id].filter((val) => val !== value) }])) : null;

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
