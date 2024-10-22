import { setCostsFilterValues } from "../../store";
import { selectCostsFilterFields, selectCostsFilterValues } from "../../selectors";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { SideModal } from "@/components/modals/side-modal";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport";
import { useFieldFocus } from "@/hooks/field-focus";
import { prepareObjectValuesForFilterStateValues, setFilterValue } from "@/features/filter";
import { FilterFields } from "@/features/filter";
import cloneDeep from "lodash/cloneDeep";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds } from "@/features/default-form";
import type { BaseSelectRef } from "rc-select";
import type { ComponentOnSaveProps } from "@/types/common";
import type { FilterState, ChangeFilterFieldValueHandler } from "@/features/filter";

export const Filter = memo(function CostsFilter({ onSave }: ComponentOnSaveProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const [focusFieldRef, mountFocusField] = useFieldFocus<BaseSelectRef>();

  const costsFilterFields = useAppSelector(selectCostsFilterFields);
  const costsFilterValues = useAppSelector(selectCostsFilterValues);
  const [filterValues, setFilterValues] = useState<FilterState>({});

  useEffect((): void => {
    if (costsFilterValues) setFilterValues(cloneDeep(costsFilterValues));
  }, [costsFilterValues]);

  const handleChangeFieldValue: ChangeFilterFieldValueHandler = (field) => setFilterValues((prevState) => setFilterValue(prevState, field));
  const [isLoading, setIsLoading] = useState(false);
  const handleApplyFilters = async (): Promise<void> => {
    if (!costsFilterValues) return;
    setIsLoading(true);
    dispatch(setCostsFilterValues(prepareObjectValuesForFilterStateValues(filterValues)));
    if (FieldIds.PERIOD in filterValues && JSON.stringify(costsFilterValues[FieldIds.PERIOD]) !== JSON.stringify(filterValues[FieldIds.PERIOD])) await onSave();
    handleToggleVisibility();
    setIsLoading(false);
  };
  const submitBtn = (
    <Button size="large" loading={isLoading} data-cy="expenses-filter-submit" className="w-full" onClick={handleApplyFilters}>
      {t("buttons.apply")}
    </Button>
  );

  return (
    <>
      <Button size="large" data-cy="expenses-filter-btn" className="!flex items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgFilter className="h-5 w-5" />
        {!isMobile && t("buttons.set_filters")}
      </Button>
      <SideModal title={t("titles.set_filters")} isOpen={isOpen} footer={submitBtn} onClose={handleToggleVisibility}>
        <FilterFields name="expenses" items={costsFilterFields} filterValues={filterValues} focusFieldRef={focusFieldRef} onChangeFieldValue={handleChangeFieldValue} onMount={mountFocusField} />
      </SideModal>
    </>
  );
});
