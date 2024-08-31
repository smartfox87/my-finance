import { setIncomesFilterValues } from "../../store";
import { selectIncomesFilterFields, selectIncomesFilterValues } from "../../selectors";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { SideModal } from "@/components/modals/side-modal";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport";
import { prepareObjectValuesForFilterStateValues, setFilterValue } from "@/utils/filters";
import { useFieldFocus } from "@/hooks/fieldFocus";
import { FilterFields } from "@/components/common/filter/FilterFields";
import cloneDeep from "lodash/cloneDeep";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds } from "@/types/field";
import type { ChangeFilterFieldValueHandler, FilterState } from "@/types/filter";
import type { BaseSelectRef } from "rc-select";
import type { ComponentOnSaveProps } from "@/types/common";

export const Filter = memo(function IncomesFilter({ onSave }: ComponentOnSaveProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const [focusFieldRef, mountFocusField] = useFieldFocus<BaseSelectRef>();

  const incomesFilterFields = useAppSelector(selectIncomesFilterFields);
  const incomesFilterValues = useAppSelector(selectIncomesFilterValues);
  const [filterValues, setFilterValues] = useState<FilterState>({});

  useEffect((): void => {
    if (incomesFilterValues) setFilterValues(cloneDeep(incomesFilterValues));
  }, [incomesFilterValues]);

  const handleChangeFieldValue: ChangeFilterFieldValueHandler = (field) => setFilterValues((prevState) => setFilterValue(prevState, field));
  const [isLoading, setIsLoading] = useState(false);
  const handleApplyFilters = async (): Promise<void> => {
    if (!incomesFilterValues) return;
    setIsLoading(true);
    dispatch(setIncomesFilterValues(prepareObjectValuesForFilterStateValues(filterValues)));
    if (FieldIds.PERIOD in filterValues && JSON.stringify(incomesFilterValues.period) !== JSON.stringify(filterValues.period)) await onSave();
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
        {!isMobile && t("buttons.set_filters")}
      </Button>
      <SideModal title={t("titles.set_filters")} isOpen={isOpen} footer={submitBtn} onClose={handleToggleVisibility}>
        <FilterFields name="incomes" items={incomesFilterFields} filterValues={filterValues} focusFieldRef={focusFieldRef} onChangeFieldValue={handleChangeFieldValue} onMount={mountFocusField} />
      </SideModal>
    </>
  );
});
