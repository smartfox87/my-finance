import formatPrice from "@/helpers/formatPrice";
import { selectBudgetsAmount, selectCostsAmount, selectIncomesAmount } from "../../selectors";
import { selectCurrency } from "@/store/selectors/profile";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";

export const Total = () => {
  const { t } = useTranslation();
  const currency = useAppSelector(selectCurrency);
  const costsTotalAmount = useAppSelector(selectCostsAmount);
  const incomesTotalAmount = useAppSelector(selectIncomesAmount);
  const budgetsTotalAmount = useAppSelector(selectBudgetsAmount);

  return (
    <ul className="flex flex-col gap-x-6 gap-y-1 text-xl empty:hidden md:flex-row">
      <li>
        {t("statistics.incomes")}: {formatPrice(incomesTotalAmount)} {currency}
      </li>
      <li>
        {t("statistics.costs")}: {formatPrice(costsTotalAmount)} {currency}
      </li>
      <li>
        {t("statistics.budgets")}: {formatPrice(budgetsTotalAmount)} {currency}
      </li>
      <li className="font-bold">
        {t("common.total")}: {formatPrice(incomesTotalAmount - costsTotalAmount)} {currency}
      </li>
    </ul>
  );
};
