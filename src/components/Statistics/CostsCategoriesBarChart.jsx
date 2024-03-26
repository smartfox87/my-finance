import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import formatPrice from "@/helpers/formatPrice.js";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { useViewport } from "@/hooks/viewport.js";

const CustomTooltip = ({ active, payload }) => {
  const currency = useSelector(selectCurrency);

  if (active && payload && payload.length) {
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

export const CostsCategoriesBarChart = ({ items }) => {
  const { viewport } = useViewport();
  const isMobile = ["xs", "xxs"].includes(viewport);
  const coords = ["xxs"].includes(viewport) ? { x: 0 } : undefined;

  return (
    <div style={{ width: "100%", height: items.length * 40 + 45 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={isMobile ? 156 : 206} tick={{ width: isMobile ? 150 : 200 }} />
          <Tooltip coordinate={coords} position={coords} content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="value" legendType="none" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
