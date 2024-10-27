import { Chart } from "../../expenses-categories/chart";
import { selectCostsCategoriesChartItems } from "../../../selectors";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";

export const ExpensesCategories = () => {
  const { t } = useTranslation();
  const costsCategoriesChartItems = useAppSelector(selectCostsCategoriesChartItems);

  return (
    !!costsCategoriesChartItems.length && (
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-xl font-bold">{t("statistics.expenses_by_categories")}</h2>
        <Chart items={costsCategoriesChartItems} />
      </section>
    )
  );
};
