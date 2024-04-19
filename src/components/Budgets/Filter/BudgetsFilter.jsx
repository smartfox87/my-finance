import { useDispatch, useSelector } from "react-redux";
import { setBudgetsFilterValues } from "@/store/budgetsSlice.js";
import { selectBudgetsFilterFields, selectBudgetsFilterValues } from "@/store/selectors/budgets.js";
import { useTranslation } from "react-i18next";
import { Select, Button } from "antd";
import { handleFilterSelectOptions } from "@/helpers/fields.ts";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport.js";
import { PeriodField } from "@/components/Form/PeriodField.jsx";
import { useFilterFocus } from "@/hooks/filterFocus.js";
import { setFilterValue } from "@/helpers/filters.js";

export const BudgetsFilter = memo(function BudgetsFilter({ onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { viewport } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const [isInitialized, setIsInitialized] = useState(false);
  const [fieldRef] = useFilterFocus(isOpen, isInitialized);

  const budgetsFilterFields = useSelector(selectBudgetsFilterFields);
  const budgetsFilterValues = useSelector(selectBudgetsFilterValues);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    setFilterValues(JSON.parse(JSON.stringify(budgetsFilterValues)));
  }, [budgetsFilterValues]);

  const handleChangeFieldValue = (field) => setFilterValues((prevState) => setFilterValue(prevState, field));
  const handleApplyFilters = () => {
    dispatch(setBudgetsFilterValues(Object.entries(filterValues).map(([id, value]) => ({ id, value }))));
    if (JSON.stringify(budgetsFilterValues.period) !== JSON.stringify(filterValues.period)) onSave();
    handleToggleVisibility();
  };
  const submitBtn = (
    <Button size="large" className="w-full" onClick={handleApplyFilters}>
      {t("buttons.apply")}
    </Button>
  );

  return (
    <>
      <Button size="large" className="!flex items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgFilter className="h-5 w-5" />
        {!["xs", "xxs"].includes(viewport) && t("buttons.set_filters")}
      </Button>
      <SideModal title={t("titles.set_filters")} isOpen={isOpen} footer={submitBtn} onClose={handleToggleVisibility} onInit={setIsInitialized}>
        <ul className="flex w-full flex-col gap-4">
          {budgetsFilterFields.map(({ id, type, label, label_translation, options, options_prefix, showSearch, multiple }, index) => (
            <li key={id} className="flex flex-col gap-4">
              {type === "select" && (
                <Select
                  ref={!index ? fieldRef : null}
                  className="w-full"
                  size="large"
                  mode={multiple ? "multiple" : ""}
                  label={label_translation ? t(`fields.${label_translation}`) : label}
                  value={filterValues[id]}
                  options={options?.map(({ option, label, label_translation, value }) => ({
                    label: option || (label_translation ? `${options_prefix ? `${t(`fields.${options_prefix}`)} ` : ""}${t(`fields.${label_translation}`)}` : label || value),
                    value,
                  }))}
                  showSearch={showSearch}
                  filterOption={showSearch ? handleFilterSelectOptions : null}
                  onChange={(value) => handleChangeFieldValue({ id, value })}
                />
              )}
              {type === "period" && <PeriodField value={filterValues[id]} onChange={(value) => handleChangeFieldValue({ id, value })} />}
            </li>
          ))}
        </ul>
      </SideModal>
    </>
  );
});
