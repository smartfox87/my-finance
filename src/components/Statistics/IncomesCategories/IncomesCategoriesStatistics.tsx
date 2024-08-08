import { CostsCategoriesBarChart } from "@/components/Statistics/CostsCategories/CostsCategoriesBarChart";
import { useSelector } from "react-redux";
import { selectCostsCategoriesChartItems } from "@/store/selectors/statistics";
import { useTranslation } from "react-i18next";

export const IncomesCategoriesStatistics = () => {
  const { t } = useTranslation();
  const costsCategoriesChartItems = useSelector(selectCostsCategoriesChartItems);

  return (
    !!costsCategoriesChartItems.length && (
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-xl font-bold">{t("statistics.expenses_by_categories")}</h2>
        <CostsCategoriesBarChart items={costsCategoriesChartItems} />
      </section>
    )
  );
};
