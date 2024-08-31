import { selectCurrency } from "@/store/selectors/profile";
import { useTranslation } from "react-i18next";
import formatPrice from "@/helpers/formatPrice";
import { CostsIncomesStatisticsTooltipProps, StatisticsTypes } from "../../../types";
import { useAppSelector } from "@/hooks/store";

export const ChartTooltip = ({ active, payload }: CostsIncomesStatisticsTooltipProps) => {
  const currency = useAppSelector(selectCurrency);
  const { t } = useTranslation();
  const costsStatistics = payload?.find(({ name }) => name === StatisticsTypes.COSTS);
  const incomesStatistics = payload?.find(({ name }) => name === StatisticsTypes.INCOMES);

  if (active) {
    return (
      <ul className="flex max-w-[calc(100vw_-_30px)] flex-col gap-2 border border-gray-300 bg-white p-3 dark:bg-dark">
        {incomesStatistics && (
          <li className="flex flex-col" key={incomesStatistics.name}>
            <p className="font-bold">
              {t(`statistics.${incomesStatistics.name}`)}: {formatPrice(incomesStatistics.value)} {currency}
            </p>
            <ul>
              {Object.entries(incomesStatistics.payload.costsList).map(([key, value]) => (
                <li className="flex items-center gap-2 before:h-1 before:w-1 before:rounded-full before:bg-current" key={key}>
                  {key}: {formatPrice(value)} {currency}
                </li>
              ))}
            </ul>
          </li>
        )}
        {costsStatistics && (
          <li className="flex flex-col" key={costsStatistics.name}>
            <p className="font-bold">
              {t(`statistics.${costsStatistics.name}`)}: {formatPrice(costsStatistics.value)} {currency}
            </p>
            <ul>
              {Object.entries(costsStatistics.payload.costsList).map(([key, value]) => (
                <li className="flex items-center gap-2 before:h-1 before:w-1 before:rounded-full before:bg-current" key={key}>
                  {key}: {formatPrice(value)} {currency}
                </li>
              ))}
            </ul>
          </li>
        )}
        {costsStatistics && incomesStatistics && (
          <li>
            <p className="font-bold">
              {t(`common.total`)}: {formatPrice(incomesStatistics.value - costsStatistics.value)} {currency}
            </p>
          </li>
        )}
      </ul>
    );
  }

  return null;
};
