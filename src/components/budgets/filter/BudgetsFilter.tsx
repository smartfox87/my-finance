import { useSelector } from "react-redux";
import { setBudgetsFilterValues } from "@/store/slices/budgetsSlice";
import { selectBudgetsFilterFields, selectBudgetsFilterValues } from "@/store/selectors/budgets";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { SideModal } from "@/components/modals/SideModal";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport";
import { useFieldFocus } from "@/hooks/fieldFocus";
import { prepareObjectValuesForFilterStateValues, setFilterValue } from "@/helpers/filters";
import { useAppDispatch } from "@/types/store";
import { FilterFields } from "@/components/common/filter/FilterFields";
import cloneDeep from "lodash/cloneDeep";
import { FieldIds } from "@/types/field";
import type { BaseSelectRef } from "rc-select";
import type { FilterState, ChangeFilterFieldValueHandler } from "@/types/filter";
import type { ComponentOnSaveProps } from "@/types/common";

export const BudgetsFilter = memo(function BudgetsFilter({ onSave }: ComponentOnSaveProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const [focusFieldRef, mountFocusField] = useFieldFocus<BaseSelectRef>();

  const budgetsFilterFields = useSelector(selectBudgetsFilterFields);
  const budgetsFilterValues = useSelector(selectBudgetsFilterValues);
  const [filterValues, setFilterValues] = useState<FilterState>({});

  useEffect((): void => {
    if (budgetsFilterValues) setFilterValues(cloneDeep(budgetsFilterValues));
  }, [budgetsFilterValues]);

  const handleChangeFieldValue: ChangeFilterFieldValueHandler = (field) => setFilterValues((prevState) => setFilterValue(prevState, field));
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
      <SideModal title={t("titles.set_filters")} isOpen={isOpen} footer={submitBtn} onClose={handleToggleVisibility}>
        <FilterFields name="budgets" items={budgetsFilterFields} filterValues={filterValues} focusFieldRef={focusFieldRef} onChangeFieldValue={handleChangeFieldValue} onMount={mountFocusField} />
      </SideModal>
    </>
  );
});
