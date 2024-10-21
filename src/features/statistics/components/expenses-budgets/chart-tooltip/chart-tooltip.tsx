import { selectCurrency } from "@/features/profile";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@/utils/format-price";
import { uppercaseFirstLetter } from "@/utils/strings";
import { useAppSelector } from "@/hooks/store";
import { type CostsBudgetsStatisticsTooltipProps, StatisticsTypes } from "../../../types";

export const ChartTooltip = ({ active, payload }: CostsBudgetsStatisticsTooltipProps) => {
  const currency = useAppSelector(selectCurrency);
  const { t } = useTranslation();
  const budgetsStatistics = payload?.find(({ name }) => name === StatisticsTypes.BUDGETS);

  if (active && budgetsStatistics) {
    const { value, name, payload: payloadData } = budgetsStatistics;
    return (
      <ul className="flex max-w-[calc(100vw_-_30px)] flex-col gap-2 border border-gray-300 bg-white p-3 dark:bg-dark">
        <li className="flex flex-col gap-2" key={name}>
          <p className="font-bold">
            {t(`statistics.${name}`)}: {formatPrice(value)} {currency}
          </p>
          <ul className="flex flex-col gap-2">
            {Object.entries(payloadData.budgetsList).map(([key, { amount, costs }]) => (
              <li key={key}>
                <div className="flex items-center gap-2 font-bold before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-current">{uppercaseFirstLetter(key)}:</div>
                <ul className="flex items-center gap-4">
                  <li>
                    {t(`statistics.budget`)}: {formatPrice(amount)} {currency}
                  </li>
                  <li className={costs > amount ? "font-bold text-red-600" : ""}>
                    {t(`statistics.costs`)}: {formatPrice(costs)} {currency}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    );
  }
};
