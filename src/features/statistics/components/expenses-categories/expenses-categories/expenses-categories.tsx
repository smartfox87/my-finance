import { Chart } from "../../incomes-categories/chart";
import { selectIncomesCategoriesChartItems } from "../../../selectors";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";

export const ExpensesCategories = () => {
  const { t } = useTranslation();
  const incomesCategoriesChartItems = useAppSelector(selectIncomesCategoriesChartItems);

  return (
    !!incomesCategoriesChartItems.length && (
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-xl font-bold">{t("statistics.incomes_by_categories")}</h2>
        <Chart items={incomesCategoriesChartItems} />
      </section>
    )
  );
};
