import { Select } from "antd";
import { handleFilterSelectOptions } from "@/utils/handle-filter-select-options";
import { PeriodField } from "@/features/default-form";
import { MutableRefObject, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { renderSelectOption } from "../../utils";
import { FieldTypes } from "@/features/default-form";
import type { FilterState, ChangeFilterFieldValueHandler } from "../../types";
import type { ProcessedFilterField } from "@/types/selectors";
import type { BaseSelectRef } from "rc-select";

export const FilterFields = ({
  name,
  items,
  filterValues,
  focusFieldRef,
  onChangeFieldValue,
  onMount,
}: {
  name: string;
  items: ProcessedFilterField[];
  filterValues: FilterState;
  focusFieldRef: MutableRefObject<BaseSelectRef | null>;
  onChangeFieldValue: ChangeFilterFieldValueHandler;
  onMount: (value: SetStateAction<boolean>) => void;
}) => {
  const { t } = useTranslation();

  useEffect((): (() => void) => {
    onMount(true);
    return () => onMount(false);
  }, []);

  return (
    <ul data-cy={`${name}-filter-form`} className="flex w-full flex-col gap-4">
      {items.map((field, index) => (
        <li key={field.id} className="flex flex-col gap-4">
          {field.type === FieldTypes.MULTISELECT && (
            <Select
              ref={!index ? focusFieldRef : undefined}
              id={field.id}
              className="w-full"
              size="large"
              mode="multiple"
              value={filterValues[field.id]}
              options={field.options?.map(({ label, label_translation, value }) => ({
                label: label_translation ? t(`fields.${label_translation}`) : label,
                value,
              }))}
              optionRender={renderSelectOption}
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              showSearch={field.showSearch}
              filterOption={field.showSearch ? handleFilterSelectOptions : undefined}
              onChange={(value) => onChangeFieldValue({ id: field.id, value })}
            />
          )}
          {field.type === FieldTypes.SELECT && (
            <Select
              ref={!index ? focusFieldRef : undefined}
              id={field.id}
              className="w-full"
              size="large"
              value={filterValues[field.id]}
              options={field.options?.map(({ label, label_translation, value }) => ({
                label: label_translation ? t(`fields.${label_translation}`) : label,
                value,
              }))}
              optionRender={renderSelectOption}
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              showSearch={field.showSearch}
              filterOption={field.showSearch ? handleFilterSelectOptions : undefined}
              onChange={(value) => onChangeFieldValue({ id: field.id, value })}
            />
          )}
          {field.type === FieldTypes.DATES_PERIOD && filterValues[field.id] && (
            <PeriodField id={field.id} value={filterValues[field.id]!} onChange={(value) => onChangeFieldValue({ id: field.id, value })} />
          )}
        </li>
      ))}
    </ul>
  );
};
