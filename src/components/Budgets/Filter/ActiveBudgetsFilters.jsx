import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectBudgetsFilterFields, selectBudgetsFilterValues } from "@/store/selectors/budgets.js";
import { useTranslation } from "react-i18next";
import { setBudgetsFilterValues } from "@/store/budgetsSlice";
import { memo } from "react";
import { checkIsClearableFilter } from "@/helpers/filters.js";
import SvgCrossBold from "@/assets/sprite/cross-bold.svg";

export const ActiveBudgetsFilters = memo(function ActiveBudgetsFilters() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const budgetsFilterFields = useSelector(selectBudgetsFilterFields);
  const budgetsFilterValues = useSelector(selectBudgetsFilterValues);

  const activeFilters = budgetsFilterFields.reduce((acc, { id, label_translation, optionsObject }) => {
    if (id === "period")
      acc.push({
        id,
        label: t(`fields.${label_translation}`),
        value: budgetsFilterValues[id][0] === budgetsFilterValues[id][1] ? budgetsFilterValues[id][0] : budgetsFilterValues[id].join(" - "),
      });
    else if (Array.isArray(budgetsFilterValues[id])) acc.push(...budgetsFilterValues[id].map((value) => ({ id, label: t(`fields.${label_translation}`), value, textValue: optionsObject?.[value] })));
    else acc.push({ id, label: t(`fields.${label_translation}`), value: budgetsFilterValues[id], textValue: optionsObject?.[budgetsFilterValues[id]] });
    return acc;
  }, []);

  const handleClearFilter = ({ id, value }) =>
    checkIsClearableFilter({ id, value }) ? dispatch(setBudgetsFilterValues([{ id, value: budgetsFilterValues[id].filter((val) => val !== value) }])) : null;

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
