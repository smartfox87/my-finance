import { IncomesCategoriesBarChart } from "@/components/Statistics/incomesCategories/IncomesCategoriesBarChart";
import { useSelector } from "react-redux";
import { selectIncomesCategoriesChartItems } from "@/store/selectors/statistics";
import { useTranslation } from "react-i18next";

export const CostsCategoriesStatistics = () => {
  const { t } = useTranslation();
  const incomesCategoriesChartItems = useSelector(selectIncomesCategoriesChartItems);

  return (
    !!incomesCategoriesChartItems.length && (
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-xl font-bold">{t("statistics.incomes_by_categories")}</h2>
        <IncomesCategoriesBarChart items={incomesCategoriesChartItems} />
      </section>
    )
  );
};
