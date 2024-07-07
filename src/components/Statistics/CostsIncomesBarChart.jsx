import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import formatPrice from "@/helpers/formatPrice.js";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { useViewport } from "@/hooks/viewport";
import { useTranslation } from "react-i18next";

const CustomTooltip = ({ active, payload }) => {
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

export const CostsIncomesBarChart = ({ items }) => {
  const { viewport } = useViewport();
  const isMobile = ["xs", "xxs"].includes(viewport);

  return (
    <div className={`w-full ${isMobile ? "h-[480px]" : "h-[max(400px,calc(100vh_/_3))]"}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} layout={isMobile ? "vertical" : "horizontal"}>
          {isMobile ? (
            <>
              <XAxis type="number" />
              <YAxis dataKey="monthName" type="category" width={35} />
            </>
          ) : (
            <>
              <XAxis dataKey="monthName" />
              <YAxis />
            </>
          )}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar key="incomes" dataKey="incomes" legendType="none" fill="#82ca9d" />
          <Bar key="costs" dataKey="costs" legendType="none" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
