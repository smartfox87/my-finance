import { Chart } from "../chart";
import { selectCostsBudgetsChartItems } from "../../../selectors";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";

export const ExpensesBudgets = () => {
  const { t } = useTranslation();
  const costsBudgetsChartItems = useAppSelector(selectCostsBudgetsChartItems);

  return (
    !!costsBudgetsChartItems.length && (
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-xl font-bold">
          {t("statistics.budgets")} & {t("statistics.costs")}
        </h2>
        <Chart items={costsBudgetsChartItems} />
      </section>
    )
  );
};
