import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useViewport } from "@/hooks/viewport";
import { Viewports } from "@/types/viewport";
import { ChartTooltip } from "../chart-tooltip";
import type { CostsBudgetsStatisticsItem } from "../../../types";

export const Chart = ({ items }: { items: CostsBudgetsStatisticsItem[] }) => {
  const { viewport, isMobile } = useViewport();
  const coords = Viewports.XXS === viewport ? { x: 0 } : undefined;

  return (
    <div className={`w-full ${isMobile ? "h-[480px]" : "h-[max(400px,calc(100vh_/_3))]"}`}>
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
          <Tooltip coordinate={coords} position={coords} content={<ChartTooltip />} />
          <Legend />
          <Bar key="budgets" dataKey="budgets" legendType="none" fill="#8d8996" />
          <Bar key="costs" dataKey="costs" legendType="none" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
