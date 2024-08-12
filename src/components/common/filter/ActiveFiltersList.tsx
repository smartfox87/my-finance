import { Button } from "antd";
import { checkIsClearableFilter } from "@/helpers/filters";
import SvgCrossBold from "@/assets/sprite/cross-bold.svg";
import { ActiveFilterItem, ClearActiveFilterItemHandler } from "@/types/filter";

export const ActiveFiltersList = ({ items, onClearFilter }: { items: ActiveFilterItem[]; onClearFilter: ClearActiveFilterItemHandler }) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(({ id, label, value, ...field }) => (
        <li key={`${id}_${value}`}>
          <Button
            type="primary"
            size="small"
            data-cy={checkIsClearableFilter({ id, value }) ? `active-filter-${id}` : undefined}
            className="!flex items-center gap-1"
            onClick={() => onClearFilter({ id, value })}
          >
            <span>{label}:</span>
            <span className="font-bold">{"textValue" in field ? field.textValue : value}</span>
            {checkIsClearableFilter({ id, value }) && <SvgCrossBold className="ml-1 h-2.5 w-2.5" />}
          </Button>
        </li>
      ))}
    </ul>
  );
};
