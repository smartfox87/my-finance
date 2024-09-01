import { selectCurrency } from "@/features/profile";
import formatPrice from "@/utils/format-price";
import { useAppSelector } from "@/hooks/store";
import type { IncomesCategoriesStatisticsTooltipProps } from "../../../types";

export const ChartTooltip = ({ active, payload }: IncomesCategoriesStatisticsTooltipProps) => {
  const currency = useAppSelector(selectCurrency);

  if (active && payload?.length) {
    return (
      <ul className="flex max-w-[calc(100vw_-_30px)] flex-col gap-1 border border-gray-300 bg-white p-3 xs:ml-0 dark:bg-dark">
        {payload.map(({ payload: { value, name, accounts } }) => (
          <li key={name}>
            <div className="font-bold">
              {name}: {formatPrice(value)} {currency}
            </div>
            <ul>
              {Object.entries(accounts).map(([name, value]) => (
                <li className="flex items-center gap-2 before:h-1 before:w-1 before:rounded-full before:bg-current" key={name}>
                  {name}: {formatPrice(value)} {currency}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  return null;
};
