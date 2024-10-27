import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";
import { selectCostsBudgetsChartItems, selectCostsCategoriesChartItems, selectCostsIncomesChartItems, selectIncomesCategoriesChartItems } from "../../selectors";
import { ExpensesBudgets } from "../expenses-budgets";
import { Button } from "antd";
import { ExpensesIncomes } from "../expenses-incomes";
import { ExpensesCategories } from "../expenses-categories";
import { IncomesCategories } from "../incomes-categories";
import { type ReactElement, useEffect, useState } from "react";

export const Tabs = () => {
  const { t } = useTranslation();
  const costsBudgetsChartItems = useAppSelector(selectCostsBudgetsChartItems);
  const costsIncomesChartItems = useAppSelector(selectCostsIncomesChartItems);
  const incomesCategoriesChartItems = useAppSelector(selectIncomesCategoriesChartItems);
  const costsCategoriesChartItems = useAppSelector(selectCostsCategoriesChartItems);

  const tabs: { name: string; component: ReactElement }[] = [];
  if (costsBudgetsChartItems.length) tabs.push({ name: `${t("statistics.budgets")} & ${t("statistics.costs")}`, component: <ExpensesBudgets /> });
  if (costsIncomesChartItems.length) tabs.push({ name: `${t("statistics.incomes")} & ${t("statistics.costs")}`, component: <ExpensesIncomes /> });
  if (incomesCategoriesChartItems.length) tabs.push({ name: t("statistics.expenses_by_categories"), component: <ExpensesCategories /> });
  if (costsCategoriesChartItems.length) tabs.push({ name: t("statistics.incomes_by_categories"), component: <IncomesCategories /> });

  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {
    setActiveTab(tabs[0]?.name);
  }, [costsBudgetsChartItems, costsIncomesChartItems, incomesCategoriesChartItems, costsCategoriesChartItems]);

  return (
    <section className="flex flex-col gap-4">
      <ul className="container-edge container flex gap-2 overflow-x-auto">
        {tabs.map(({ name }) => (
          <li key={name}>
            <Button type={name === activeTab ? "primary" : "default"} onClick={() => setActiveTab(name)}>
              {name}
            </Button>
          </li>
        ))}
      </ul>
      {tabs.find(({ name }) => name === activeTab)?.component}
    </section>
  );
};
