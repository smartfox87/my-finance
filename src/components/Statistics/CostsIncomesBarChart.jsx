import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import formatPrice from "@/helpers/formatPrice.js";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { useWindowSize } from "@uidotdev/usehooks";
import { useViewport } from "@/hooks/viewport.js";
import { useTranslation } from "react-i18next";

const CustomTooltip = ({ active, payload }) => {
  const { width: windowWidth } = useWindowSize();
  const currency = useSelector(selectCurrency);
  const { t } = useTranslation();

  if (active && payload && payload.length) {
    return (
      <ul className="flex flex-col gap-2 border border-gray-300 bg-white p-3 dark:bg-dark" style={{ maxWidth: windowWidth - 40 }}>
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

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  active: PropTypes.bool,
  label: PropTypes.string,
};

export const CostsIncomesBarChart = ({ items }) => {
  const { height: windowHeight } = useWindowSize();
  const { viewport } = useViewport();
  const isMobile = ["xs", "xxs"].includes(viewport);

  return (
    <div style={{ width: "100%", height: isMobile ? 480 : Math.max(400, windowHeight / 3) }}>
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

CostsIncomesBarChart.propTypes = {
  items: PropTypes.array,
};
