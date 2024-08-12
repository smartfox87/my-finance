import { useDispatch, useSelector } from "react-redux";
import { setIncomesFilterValues } from "@/store/slices/incomesSlice";
import { selectIncomesFilterFields, selectIncomesFilterValues } from "@/store/selectors/incomes";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { SideModal } from "@/components/modals/SideModal";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport";
import { prepareObjectValuesForFilterStateValues, setFilterValue } from "@/helpers/filters";
import { useFieldFocus } from "@/hooks/fieldFocus";
import { FilterFields } from "@/components/common/filter/FilterFields";
import type { BaseSelectRef } from "rc-select";
import { ChangeFilterFieldValueHandler } from "@/types/filter";
import { FieldIds } from "@/types/field";

export const IncomesFilter = memo(function IncomesFilter({ onSave }: { onSave: () => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const [focusFieldRef, mountFocusField] = useFieldFocus<BaseSelectRef>();

  const incomesFilterFields = useSelector(selectIncomesFilterFields);
  const incomesFilterValues = useSelector(selectIncomesFilterValues);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    setFilterValues(JSON.parse(JSON.stringify(incomesFilterValues)));
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
