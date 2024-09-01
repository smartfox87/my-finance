import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useViewport } from "@/hooks/viewport";
import { ChartTooltip } from "../chart-tooltip";
import type { CostIncomeStatisticsItem } from "../../../types";

export const Chart = ({ items }: { items: CostIncomeStatisticsItem[] }) => {
  const { isMobile } = useViewport();

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
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          <Bar key="incomes" dataKey="incomes" legendType="none" fill="#82ca9d" />
          <Bar key="costs" dataKey="costs" legendType="none" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
