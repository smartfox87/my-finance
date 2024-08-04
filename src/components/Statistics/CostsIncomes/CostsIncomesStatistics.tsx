import { CostsIncomesBarChart } from "@/components/Statistics/CostsIncomesBarChart";
import { useSelector } from "react-redux";
import { selectCostsIncomesChartItems } from "@/store/selectors/statistics";
import { useTranslation } from "react-i18next";

export const CostsIncomesStatistics = () => {
  const { t } = useTranslation();
  const costsIncomesChartItems = useSelector(selectCostsIncomesChartItems);

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
