import { CostsIncomesBarChart } from "@/components/statistics/costsIncomes/CostsIncomesBarChart";
import { selectCostsIncomesChartItems } from "@/store/selectors/statistics";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";

export const CostsIncomesStatistics = () => {
  const { t } = useTranslation();
  const costsIncomesChartItems = useAppSelector(selectCostsIncomesChartItems);

  return (
    !!costsIncomesChartItems.length && (
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-xl font-bold">
          {t("statistics.incomes")} & {t("statistics.costs")}
        </h2>
        <CostsIncomesBarChart items={costsIncomesChartItems} />
      </section>
    )
  );
};
