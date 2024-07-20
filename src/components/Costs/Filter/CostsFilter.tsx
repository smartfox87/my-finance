import { useDispatch, useSelector } from "react-redux";
import { setCostsFilterValues } from "@/store/costsSlice";
import { selectCostsFilterFields, selectCostsFilterValues } from "@/store/selectors/costs";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { SideModal } from "@/components/Modals/SideModal";
import { memo, useEffect, useState } from "react";
import SvgFilter from "@/assets/sprite/filter.svg";
import { useViewport } from "@/hooks/viewport";
import { useFilterFocus } from "@/hooks/filterFocus";
import { prepareObjectValuesForFilterStateValues, setFilterValue } from "@/helpers/filters";
import { FieldIds } from "@/types/field";
import type { BaseSelectRef } from "rc-select";
import { FilterState, HandleChangeFilterFieldValue } from "@/types/filter";
import { FilterFields } from "@/components/Common/Filter/FilterFields";

export const CostsFilter = memo(function CostsFilter({ onSave }: { onSave: () => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const [isMounted, setIsMounted] = useState(false);
  const [fieldRef] = useFilterFocus<BaseSelectRef>(isOpen, isMounted);

  const costsFilterFields = useSelector(selectCostsFilterFields);
  const costsFilterValues = useSelector(selectCostsFilterValues);
  const [filterValues, setFilterValues] = useState<FilterState>({});

  useEffect(() => {
    setFilterValues(JSON.parse(JSON.stringify(costsFilterValues)));
  }, [costsFilterValues]);

  const handleChangeFieldValue: HandleChangeFilterFieldValue = (field) => setFilterValues((prevState) => setFilterValue(prevState, field));
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
        <FilterFields name="expenses" items={costsFilterFields} filterValues={filterValues} fieldRef={fieldRef} onChangeFieldValue={handleChangeFieldValue} onInit={setIsMounted} />
      </SideModal>
    </>
  );
});
