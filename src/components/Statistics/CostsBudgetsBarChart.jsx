import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import formatPrice from "@/helpers/formatPrice.js";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { useWindowSize } from "@uidotdev/usehooks";
import { useViewport } from "@/hooks/viewport.js";
import { useTranslation } from "react-i18next";
import { uppercaseFirstLetter } from "@/helpers/strings.js";

const CustomTooltip = ({ active, payload }) => {
  const currency = useSelector(selectCurrency);
  const { t } = useTranslation();

  if (active && payload && payload.length) {
    return (
      <ul className="flex max-w-[calc(100vw_-_30px)] flex-col gap-2 border border-gray-300 bg-white p-3 dark:bg-dark">
        {payload
          .filter(({ name }) => name === "budgets")
          .map(({ value, name, payload }) => (
            <li className="flex flex-col gap-2" key={name}>
              <p className="font-bold">
                {t(`statistics.${name}`)}: {formatPrice(value)} {currency}
              </p>
              <ul className="flex flex-col gap-2">
                {Object.entries(payload[`${name}List`]).map(([key, { amount, costs }]) => (
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
          ))}
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

export const CostsBudgetsBarChart = ({ items }) => {
  const { height: windowHeight } = useWindowSize();
  const { viewport } = useViewport();
  const isMobile = ["xs", "xxs"].includes(viewport);
  const coords = ["xxs"].includes(viewport) ? { x: 0 } : undefined;

  return (
    <div style={{ width: "100%", height: isMobile ? 480 : Math.max(400, windowHeight / 3) }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} layout={isMobile ? "vertical" : "horizontal"}>
          {isMobile ? (
            <>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={35} />
            </>
          ) : (
            <>
              <XAxis dataKey="name" />
              <YAxis />
            </>
          )}
          <Tooltip coordinate={coords} position={coords} content={<CustomTooltip />} />
          <Legend />
          <Bar key="budgets" dataKey="budgets" legendType="none" fill="#8d8996" />
          <Bar key="costs" dataKey="costs" legendType="none" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

CostsBudgetsBarChart.propTypes = {
  items: PropTypes.array,
};
