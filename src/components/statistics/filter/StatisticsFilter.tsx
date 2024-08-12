import { useSelector } from "react-redux";
import { setStatisticsFilterValues } from "@/store/slices/statisticsSlice";
import { selectStatisticsFilterFields, selectStatisticsFilterValues } from "@/store/selectors/statistics";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { SideModal } from "@/components/modals/SideModal";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport";
import { prepareObjectValuesForFilterStateValues, setFilterValue } from "@/helpers/filters";
import { useFieldFocus } from "@/hooks/fieldFocus";
import { FieldIds } from "@/types/field";
import { useAppDispatch } from "@/hooks/redux";
import { FilterFields } from "@/components/common/filter/FilterFields";
import type { BaseSelectRef } from "rc-select";
import { ChangeFilterFieldValueHandler } from "@/types/filter";
import type { ComponentOnSaveProps } from "@/types/common";

export const StatisticsFilter = memo(function StatisticsFilter({ onSave }: ComponentOnSaveProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const [focusFieldRef, mountFocusField] = useFieldFocus<BaseSelectRef>();

  const statisticsFilterFields = useSelector(selectStatisticsFilterFields);
  const statisticsFilterValues = useSelector(selectStatisticsFilterValues);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    setFilterValues(JSON.parse(JSON.stringify(statisticsFilterValues)));
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