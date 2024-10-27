import { formatPrice } from "@/utils/format-price";
import { selectBudgetsAmount, selectCostsAmount, selectIncomesAmount } from "../../selectors";
import { selectCurrency } from "@/features/profile";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";

export const Total = () => {
  const { t } = useTranslation();
  const currency = useAppSelector(selectCurrency);
  const costsTotalAmount = useAppSelector(selectCostsAmount);
  const incomesTotalAmount = useAppSelector(selectIncomesAmount);
  const budgetsTotalAmount = useAppSelector(selectBudgetsAmount);
  const list: { name: string; amount: number }[] = [
    { name: t("statistics.incomes"), amount: incomesTotalAmount },
    { name: t("statistics.costs"), amount: costsTotalAmount },
    { name: t("statistics.budgets"), amount: budgetsTotalAmount },
    { name: t("common.total"), amount: incomesTotalAmount - costsTotalAmount },
  ];

  return (
    <ul className="flex flex-wrap gap-2 text-xs empty:hidden 2xs:text-sm xs:text-base">
      {list.map(({ name, amount }) => (
        <li className="w-1/3 grow rounded-md border border-gray-300 px-1.5 py-2.5 text-center xl:w-1/6" key={name}>
          {name}: {formatPrice(amount)} {currency}
        </li>
      ))}
    </ul>
  );
};
