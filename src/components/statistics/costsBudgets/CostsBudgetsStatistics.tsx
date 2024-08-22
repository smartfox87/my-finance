import { CostsBudgetsBarChart } from "@/components/statistics/costsBudgets/CostsBudgetsBarChart";
import { useSelector } from "react-redux";
import { selectCostsBudgetsChartItems } from "@/store/selectors/statistics";
import { useTranslation } from "react-i18next";

export const CostsBudgetsStatistics = () => {
  const { t } = useTranslation();
  const costsBudgetsChartItems = useSelector(selectCostsBudgetsChartItems);

  return (
    !!costsBudgetsChartItems.length && (
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-xl font-bold">
          {t("statistics.budgets")} & {t("statistics.costs")}
        </h2>
        <CostsBudgetsBarChart items={costsBudgetsChartItems} />
      </section>
    )
  );
};
