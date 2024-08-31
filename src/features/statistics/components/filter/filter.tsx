import { setStatisticsFilterValues } from "../../store";
import { selectStatisticsFilterFields, selectStatisticsFilterValues } from "../../selectors";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { SideModal } from "@/components/modals/side-modal";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport";
import { prepareObjectValuesForFilterStateValues, setFilterValue } from "@/utils/filters";
import { useFieldFocus } from "@/hooks/fieldFocus";
import cloneDeep from "lodash/cloneDeep";
import { FilterFields } from "@/components/common/filter/FilterFields";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds } from "@/types/field";
import type { BaseSelectRef } from "rc-select";
import type { ChangeFilterFieldValueHandler, FilterState } from "@/types/filter";
import type { ComponentOnSaveProps } from "@/types/common";

export const Filter = memo(function StatisticsFilter({ onSave }: ComponentOnSaveProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const [focusFieldRef, mountFocusField] = useFieldFocus<BaseSelectRef>();

  const statisticsFilterFields = useAppSelector(selectStatisticsFilterFields);
  const statisticsFilterValues = useAppSelector(selectStatisticsFilterValues);
  const [filterValues, setFilterValues] = useState<FilterState>({});

  useEffect((): void => {
    if (statisticsFilterValues) setFilterValues(cloneDeep(statisticsFilterValues));
  }, [statisticsFilterValues]);

  const handleChangeFieldValue: ChangeFilterFieldValueHandler = (field) => setFilterValues((prevState) => setFilterValue(prevState, field));
  const handleApplyFilters = async (): Promise<void> => {
    if (!statisticsFilterValues) return;
    dispatch(setStatisticsFilterValues(prepareObjectValuesForFilterStateValues(filterValues)));
    if (FieldIds.PERIOD in filterValues && JSON.stringify(statisticsFilterValues[FieldIds.PERIOD]) !== JSON.stringify(filterValues[FieldIds.PERIOD])) await onSave();
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
        {!isMobile && t("buttons.set_filters")}
      </Button>
      <SideModal title={t("titles.set_filters")} isOpen={isOpen} footer={submitBtn} onClose={handleToggleVisibility}>
        <FilterFields
          name="statistics"
          items={statisticsFilterFields}
          filterValues={filterValues}
          focusFieldRef={focusFieldRef}
          onChangeFieldValue={handleChangeFieldValue}
          onMount={mountFocusField}
        />
      </SideModal>
    </>
  );
});
