import { IncomesCategoriesBarChart } from "@/components/statistics/incomesCategories/IncomesCategoriesBarChart";
import { selectIncomesCategoriesChartItems } from "@/store/selectors/statistics";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";

export const CostsCategoriesStatistics = () => {
  const { t } = useTranslation();
  const incomesCategoriesChartItems = useAppSelector(selectIncomesCategoriesChartItems);

  return (
    !!incomesCategoriesChartItems.length && (
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-xl font-bold">{t("statistics.incomes_by_categories")}</h2>
        <IncomesCategoriesBarChart items={incomesCategoriesChartItems} />
      </section>
    )
  );
};
