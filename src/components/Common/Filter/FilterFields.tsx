import { FieldTypes } from "@/types/field";
import { Select } from "antd";
import { handleFilterSelectOptions, renderSelectOption } from "@/helpers/fields";
import { PeriodField } from "@/components/Form/PeriodField";
import { FilterState, HandleChangeFilterFieldValue } from "@/types/filter";
import { ProcessedFilterField } from "@/types/selectors";
import type { BaseSelectRef } from "rc-select";
import { MutableRefObject } from "react";
import { useTranslation } from "react-i18next";

export const FilterFields = ({
  items,
  filterValues,
  fieldRef,
  onChangeFieldValue,
}: {
  items: ProcessedFilterField[];
  filterValues: FilterState;
  fieldRef: MutableRefObject<BaseSelectRef | null>;
  onChangeFieldValue: HandleChangeFilterFieldValue;
}) => {
  const { t } = useTranslation();

  return (
    <ul data-cy="expenses-filter-form" className="flex w-full flex-col gap-4">
      {items.map((field, index) => (
        <li key={field.id} className="flex flex-col gap-4">
          {field.type === FieldTypes.MULTISELECT && (
            <Select
              ref={!index ? fieldRef : undefined}
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
              onChange={(value) => onChangeFieldValue({ id: field.id, value })}
            />
          )}
          {field.type === FieldTypes.SELECT && (
            <Select
              ref={!index ? fieldRef : undefined}
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
