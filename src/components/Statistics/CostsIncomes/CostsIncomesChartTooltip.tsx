import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile";
import { useTranslation } from "react-i18next";
import formatPrice from "@/helpers/formatPrice";

export const CostsIncomesChartTooltip = ({ active, payload }) => {
  const currency = useSelector(selectCurrency);
  const { t } = useTranslation();

  if (active && payload && payload.length) {
    return (
      <ul className="flex max-w-[calc(100vw_-_30px)] flex-col gap-2 border border-gray-300 bg-white p-3 dark:bg-dark">
        {payload.map(({ value, name, payload }) => (
          <li className="flex flex-col" key={name}>
            <p className="font-bold">
              {t(`statistics.${name}`)}: {formatPrice(value)} {currency}
            </p>
            <ul>
              {Object.entries(payload[`${name}List`]).map(([key, value]) => (
                <li className="flex items-center gap-2 before:h-1 before:w-1 before:rounded-full before:bg-current" key={key}>
                  {key}: {formatPrice(value)} {currency}
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li>
          <p className="font-bold">
            {t(`common.total`)}: {formatPrice(payload[0].value - payload[1].value)} {currency}
          </p>
        </li>
      </ul>
    );
  }

  return null;
};
