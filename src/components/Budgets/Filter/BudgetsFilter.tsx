import { useSelector } from "react-redux";
import { setBudgetsFilterValues } from "@/store/budgetsSlice";
import { selectBudgetsFilterFields, selectBudgetsFilterValues } from "@/store/selectors/budgets";
import { useTranslation } from "react-i18next";
import { Select, Button } from "antd";
import { handleFilterSelectOptions, renderSelectOption } from "@/helpers/fields";
import { SideModal } from "@/components/Modals/SideModal";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport";
import { PeriodField } from "@/components/Form/PeriodField";
import { useFilterFocus } from "@/hooks/filterFocus";
import { prepareObjectValuesForFilterStateValues, setFilterValue } from "@/helpers/filters";
import { FieldIds, FieldTypes } from "@/types/field";
import { useAppDispatch } from "@/hooks/redux";
import { FilterItem, FilterState } from "@/types/filter";

export const BudgetsFilter = memo(function BudgetsFilter({ onSave }: { onSave: () => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const [isInitialized, setIsInitialized] = useState(false);
  const [fieldRef] = useFilterFocus(isOpen, isInitialized);

  const budgetsFilterFields = useSelector(selectBudgetsFilterFields);
  const budgetsFilterValues = useSelector(selectBudgetsFilterValues);
  const [filterValues, setFilterValues] = useState<FilterState>({});

  useEffect(() => {
    setFilterValues(JSON.parse(JSON.stringify(budgetsFilterValues)));
  }, [budgetsFilterValues]);

  const handleChangeFieldValue = (field: FilterItem) => setFilterValues((prevState) => setFilterValue(prevState, field));
  const [isLoading, setIsLoading] = useState(false);
  const handleApplyFilters = async (): Promise<void> => {
    if (!budgetsFilterValues) return;
    setIsLoading(true);
    dispatch(setBudgetsFilterValues(prepareObjectValuesForFilterStateValues(filterValues)));
    if (FieldIds.PERIOD in filterValues && JSON.stringify(budgetsFilterValues[FieldIds.PERIOD]) !== JSON.stringify(filterValues[FieldIds.PERIOD])) await onSave();
    handleToggleVisibility();
    setIsLoading(false);
  };
  const submitBtn = (
    <Button size="large" loading={isLoading} data-cy="budgets-filter-submit" className="w-full" onClick={handleApplyFilters}>
      {t("buttons.apply")}
    </Button>
  );

  return (
    <>
      <Button size="large" data-cy="budgets-filter-btn" className="!flex items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgFilter className="h-5 w-5" />
        {!isMobile && t("buttons.set_filters")}
      </Button>
      <SideModal title={t("titles.set_filters")} isOpen={isOpen} footer={submitBtn} onClose={handleToggleVisibility} onInit={setIsInitialized}>
        <ul data-cy="budgets-filter-form" className="flex w-full flex-col gap-4">
          {budgetsFilterFields.map((field, index) => (
            <li key={field.id} className="flex flex-col gap-4">
              {field.type === FieldTypes.MULTISELECT && (
                <Select
                  autoFocus={!index}
                  id={field.id}
                  className="w-full"
                  size="large"
                  mode="multiple"
                  value={filterValues[field.id]}
                  options={field.options?.map(({ option, label, label_translation, value }) => ({
                    label: option || (label_translation ? `${field.options_prefix ? `${t(`fields.${field.options_prefix}`)} ` : ""}${t(`fields.${label_translation}`)}` : label || value),
                    value,
                  }))}
                  optionRender={renderSelectOption}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  showSearch={field.showSearch}
                  filterOption={field.showSearch ? handleFilterSelectOptions : undefined}
                  onChange={(value) => handleChangeFieldValue({ id: field.id, value })}
                />
              )}
              {field.type === FieldTypes.SELECT && (
                <Select
                  autoFocus={!index}
                  id={field.id}
                  className="w-full"
                  size="large"
                  value={filterValues[field.id]}
                  options={field.options?.map(({ option, label, label_translation, value }) => ({
                    label: option || (label_translation ? `${field.options_prefix ? `${t(`fields.${field.options_prefix}`)} ` : ""}${t(`fields.${label_translation}`)}` : label || value),
                    value,
                  }))}
                  optionRender={renderSelectOption}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  showSearch={field.showSearch}
                  filterOption={field.showSearch ? handleFilterSelectOptions : undefined}
                  onChange={(value) => handleChangeFieldValue({ id: field.id, value })}
                />
              )}
              {field.type === FieldTypes.DATES_PERIOD && filterValues[field.id] && (
                <PeriodField id={field.id} value={filterValues[field.id]!} onChange={(value) => handleChangeFieldValue({ id: field.id, value })} />
              )}
            </li>
          ))}
        </ul>
      </SideModal>
    </>
  );
});
