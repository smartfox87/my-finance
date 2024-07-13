import { useDispatch, useSelector } from "react-redux";
import { setIncomesFilterValues } from "@/store/incomesSlice";
import { selectIncomesFilterFields, selectIncomesFilterValues } from "@/store/selectors/incomes";
import { useTranslation } from "react-i18next";
import { Select, Button } from "antd";
import { handleFilterSelectOptions, renderSelectOption } from "@/helpers/fields";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport";
import { PeriodField } from "@/components/Form/PeriodField";
import { setFilterValue } from "@/helpers/filters";
import { useFilterFocus } from "@/hooks/filterFocus.js";
import { FieldTypes } from "@/types/field";

export const IncomesFilter = memo(function IncomesFilter({ onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { viewport } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const [isInitialized, setIsInitialized] = useState(false);
  const [fieldRef] = useFilterFocus(isOpen, isInitialized);

  const incomesFilterFields = useSelector(selectIncomesFilterFields);
  const incomesFilterValues = useSelector(selectIncomesFilterValues);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    setFilterValues(JSON.parse(JSON.stringify(incomesFilterValues)));
  }, [incomesFilterValues]);

  const handleChangeFieldValue = (field) => setFilterValues((prevState) => setFilterValue(prevState, field));
  const [isLoading, setIsLoading] = useState(false);
  const handleApplyFilters = async () => {
    setIsLoading(true);
    dispatch(setIncomesFilterValues(Object.entries(filterValues).map(([id, value]) => ({ id, value }))));
    if (JSON.stringify(incomesFilterValues.period) !== JSON.stringify(filterValues.period)) await onSave();
    handleToggleVisibility();
    setIsLoading(false);
  };
  const submitBtn = (
    <Button size="large" loading={isLoading} data-cy="incomes-filter-submit" className="w-full" onClick={handleApplyFilters}>
      {t("buttons.apply")}
    </Button>
  );

  return (
    <>
      <Button size="large" data-cy="incomes-filter-btn" className="!flex items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgFilter className="h-5 w-5" />
        {!["xs", "xxs"].includes(viewport) && t("buttons.set_filters")}
      </Button>
      <SideModal title={t("titles.set_filters")} isOpen={isOpen} footer={submitBtn} onClose={handleToggleVisibility} onInit={setIsInitialized}>
        <ul data-cy="incomes-filter-form" className="flex w-full flex-col gap-4">
          {incomesFilterFields.map(({ id, type, label, label_translation, options, options_prefix, showSearch, multiple }, index) => (
            <li key={id} className="flex flex-col gap-4">
              {(type === FieldTypes.MULTISELECT || type === FieldTypes.SELECT) && (
                <Select
                  ref={!index ? fieldRef : null}
                  id={id}
                  className="w-full"
                  size="large"
                  mode={multiple ? "multiple" : ""}
                  label={label_translation ? t(`fields.${label_translation}`) : label}
                  value={filterValues[id]}
                  options={options?.map(({ option, label, label_translation, value }) => ({
                    label: option || (label_translation ? `${options_prefix ? `${t(`fields.${options_prefix}`)} ` : ""}${t(`fields.${label_translation}`)}` : label || value),
                    value,
                  }))}
                  optionRender={renderSelectOption}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  showSearch={showSearch}
                  filterOption={showSearch ? handleFilterSelectOptions : null}
                  onChange={(value) => handleChangeFieldValue({ id, value })}
                />
              )}
              {type === FieldTypes.DATES_PERIOD && <PeriodField id={id} value={filterValues[id]} onChange={(value) => handleChangeFieldValue({ id, value })} />}
            </li>
          ))}
        </ul>
      </SideModal>
    </>
  );
});
